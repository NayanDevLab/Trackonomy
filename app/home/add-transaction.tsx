import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function AddTransactionScreen() {
    const router = useRouter();

    const handleNavigate = (type: 'add-income' | 'add-expense') => {
        router.push(`/transactions/add-expense`);
    };

    return (
        <View className="flex-1 bg-darkBg">
            {/* Content */}
            <View className="flex-1 justify-center items-center px-6">
                {/* Illustration */}
                <Image
                    source={{
                        uri: 'https://via.placeholder.com/300x300', // Replace with actual image URL
                    }}
                    className="h-64 w-64 mb-8"
                    resizeMode="contain"
                />

                {/* Title */}
                <Text className="text-white font-bold text-lg text-center mb-2">
                    What kind of transaction is it?
                </Text>
                <Text className="text-gray-400 text-center mb-8">
                    Add your income and expense
                </Text>

                {/* Buttons */}
                <View className="flex-row justify-center gap-x-4">
                    {/* Income Button */}
                    <TouchableOpacity
                        className="flex-1 items-center py-6 rounded-lg bg-gray-800"
                        onPress={() => handleNavigate('add-income')}
                    >
                        <View className="bg-teal-400 p-4 rounded-full mb-2">
                            <Ionicons
                                name="arrow-up-outline"
                                size={24}
                                color="white"
                            />
                        </View>
                        <Text className="text-white font-bold text-base">
                            Income
                        </Text>
                        <Text className="text-gray-400 text-sm">
                            Add your income
                        </Text>
                    </TouchableOpacity>

                    {/* Expense Button */}
                    <TouchableOpacity
                        className="flex-1 items-center py-6 rounded-lg bg-gray-800"
                        onPress={() => handleNavigate('add-expense')}
                    >
                        <View className="bg-red-500 p-4 rounded-full mb-2">
                            <Ionicons
                                name="arrow-down-outline"
                                size={24}
                                color="white"
                            />
                        </View>
                        <Text className="text-white font-bold text-base">
                            Expense
                        </Text>
                        <Text className="text-gray-400 text-sm">
                            Add your expense
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}
