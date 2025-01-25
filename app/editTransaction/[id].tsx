import { Ionicons } from '@expo/vector-icons';
import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { CategoryModelResponse } from '@/src/redux/category/categoryType';
import PrimaryInput from '@/src/components/common/PrimaryInput';
import DateTimePickerModal from '@/src/components/common/modals/DateTimePickerModal';
import CategorySelectionModal from '@/src/components/common/modals/CategorySelectionModal';
import { useTypedSelector } from '@/src/hooks/useTypedSelector';
import { IExpenseState } from '@/src/redux/expense/expenseTypes';
import { expenseInitialState } from '@/src/redux/expense/expenseInitialState';
import AccountSelectionModal from '@/src/components/common/modals/AccountSelectionModal';
import { AccountModelResponse } from '@/src/redux/account/accountType';
import PrimaryButton from '@/src/components/common/PrimaryButton';
import SelectionIconInput from '@/src/components/common/SelectionIconInput';
import { useModal } from '@/src/hooks/useModalState';
import TransactionTypeSelectionModal from '@/src/components/common/modals/TransactionTypeSelectionModal';
import { useUpdateExpenseByIdMutation } from '@/src/redux/expense/expenseApi';

export default function EditTransaction() {
    const router = useRouter();
    const [editableExpense, setEditableExpense] = useState<IExpenseState>({
        ...expenseInitialState.expenseDetails,
    });

    const categoryModal = useModal();
    const accountModal = useModal();
    const datePickerModal = useModal();
    const transactionTypeSelectionModal = useModal();
    const { expenseDetails } = useTypedSelector((state) => state.expense);

    const [updateExpense, { isLoading, isSuccess, error }] =
        useUpdateExpenseByIdMutation();

    const fetchExpensePayload = () => {
        return {
            title: editableExpense.title,
            description: editableExpense.description,
            amount: editableExpense.amount,
            category_id: editableExpense.category.id,
            date: editableExpense.date,
            account_id: editableExpense.account.id,
            transaction_type: editableExpense.transaction_type,
        };
    };

    const handleUpdate = async () => {
        if (!editableExpense.amount || !editableExpense.category) {
            alert('Please fill all the fields.');
            return;
        }

        try {
            const payload = fetchExpensePayload();
            console.log('payload', payload);
            // Pass both expense ID and the payload
            const response = await updateExpense({
                id: editableExpense.id,
                expense: payload,
            }).unwrap();

            console.log('Update successful', response);

            if (isSuccess) {
                // Navigate back or show success message
                router.back();
                Alert.alert('Success', 'Transaction updated successfully!');
            }
        } catch (error) {
            console.error('Error during update:', error);
            Alert.alert(
                'Error',
                'An error occurred while updating the transaction.',
            );
        }
    };

    const onChangeInputField = (
        field: string,
        value:
            | number
            | string
            | AccountModelResponse
            | CategoryModelResponse
            | Date,
    ) => {
        setEditableExpense({ ...editableExpense, [field]: value });
    };

    useEffect(() => {
        if (expenseDetails.id) {
            setEditableExpense(expenseDetails);
        }
    }, [expenseDetails]);

    return (
        <View className="flex-1 bg-darkBg px-4 pt-6">
            <CategorySelectionModal
                isVisible={categoryModal.isOpen}
                onClose={() => categoryModal.close()}
                onSelectCategory={(category) => {
                    onChangeInputField('category', category);
                    categoryModal.close();
                }}
            />
            <AccountSelectionModal
                isVisible={accountModal.isOpen}
                onClose={() => accountModal.close()}
                onSelectAccount={(account) => {
                    onChangeInputField('account', account);
                    accountModal.close();
                }}
            />

            <TransactionTypeSelectionModal
                isVisible={transactionTypeSelectionModal.isOpen}
                onClose={() => transactionTypeSelectionModal.close()}
                onSelectType={(transactionType) => {
                    onChangeInputField('transaction_type', transactionType);
                    transactionTypeSelectionModal.close();
                }}
            />

            <DateTimePickerModal
                isVisible={datePickerModal.isOpen}
                mode="date"
                value={
                    editableExpense.date
                        ? new Date(editableExpense.date)
                        : new Date()
                }
                onConfirm={(date) => {
                    onChangeInputField('date', date);
                    datePickerModal.close();
                }}
                onCancel={() => datePickerModal.close()}
            />

            <View>
                <PrimaryInput
                    onChangeText={(value) => onChangeInputField('title', value)}
                    value={editableExpense.title}
                    placeholder="Enter Title"
                    label="Transaction Title"
                />
                <PrimaryInput
                    onChangeText={(value) =>
                        onChangeInputField('amount', value)
                    }
                    value={editableExpense.amount}
                    placeholder="Enter Amount"
                    label="Transaction Amount"
                    keyboardType="numeric"
                />
                <PrimaryInput
                    onChangeText={(value) =>
                        onChangeInputField('description', value)
                    }
                    value={editableExpense.description}
                    placeholder="Enter Description"
                    label="Description"
                    multiline
                />

                <SelectionIconInput
                    label="Transaction Category"
                    selectedItem={editableExpense.category}
                    onPress={() => categoryModal.open()}
                    placeholder="Choose a category"
                />

                <SelectionIconInput
                    label="Transaction Account"
                    selectedItem={editableExpense.account}
                    onPress={() => {
                        accountModal.open();
                    }}
                    placeholder="Choose a account"
                />

                <View className="mb-4">
                    <Text className="text-gray-400 text-sm mb-2">
                        Transaction Type
                    </Text>
                    <TouchableOpacity
                        onPress={() => transactionTypeSelectionModal.open()}
                        className="bg-gray-800 rounded-md px-4 py-3 flex-row items-center"
                    >
                        {editableExpense.transaction_type === 'Income' ? (
                            <Ionicons
                                name="arrow-up-circle-outline"
                                size={24}
                                color="#38B2AC"
                            />
                        ) : editableExpense.transaction_type === 'Expense' ? (
                            <Ionicons
                                name="arrow-down-circle-outline"
                                size={24}
                                color="#E53E3E"
                            />
                        ) : (
                            <Ionicons
                                name="cash-outline"
                                size={24}
                                color="#A0AEC0"
                            />
                        )}

                        <Text className="text-white ml-3">
                            {editableExpense.transaction_type
                                ? editableExpense.transaction_type
                                : 'Select Type of Transaction'}
                        </Text>
                    </TouchableOpacity>
                </View>

                <View className="mb-4">
                    <Text className="text-gray-400 text-sm mb-2">
                        Transaction Date
                    </Text>
                    <TouchableOpacity
                        onPress={() => datePickerModal.open()}
                        className="bg-gray-800 rounded-md px-4 py-3"
                    >
                        <Text className="text-white">
                            {editableExpense.date
                                ? new Date(editableExpense.date).toDateString()
                                : 'Select Date'}
                        </Text>
                    </TouchableOpacity>
                </View>

                <PrimaryButton
                    onPress={handleUpdate}
                    title={isLoading ? 'Updating...' : 'Update'}
                    disabled={isLoading}
                />
            </View>
        </View>
    );
}
