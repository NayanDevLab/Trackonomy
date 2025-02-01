import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import PrimaryInput from '@/src/components/common/PrimaryInput';
import DateTimePickerModal from '@/src/components/common/modals/DateTimePickerModal';
import CategorySelectionModal from '@/src/components/common/modals/CategorySelectionModal';
import AccountSelectionModal from '@/src/components/common/modals/AccountSelectionModal';
import { CategoryModelResponse } from '@/src/redux/category/categoryType';
import { AccountModelResponse } from '@/src/redux/account/accountType';
import { useAppDispatch, useTypedSelector } from '@/src/hooks/useTypedSelector';
import { resetExpense, setExpense } from '@/src/redux/expense/expenseSlice';
import { useRouter } from 'expo-router';
import { useAddExpenseMutation } from '@/src/redux/expense/expenseApi';
import { useModal } from '@/src/hooks/useModalState';
import SelectionIconInput from '@/src/components/common/SelectionIconInput';
import PrimaryButton from '@/src/components/common/PrimaryButton';
import { formatDate, toISOString } from '@/src/utils/dateUtils';
import PickImageButton from '@/src/components/common/PickImageButton';
import { useUploadImageMutation } from '@/src/redux/upload/uploadApi';
import { createImageFormData } from '@/src/utils/imageUtils';
import { UploadResponse } from '@/src/redux/upload/uploadType';

export default function AddExpenseScreen() {
    const dispatch = useAppDispatch();
    const router = useRouter();
    const { expense } = useTypedSelector((state) => state.expense);

    const categoryModal = useModal();
    const accountModal = useModal();
    const datePickerModal = useModal();
    const [localImageUri, setLocalImageUri] = useState<string | null>(null);

    const [addExpense, { isLoading, isSuccess, error }] =
        useAddExpenseMutation();
    const [uploadImage] = useUploadImageMutation();

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
            transaction_type: 'expense',
            file_url: expense.file_url,
        };
    };

    const handleAddTransaction = async () => {
        if (!expense.amount || !expense.category) {
            Alert.alert('Incomplete fields', 'Please fill all the fields.');
            return;
        }

        let finalFileUrl = expense.file_url;
        if (!finalFileUrl && localImageUri) {
            const uploadedFileUrl = await handleImageUpload(localImageUri);
            if (uploadedFileUrl) {
                finalFileUrl = uploadedFileUrl;
            }
            onChangeInputFields('file_url', finalFileUrl);
        }

        try {
            const payload = {
                ...fetchExpensePayload(),
                file_url: finalFileUrl,
            };
            const response = await addExpense(payload).unwrap();
            console.log('Expense added:', response);
            if (isSuccess) {
                router.push('/home');
                dispatch(resetExpense());
            }
        } catch (error) {
            console.error('Error adding expense:', error);
            Alert.alert(
                'Error',
                'An error occurred while adding the transaction.',
            );
        }
    };

    const handleImageUpload = async (uri: string): Promise<string | null> => {
        const formData = createImageFormData(uri);
        try {
            const response = (await uploadImage(
                formData,
            ).unwrap()) as unknown as UploadResponse;
            console.log('Image uploaded:', response);
            return response.data.url;
        } catch (uploadError) {
            console.error('Image upload error:', uploadError);
            Alert.alert(
                'Upload Error',
                'Failed to upload image. Creating expense without an image.',
            );
            return null;
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

            <AccountSelectionModal
                isVisible={accountModal.isOpen}
                onClose={() => accountModal.close()}
                onSelectAccount={(account) => {
                    onChangeInputFields('account', account);
                    accountModal.close();
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

            <PickImageButton
                onImagePicked={(uri) => setLocalImageUri(uri)}
                imageUri={localImageUri}
            />

            <View className="mt-4">
                <PrimaryButton onPress={handleAddTransaction} title="Add" />
            </View>
        </View>
    );
}
