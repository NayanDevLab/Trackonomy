import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import IconPickerModal from '@/src/components/common/modals/IconPickerModal';
import { useAppDispatch, useTypedSelector } from '@/src/hooks/useTypedSelector';
import { setCategory } from '@/src/redux/category/categorySlice';
import { useModal } from '@/src/hooks/useModalState';
import SelectionIconInput from '@/src/components/common/SelectionIconInput';
import PrimaryInput from '@/src/components/common/PrimaryInput';
import { useAddCategoryMutation } from '@/src/redux/category/categoryApi';

const AddCategoryScreen = () => {
    const { category } = useTypedSelector((state) => state.category);
    const dispatch = useAppDispatch();
    const router = useRouter();
    const iconModal = useModal();

    const [addCategory, { isLoading, isError, error }] =
        useAddCategoryMutation();

    const handleSaveCategory = async () => {
        if (!category.name || !category.icon) {
            alert('Please fill in all fields');
            return;
        }
        try {
            // Call the API to add the category
            const response = await addCategory(category).unwrap();
            console.log('Category saved:', response);

            // Redirect or perform any other actions
            router.push('/settings/category-list');
        } catch (error) {
            // Handle error if any
            console.error('Error saving category:', error);
            alert('Failed to save the category. Please try again later.');
        }
    };

    const onChangeInputHandle = (field: string, value: string) => {
        dispatch(setCategory({ ...category, [field]: value }));
    };

    return (
        <View className="flex-1 bg-darkBg px-4 pt-6">
            <IconPickerModal
                isVisible={iconModal.isOpen}
                onClose={() => iconModal.close()}
                onSelectIcon={(icon) => {
                    onChangeInputHandle('icon', icon);
                    iconModal.close();
                }}
                selectedIcon={category.icon}
            />
            <Text className="text-white text-2xl font-bold mb-6">
                Add Category
            </Text>
            <PrimaryInput
                onChangeText={(text) => onChangeInputHandle('name', text)}
                placeholder="Category Name"
                value={category.name}
                label="Category Name"
                placeholderTextColor="#A0AEC0"
            />

            <SelectionIconInput
                label="Select Icon"
                onPress={() => iconModal.open()}
                placeholder="Select Icon"
                selectedItem={category}
                showName={false}
            />

            <TouchableOpacity
                onPress={handleSaveCategory}
                className="bg-teal-500 rounded-md py-4"
            >
                <Text className="text-center text-white font-bold text-lg">
                    Save Category
                </Text>
            </TouchableOpacity>
        </View>
    );
};

export default AddCategoryScreen;
