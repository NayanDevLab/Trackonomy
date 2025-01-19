import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import PrimaryInput from '@/src/components/common/PrimaryInput';
import DateTimePickerModal from '@/src/components/common/modals/DateTimePickerModal';
import CategorySelectionModal from '@/src/components/common/modals/CategorySelectionModal';
import AccountSelectionModal from '@/src/components/common/modals/AccountSelectionModal';
import { CategoryModelResponse } from '@/src/redux/category/categoryType';
import { AccountModelResponse } from '@/src/redux/account/accountType';
import { useAppDispatch, useTypedSelector } from '@/src/hooks/useTypedSelector';
import { setExpense } from '@/src/redux/expense/expenseSlice';
import { useRouter } from 'expo-router';
import { useAddExpenseMutation } from '@/src/redux/expense/expenseApi';

export default function AddExpenseScreen() {
    const dispatch = useAppDispatch();
    const router = useRouter();
    const { expense } = useTypedSelector((state) => state.expense);

    const [isCategoryModalVisible, setCategoryModalVisible] = useState(false);
    const [isAccountModalVisible, setIsAccountModalVisible] = useState(false);
    const [isDatePickerVisible, setDatePickerVisible] = useState(false);

    const closeDatePicker = () => setDatePickerVisible(false);

    const [addExpense, { isLoading, isSuccess, error }] =
        useAddExpenseMutation();

    const handleDateConfirm = (selectedDate: Date) => {
        dispatch(setExpense({ ...expense, date: selectedDate.toISOString() }));
        closeDatePicker();
    };

    const onChangeInputFields = (
        field: string,
        value: string | number | Date,
    ) => {
        if (field === 'amount') {
            value = Number(value);
        }
        dispatch(setExpense({ ...expense, [field]: value }));
    };

    const fetchExpensePayload = () => {
        return {
            title: expense.title,
            description: expense.description,
            amount: expense.amount,
            category_id: expense.category.id,
            date: expense.date,
            account_id: expense.account.id,
        };
    };

    const handleAddTransaction = async () => {
        if (!expense.amount || !expense.category) {
            alert('Please fill all the fields.');
            return;
        }

        try {
            const payload = fetchExpensePayload();
            const response = await addExpense(payload).unwrap();
            console.log('response', response);
            if (isSuccess) {
                router.back();
                Alert.alert('Success', 'Transaction added successfully!');
            }
        } catch (error) {
            if (error) {
                console.log('error', error);
                Alert.alert(
                    'Error',
                    'An error occurred while adding the transaction.',
                );
            }
        }
    };

    const handleSelectCategory = (category: CategoryModelResponse) => {
        dispatch(setExpense({ ...expense, category: category }));
        setCategoryModalVisible(false);
    };

    const handleSelectAccount = (account: AccountModelResponse) => {
        dispatch(setExpense({ ...expense, account }));
        setIsAccountModalVisible(false);
    };

    return (
        <View className="flex-1 bg-darkBg px-4">
            {/* Category Selection Modal */}
            <CategorySelectionModal
                isVisible={isCategoryModalVisible}
                onClose={() => setCategoryModalVisible(false)}
                onSelectCategory={handleSelectCategory}
            />

            <View className="flex-1 mt-6">
                {/* Title Input */}
                <PrimaryInput
                    onChangeText={(value) =>
                        onChangeInputFields('title', value)
                    }
                    placeholder="Enter Title"
                    value={expense.title}
                    label="Title"
                    placeholderTextColor="#A0AEC0"
                />

                {/* Amount Input */}
                <PrimaryInput
                    onChangeText={(value) =>
                        onChangeInputFields('amount', value)
                    }
                    placeholder="Enter Amount"
                    value={expense.amount.toString()}
                    keyboardType="numeric"
                    label="Transaction amount"
                    placeholderTextColor="#A0AEC0"
                />

                {/* Transaction Category */}
                <View className="mb-4">
                    <Text className="text-gray-400 text-sm mb-2">
                        Transaction Category
                    </Text>
                    <TouchableOpacity
                        onPress={() => setCategoryModalVisible(true)}
                        className="bg-gray-800 rounded-md px-4 py-3 flex-row items-center justify-between"
                    >
                        <View className="flex-row items-center">
                            {expense.category && (
                                <Ionicons
                                    name={expense.category.icon as any}
                                    size={24}
                                    color={'#38B2AC'}
                                />
                            )}
                            <Text className="text-white">
                                {expense.category
                                    ? expense.category.name
                                    : 'Choose a category'}
                            </Text>
                        </View>
                        <Ionicons
                            name="chevron-down-outline"
                            size={24}
                            color={'#38B2AC'}
                        />
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
                            {expense.date
                                ? new Date(expense.date).toDateString()
                                : 'Select Date'}
                        </Text>
                    </TouchableOpacity>
                </View>
                <DateTimePickerModal
                    isVisible={isDatePickerVisible}
                    mode="date"
                    value={expense.date ? new Date(expense.date) : new Date()}
                    onConfirm={handleDateConfirm}
                    onCancel={closeDatePicker}
                />

                {/* Description Input */}
                <PrimaryInput
                    onChangeText={(value) =>
                        onChangeInputFields('description', value)
                    }
                    placeholder="Enter Description"
                    value={expense.description}
                    label="Description"
                    multiline
                    placeholderTextColor="#A0AEC0"
                />

                {/* Account Selection */}
                <View className="mb-4">
                    <Text className="text-gray-400 text-sm mb-2">
                        Transaction Account
                    </Text>
                    <TouchableOpacity
                        onPress={() => setIsAccountModalVisible(true)}
                        className="bg-gray-800 rounded-md px-4 py-3 flex-row items-center justify-between"
                    >
                        <View className="flex-row items-center">
                            {expense.account && (
                                <Ionicons
                                    name={expense.account.icon as any}
                                    size={24}
                                    color={'#38B2AC'}
                                />
                            )}
                            <Text className="text-white">
                                {expense.account
                                    ? expense.account.name
                                    : 'Choose an Account'}
                            </Text>
                        </View>
                        <Ionicons
                            name="chevron-down-outline"
                            size={24}
                            color={'#38B2AC'}
                        />
                    </TouchableOpacity>
                </View>
            </View>

            {/* Add Button */}
            <View className="mt-4">
                <TouchableOpacity
                    className="bg-teal-400 py-4 rounded-lg"
                    onPress={handleAddTransaction}
                >
                    <Text className="text-center text-white font-bold">
                        Add
                    </Text>
                </TouchableOpacity>
            </View>

            {/* Account Selection Modal */}
            <AccountSelectionModal
                isVisible={isAccountModalVisible}
                onClose={() => setIsAccountModalVisible(false)}
                onSelectAccount={handleSelectAccount}
            />
        </View>
    );
}
