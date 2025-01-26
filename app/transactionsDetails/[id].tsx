import { Ionicons } from '@expo/vector-icons';
import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    Modal,
    ActivityIndicator,
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useTypedSelector } from '@/src/hooks/useTypedSelector';
import { useGetExpenseByIdQuery } from '@/src/redux/expense/expenseApi';
import TransactionDetailItem from '@/src/components/screens/Home/TransactionDetailItem';
import { formatDate } from '@/src/utils/dateUtils';

export default function TransactionDetail() {
    const router = useRouter();
    const { id } = useLocalSearchParams<{ id: string }>();
    const [isModalVisible, setModalVisible] = useState(false);

    const { data, isLoading, isError } = useGetExpenseByIdQuery(id);
    const { expenseDetails } = useTypedSelector((state) => state.expense);

    if (isLoading) {
        return (
            <View className="flex-1 justify-center items-center bg-darkBg">
                <ActivityIndicator size="large" color="#38B2AC" />
                <Text className="text-white mt-4">
                    Loading transaction details...
                </Text>
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

    const handleDelete = () => {
        setModalVisible(false);
        alert('Transaction deleted successfully!');
    };

    return (
        <View className="flex-1 bg-darkBg px-4 pt-6">
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

            {/* Modal for Deleting */}
            <Modal
                transparent
                visible={isModalVisible}
                animationType="slide"
                onRequestClose={() => setModalVisible(false)}
            >
                <View className="flex-1 bg-black/50 justify-center items-center">
                    <View className="bg-gray-900 rounded-lg p-6 w-4/5">
                        <Ionicons
                            name="trash-outline"
                            size={40}
                            className="text-red-500 self-center mb-4"
                        />
                        <Text className="text-white text-lg font-bold text-center mb-4">
                            Are you sure you want to delete this transaction?
                        </Text>
                        <View className="flex-row justify-between mt-6">
                            <TouchableOpacity
                                onPress={() => setModalVisible(false)}
                                className="bg-gray-800 px-4 py-3 rounded-lg flex-1 mr-2"
                            >
                                <Text className="text-center text-gray-400 font-bold">
                                    Cancel
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={handleDelete}
                                className="bg-red-500 px-4 py-3 rounded-lg flex-1 ml-2"
                            >
                                <Text className="text-center text-white font-bold">
                                    Delete
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    );
}
