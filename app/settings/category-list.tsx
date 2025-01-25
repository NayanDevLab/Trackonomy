import React from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useGetCategoriesQuery } from '@/src/redux/category/categoryApi';

interface Category {
    id: number;
    name: string;
    icon: string;
}

const CategoryListScreen = () => {
    const router = useRouter();
    const { data, isLoading, error } = useGetCategoriesQuery();

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
                data={data?.data || []}
                keyExtractor={(item) => item.id.toString()}
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
