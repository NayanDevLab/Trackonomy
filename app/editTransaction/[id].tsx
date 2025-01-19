import {
    useGetExpenseByIdQuery,
    useUpdateExpenseByIdMutation,
} from '@/src/redux/expense/expenseApi';
import { Ionicons } from '@expo/vector-icons';
import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { CategoryModelResponse } from '@/src/redux/category/categoryType';
import PrimaryInput from '@/src/components/common/PrimaryInput';
import DateTimePickerModal from '@/src/components/common/modals/DateTimePickerModal';
import CategorySelectionModal from '@/src/components/common/modals/CategorySelectionModal';

export default function EditTransaction() {
    const router = useRouter();
    const { id } = useLocalSearchParams<{ id: string }>();
    const [isCategoryModalVisible, setCategoryModalVisible] = useState(false);
    const [amount, setAmount] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState<CategoryModelResponse | null>(
        null,
    );
    const [date, setDate] = useState(new Date());
    const [isDatePickerVisible, setDatePickerVisible] = useState(false);

    // Fetch the existing data
    const { data, isLoading, isError } = useGetExpenseByIdQuery(id as string);

    const [updateExpense] = useUpdateExpenseByIdMutation();

    const handleUpdate = async () => {
        const updatedExpense = {
            amount: parseFloat(amount),
            description,
            category: category || {},
            date: date.toISOString(),
        };

        try {
            await updateExpense({
                id: id as string,
                expense: updatedExpense,
            }).unwrap();
            router.push('/home');
        } catch (error) {
            console.error('Error updating expense:', error);
        }
    };

    if (isLoading) {
        return <ActivityIndicator size="large" color="#38B2AC" />;
    }

    if (isError) {
        return <Text>Error fetching expense details.</Text>;
    }

    return (
        <View className="flex-1 bg-darkBg px-4 pt-6">
            {/* Header */}
            <View className="flex-row items-center mb-6">
                <TouchableOpacity onPress={() => router.back()}>
                    <Ionicons
                        name="arrow-back-outline"
                        size={28}
                        className="text-white"
                    />
                </TouchableOpacity>
                <Text className="text-white text-lg font-bold ml-4">
                    Edit Transaction
                </Text>
            </View>

            {/* Form */}
            <View>
                <PrimaryInput
                    onChangeText={setAmount}
                    value={amount}
                    placeholder="Enter Amount"
                    label="Transaction Amount"
                />
                <PrimaryInput
                    onChangeText={setDescription}
                    value={description}
                    placeholder="Enter Description"
                    label="Description"
                    multiline
                />
                {/* Transaction Category */}
                <View className="mb-4">
                    <Text className="text-gray-400 text-sm mb-2">
                        Transaction Category
                    </Text>
                    <TouchableOpacity
                        onPress={() => setCategoryModalVisible(true)}
                        className="bg-gray-800 rounded-md px-4 py-3"
                    >
                        <Text className="text-white">
                            {category ? category.name : 'Select Category'}
                        </Text>
                    </TouchableOpacity>
                </View>

                {/* Transaction Date */}
                <View className="mb-4">
                    <Text className="text-gray-400 text-sm mb-2">
                        Transaction Date
                    </Text>
                    <TouchableOpacity
                        onPress={() => setDatePickerVisible(true)}
                        className="bg-gray-800 rounded-md px-4 py-3"
                    >
                        <Text className="text-white">
                            {date.toDateString()}
                        </Text>
                    </TouchableOpacity>
                </View>

                <DateTimePickerModal
                    isVisible={isDatePickerVisible}
                    mode="date"
                    value={date}
                    onConfirm={(date) => setDate(date)}
                    onCancel={() => setDatePickerVisible(false)}
                />

                {/* Category Modal */}
                <CategorySelectionModal
                    isVisible={isCategoryModalVisible}
                    onSelectCategory={setCategory}
                    onClose={() => setCategoryModalVisible(false)}
                />

                <TouchableOpacity
                    onPress={handleUpdate}
                    className="bg-teal-500 rounded-md py-4"
                >
                    <Text className="text-center text-white font-bold text-lg">
                        Update
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}
