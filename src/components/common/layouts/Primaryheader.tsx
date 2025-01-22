// src/components/PrimaryHeader.tsx
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

interface PrimaryHeaderProps {
    title: string;
}

/**
 * A simple teal header with a Back button and a title.
 * The Back button uses Expo Router's `router.back()` to go to the previous screen.
 */
export default function PrimaryHeader({ title }: PrimaryHeaderProps) {
    const router = useRouter();

    return (
        <View className="bg-teal-400 h-16 flex-row items-center px-4">
            <TouchableOpacity onPress={() => router.back()}>
                <Ionicons name="arrow-back" size={24} color="white" />
            </TouchableOpacity>
            <Text className="text-white font-bold text-lg ml-4">{title}</Text>
        </View>
    );
}
