import { View, Text } from 'react-native';
import React from 'react';
import { Ionicons } from '@expo/vector-icons';

interface TransactionDetailItemProps {
    title: string;
    value: string;
    icon?: string;
}

export default function TransactionDetailItem({
    title,
    value,
    icon,
}: TransactionDetailItemProps) {
    return (
        <View className="gap-y-2 border-b border-gray-800 py-3 flex-row items-center">
            <View>
                <Text className="text-white text-lg font-semibold">
                    {title}
                </Text>
                <View className="flex-row items-center gap-x-2 justify-items-center">
                    <Text className="text-gray-400 text-xl">{value}</Text>
                    {icon && (
                        <Ionicons
                            name={icon as keyof typeof Ionicons.glyphMap}
                            size={26}
                            color="#38B2AC"
                            className="mr-2"
                        />
                    )}
                </View>
            </View>
        </View>
    );
}
