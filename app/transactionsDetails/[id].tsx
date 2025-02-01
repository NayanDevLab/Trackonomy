import { Ionicons } from '@expo/vector-icons';
import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    Modal,
    ActivityIndicator,
    Image,
    ScrollView,
    Alert,
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useTypedSelector } from '@/src/hooks/useTypedSelector';
import {
    useDeleteExpenseMutation,
    useGetExpenseByIdQuery,
} from '@/src/redux/expense/expenseApi';
import TransactionDetailItem from '@/src/components/screens/Home/TransactionDetailItem';
import { formatDate } from '@/src/utils/dateUtils';
import ConfirmationModal from '@/src/components/common/modals/ConfirmationModal';

export default function TransactionDetail() {
    const router = useRouter();
    const { id } = useLocalSearchParams<{ id: string }>();
    const [isModalVisible, setModalVisible] = useState(false);

    const { data, isLoading, isError } = useGetExpenseByIdQuery(id);
    const { expenseDetails } = useTypedSelector((state) => state.expense);
    const [deleteExpense] = useDeleteExpenseMutation();

    if (isLoading) {
        return (
            <View className="flex-1 justify-center items-center bg-darkBg">
                <ActivityIndicator size="large" color="#38B2AC" />
                <Text className="text-white mt-4">Loading</Text>
            </View>
        );
    }

    if (isError) {
        return (
            <View className="flex-1 justify-center items-center bg-darkBg">
                <Text className="text-white">
                    Error fetching transaction details.
                </Text>
            </View>
        );
    }

    // Ensure data is available
    if (!data) return <Text>No data found</Text>;

    const handleDelete = async () => {
        setModalVisible(false);
        if (expenseDetails?.id) {
            try {
                // Delete the expense by its id.
                await deleteExpense(String(expenseDetails.id)).unwrap();
                Alert.alert('Success', 'Transaction deleted successfully!');
                router.replace('/home');
            } catch (error) {
                console.error('Error deleting transaction:', error);
                Alert.alert(
                    'Error',
                    'An error occurred while deleting the transaction.',
                );
            }
        } else {
            Alert.alert('Error', 'Transaction id not found.');
        }
    };

    return (
        <View className="flex-1 bg-darkBg">
            <ScrollView
                contentContainerStyle={{ paddingBottom: 20 }}
                className="px-4 pt-6"
            >
                <View className="flex-row items-center justify-between mb-6">
                    <View className="flex-row items-center gap-x-3">
                        <Ionicons
                            name={expenseDetails?.category.icon as any}
                            size={28}
                            color={'#38B2AC'}
                            className="bg-[#36363D] p-3 rounded-md"
                        />
                        <View className="ml-2 gap-x-2">
                            <Text className="text-white text-lg font-semibold">
                                {expenseDetails?.category.name}
                            </Text>
                            <Text className="text-gray-400 text-sm">
                                {expenseDetails.transaction_type}
                            </Text>
                        </View>
                    </View>
                    {/* Edit and Trash Buttons */}
                    <View className="flex-row gap-x-3">
                        <TouchableOpacity
                            onPress={() => {
                                if (expenseDetails.id) {
                                    router.push(
                                        `/editTransaction/${String(expenseDetails?.id)}`,
                                    );
                                }
                            }}
                            className="p-3 bg-[#2C2C33] rounded-full"
                        >
                            <Ionicons
                                name="create-outline"
                                size={24}
                                color={'white'}
                            />
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => setModalVisible(true)}
                            className="p-3 bg-[#2C2C33] rounded-full"
                        >
                            <Ionicons
                                name="trash-outline"
                                size={24}
                                color={'white'}
                            />
                        </TouchableOpacity>
                    </View>
                </View>

                {/* Transaction Details */}
                <View className="flex flex-col gap-y-4">
                    <TransactionDetailItem
                        title="Title"
                        value={expenseDetails.title}
                    />
                    <TransactionDetailItem
                        title="Transaction Type"
                        value={
                            expenseDetails.transaction_type === 'income'
                                ? 'Income'
                                : 'Expense'
                        }
                    />
                    <TransactionDetailItem
                        title="Transaction Date"
                        value={formatDate(expenseDetails.date)}
                    />
                    <TransactionDetailItem
                        title="Transaction Account"
                        value={expenseDetails?.account.name || 'N/A'}
                        icon={expenseDetails.account.icon}
                    />
                    <TransactionDetailItem
                        title="Amount"
                        value={`$${expenseDetails?.amount}`}
                    />
                    <TransactionDetailItem
                        title="Description"
                        value={
                            expenseDetails?.description ||
                            'No description available'
                        }
                    />
                </View>

                {expenseDetails.file_url && (
                    <View className="mt-6">
                        <Text className="text-white text-lg font-semibold mb-2">
                            Receipt Image
                        </Text>
                        <Image
                            source={{ uri: expenseDetails.file_url }}
                            className="w-full h-40 rounded-md"
                            resizeMode="cover"
                        />
                    </View>
                )}
            </ScrollView>

            <ConfirmationModal
                message="Are you sure you want to delete this transaction?"
                confirmText="Delete"
                icon="trash-outline"
                visible={isModalVisible}
                onConfirm={handleDelete}
                onCancel={() => setModalVisible(false)}
            />
        </View>
    );
}
