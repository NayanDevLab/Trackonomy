import React from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

interface Category {
    id: string;
    name: string;
    icon: string;
}

const categories: Category[] = [
    { id: '1', name: 'Food', icon: 'fast-food-outline' },
    { id: '2', name: 'Entertainment', icon: 'tv-outline' },
    { id: '3', name: 'Salary', icon: 'wallet-outline' },
    { id: '4', name: 'Transport', icon: 'car-outline' },
    { id: '5', name: 'Shopping', icon: 'cart-outline' },
    { id: '6', name: 'Health', icon: 'heart-outline' },
    { id: '7', name: 'Travel', icon: 'airplane-outline' },
    { id: '8', name: 'Utilities', icon: 'flash-outline' },
    { id: '9', name: 'Education', icon: 'school-outline' },
    { id: '10', name: 'Gifts', icon: 'gift-outline' },
];

const CategoryListScreen = () => {
    const router = useRouter();

    const handleAddCategory = () => {
        router.push('/add-category'); // Navigate to Add Category screen
    };

    const renderItem = ({ item }: { item: Category }) => (
        <View className="flex-row bg-gray-800 rounded-md p-4 mb-4 items-center">
            <Ionicons
                name={item.icon as keyof typeof Ionicons.glyphMap}
                size={32}
                color="#14b8a6"
            />
            <View className="ml-4 flex-1">
                <Text className="text-white text-lg font-bold">
                    {item.name}
                </Text>
            </View>
        </View>
    );

    return (
        <View className="flex-1 bg-darkBg px-4 pt-6">
            <FlatList
                data={categories}
                keyExtractor={(item) => item.id}
                renderItem={renderItem}
                className="flex-1"
            />
            <TouchableOpacity
                onPress={handleAddCategory}
                className="bg-teal-500 rounded-full py-3 mb-6"
            >
                <Text className="text-white text-center font-bold">
                    + Add Category
                </Text>
            </TouchableOpacity>
        </View>
    );
};

export default CategoryListScreen;
