import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

// Generic item type for selections
interface SelectionIconInputProps<T> {
    label: string;
    selectedItem: T | null; // Can be any item (Category, Account, etc.)
    placeholder: string;
    iconColor?: string; // Icon color can be customizable
    onPress: () => void;
}

const SelectionIconInput = <T extends { icon?: string; name: string }>({
    label,
    selectedItem,
    onPress,
    placeholder,
    iconColor = '#38B2AC', // Default icon color
}: SelectionIconInputProps<T>) => {
    return (
        <View className="mb-4">
            <Text className="text-gray-400 text-sm mb-2">{label}</Text>
            <TouchableOpacity
                onPress={onPress}
                className="bg-gray-800 rounded-md px-4 py-3 flex-row items-center justify-between"
            >
                <View className="flex-row items-center gap-x-2">
                    {selectedItem && selectedItem.icon && (
                        <Ionicons
                            name={selectedItem.icon as any}
                            size={24}
                            color={iconColor}
                        />
                    )}
                    <Text className="text-white">
                        {selectedItem ? selectedItem.name : placeholder}
                    </Text>
                </View>
                <Ionicons
                    name="chevron-down-outline"
                    size={24}
                    color={iconColor}
                />
            </TouchableOpacity>
        </View>
    );
};

export default SelectionIconInput;
