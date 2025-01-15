import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ExpenseModelResponse } from '@/src/redux/expense/expenseTypes';

interface TransactionCardProps {
    transaction: ExpenseModelResponse;
    onPress: () => void;
}

export default function TransactionCard({
    transaction,
    onPress,
}: TransactionCardProps) {
    const { title, category, amount } = transaction;

    return (
        <TouchableOpacity
            onPress={onPress}
            className="flex-row justify-between items-center bg-gray-800 rounded-md p-4 mb-3"
        >
            <View className="flex flex-row items-center gap-x-2">
                <View>
                    <Ionicons
                        name={category.icon as any}
                        size={28}
                        color={'#38B2AC'}
                    />
                </View>
                <View className="ml-2">
                    <Text className="text-white text-sm font-bold">
                        {title}
                    </Text>
                    <Text className="text-gray-400 text-xs">
                        {category.name}
                    </Text>
                </View>
            </View>
            <View>
                <Text className={`text-teal-500`}>₹{amount}</Text>
            </View>
        </TouchableOpacity>
    );
}
