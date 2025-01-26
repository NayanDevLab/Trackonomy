import React from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import PrimaryInput from '@/src/components/common/PrimaryInput';
import DateTimePickerModal from '@/src/components/common/modals/DateTimePickerModal';
import CategorySelectionModal from '@/src/components/common/modals/CategorySelectionModal';
import { CategoryModelResponse } from '@/src/redux/category/categoryType';
import { AccountModelResponse } from '@/src/redux/account/accountType';
import { useAppDispatch, useTypedSelector } from '@/src/hooks/useTypedSelector';
import { resetExpense, setExpense } from '@/src/redux/expense/expenseSlice';
import { useRouter } from 'expo-router';
import { useAddExpenseMutation } from '@/src/redux/expense/expenseApi';
import { useModal } from '@/src/hooks/useModalState';
import SelectionIconInput from '@/src/components/common/SelectionIconInput';
import PrimaryButton from '@/src/components/common/PrimaryButton';
import TransactionTypeSelectionModal from '@/src/components/common/modals/TransactionTypeSelectionModal';
import { formatDate, toISOString } from '@/src/utils/dateUtils';

export default function AddIncomeScreen() {
    const dispatch = useAppDispatch();
    const router = useRouter();
    const { expense } = useTypedSelector((state) => state.expense);

    const categoryModal = useModal();
    const accountModal = useModal();
    const datePickerModal = useModal();
    const transactionTypeSelectionModal = useModal();

    const [addExpense, { isLoading, isSuccess, error }] =
        useAddExpenseMutation();

    const onChangeInputFields = (
        field: string,
        value:
            | string
            | number
            | Date
            | AccountModelResponse
            | CategoryModelResponse
            | Date,
    ) => {
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
            transaction_type: 'income',
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
            if (isSuccess) {
                router.push('/home');
                dispatch(resetExpense());
            }
        } catch (error) {
            if (error) {
                Alert.alert(
                    'Error',
                    'An error occurred while adding the transaction.',
                );
            }
        }
    };

    return (
        <View className="flex-1 bg-darkBg px-4">
            <CategorySelectionModal
                isVisible={categoryModal.isOpen}
                onClose={() => categoryModal.close()}
                onSelectCategory={(category) => {
                    onChangeInputFields('category', category);
                    categoryModal.close();
                }}
            />

            <TransactionTypeSelectionModal
                isVisible={transactionTypeSelectionModal.isOpen}
                onClose={() => transactionTypeSelectionModal.close()}
                onSelectType={(transactionType) => {
                    onChangeInputFields('transaction_type', transactionType);
                    transactionTypeSelectionModal.close();
                }}
            />

            <DateTimePickerModal
                isVisible={datePickerModal.isOpen}
                mode="date"
                value={expense.date ? new Date(expense.date) : new Date()}
                onConfirm={(date) => {
                    const isoStringDate = toISOString(date);
                    onChangeInputFields('date', isoStringDate);

                    datePickerModal.close();
                }}
                onCancel={() => datePickerModal.close()}
            />

            <View className="flex-1 mt-6">
                <PrimaryInput
                    onChangeText={(value) =>
                        onChangeInputFields('title', value)
                    }
                    placeholder="Enter Title"
                    value={expense.title}
                    label="Title"
                    placeholderTextColor="#fff"
                />

                <PrimaryInput
                    onChangeText={(value) =>
                        onChangeInputFields('amount', parseFloat(value))
                    }
                    placeholder="Enter Amount"
                    value={expense.amount.toString()}
                    keyboardType="numeric"
                    label="Transaction amount"
                    placeholderTextColor="#fff"
                />

                <PrimaryInput
                    onChangeText={(value) =>
                        onChangeInputFields('description', value)
                    }
                    placeholder="Enter Description"
                    value={expense.description}
                    label="Description"
                    multiline
                    placeholderTextColor="#fff"
                />

                <SelectionIconInput
                    label="Transaction Category"
                    selectedItem={expense.category}
                    onPress={() => categoryModal.open()}
                    placeholder="Choose a category"
                />

                <SelectionIconInput
                    label="Transaction Account"
                    selectedItem={expense.account}
                    onPress={() => {
                        accountModal.open();
                    }}
                    placeholder="Choose a account"
                />

                <View className="mb-4">
                    <Text className="text-gray-400 text-sm mb-2">
                        Transaction Date
                    </Text>
                    <TouchableOpacity
                        onPress={() => datePickerModal.open()}
                        className="bg-gray-800 rounded-md px-4 py-3"
                    >
                        <Text className="text-white">
                            {expense.date
                                ? formatDate(expense.date)
                                : 'Select Date'}
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>

            <View className="mt-4">
                <PrimaryButton onPress={handleAddTransaction} title="Add" />
            </View>
        </View>
    );
}
