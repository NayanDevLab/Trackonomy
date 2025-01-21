import { Ionicons } from '@expo/vector-icons';
import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
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
import useModalState from '@/src/hooks/useModalState';

export default function EditTransaction() {
    const router = useRouter();
    const [editableExpense, setEditableExpense] = useState<IExpenseState>({
        ...expenseInitialState.expenseDetails,
    });

    const { closeModal, modalState, openModal } = useModalState();
    const { expenseDetails } = useTypedSelector((state) => state.expense);

    const handleUpdate = async () => {};

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
                isVisible={modalState.category}
                onClose={() => closeModal('category')}
                onSelectCategory={(category) => {
                    onChangeInputField('category', category);
                    closeModal('category');
                }}
            />
            <AccountSelectionModal
                isVisible={modalState.account}
                onClose={() => closeModal('account')}
                onSelectAccount={(account) => {
                    onChangeInputField('account', account);
                    closeModal('account');
                }}
            />

            <DateTimePickerModal
                isVisible={modalState.date}
                mode="date"
                value={
                    editableExpense.date
                        ? new Date(editableExpense.date)
                        : new Date()
                }
                onConfirm={(date) => {
                    onChangeInputField('date', date);
                    closeModal('date');
                }}
                onCancel={() => closeModal('date')}
            />
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
                    onPress={() => openModal('category')}
                    placeholder="Choose a category"
                />

                <SelectionIconInput
                    label="Transaction Account"
                    selectedItem={editableExpense.account}
                    onPress={() => {
                        openModal('account');
                    }}
                    placeholder="Choose a account"
                />

                <View className="mb-4">
                    <Text className="text-gray-400 text-sm mb-2">
                        Transaction Date
                    </Text>
                    <TouchableOpacity
                        onPress={() => openModal('date')}
                        className="bg-gray-800 rounded-md px-4 py-3"
                    >
                        <Text className="text-white">
                            {editableExpense.date
                                ? new Date(editableExpense.date).toDateString()
                                : 'Select Date'}
                        </Text>
                    </TouchableOpacity>
                </View>

                <PrimaryButton onPress={handleUpdate} title="Update" />
            </View>
        </View>
    );
}
