import React from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    Modal,
    FlatList,
    GestureResponderEvent,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export type CategoryIcon =
    | 'person-circle-outline'
    | 'fast-food-outline'
    | 'cart-outline'
    | 'airplane-outline'
    | 'film-outline'
    | 'car-outline'
    | 'document-text-outline'
    | 'medkit-outline'
    | 'bus-outline'
    | 'school-outline'
    | 'home-outline'
    | 'receipt-outline'
    | 'pricetag-outline'
    | 'briefcase-outline'
    | 'cash-outline';

export interface Category {
    id: string;
    name: string;
    icon: CategoryIcon;
}

// src/types/icon.ts

export type IconName =
    | 'person-circle-outline'
    | 'fast-food-outline'
    | 'cart-outline'
    | 'airplane-outline'
    | 'film-outline'
    | 'car-outline'
    | 'document-text-outline'
    | 'medkit-outline'
    | 'bus-outline'
    | 'school-outline'
    | 'home-outline'
    | 'receipt-outline'
    | 'pricetag-outline'
    | 'briefcase-outline'
    | 'cash-outline';

interface CategoryPickerModalProps {
    visible: boolean;
    onCancel: (event: GestureResponderEvent) => void;
    onSelect: (category: Category) => void;
    selectedCategoryId?: string;
}

const categories: Category[] = [
    { id: '1', name: 'Personal', icon: 'person-circle-outline' },
    { id: '2', name: 'Food & drink', icon: 'fast-food-outline' },
    { id: '3', name: 'Grocery', icon: 'cart-outline' },
    { id: '4', name: 'Travel', icon: 'airplane-outline' },
    { id: '5', name: 'Entertainment', icon: 'film-outline' },
    { id: '6', name: 'Fuel', icon: 'car-outline' },
    { id: '7', name: 'Bill', icon: 'document-text-outline' },
    { id: '8', name: 'Medical', icon: 'medkit-outline' },
    { id: '9', name: 'Transport', icon: 'bus-outline' },
    { id: '10', name: 'Education', icon: 'school-outline' },
    { id: '11', name: 'Home', icon: 'home-outline' },
    { id: '12', name: 'Loan paid', icon: 'receipt-outline' },
    { id: '13', name: 'Shopping', icon: 'pricetag-outline' },
    { id: '14', name: 'Office', icon: 'briefcase-outline' },
    { id: '15', name: 'Rent paid', icon: 'cash-outline' },
];

const CategoryPickerModal: React.FC<CategoryPickerModalProps> = ({
    visible,
    onCancel,
    onSelect,
    selectedCategoryId,
}) => {
    const renderItem = ({ item }: { item: Category }) => {
        const isSelected = item.id === selectedCategoryId;

        return (
            <TouchableOpacity
                onPress={() => onSelect(item)}
                className={`flex-1 m-2 items-center justify-center p-4 rounded-lg ${
                    isSelected ? 'bg-teal-500' : 'bg-gray-800'
                }`}
            >
                <Ionicons
                    name={item.icon as any}
                    size={28}
                    className={`${isSelected ? 'text-white' : 'text-gray-400'}`}
                />
                <Text
                    className={`mt-2 text-sm font-bold ${
                        isSelected ? 'text-white' : 'text-gray-400'
                    }`}
                    numberOfLines={1}
                >
                    {item.name}
                </Text>
            </TouchableOpacity>
        );
    };

    return (
        <Modal
            transparent
            visible={visible}
            animationType="fade"
            statusBarTranslucent
            onRequestClose={onCancel}
        >
            <View className="flex-1 bg-black bg-opacity-50 justify-center items-center">
                <View className="w-11/12 bg-gray-800 rounded-lg p-6 max-h-5/6">
                    {/* Message or Header */}
                    <Text className="text-center text-white text-lg font-bold mb-4">
                        Select a Category
                    </Text>

                    {/* Category Grid */}
                    <FlatList
                        data={categories}
                        numColumns={3}
                        keyExtractor={(item) => item.id}
                        renderItem={renderItem}
                        contentContainerStyle={{ paddingBottom: 20 }}
                        columnWrapperStyle={{ justifyContent: 'space-between' }}
                    />

                    {/* Cancel Button */}
                    <TouchableOpacity
                        onPress={onCancel}
                        className="mt-4 bg-red-500 py-2 rounded-lg"
                    >
                        <Text className="text-center text-white font-bold">
                            Cancel
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
};

export default CategoryPickerModal;
