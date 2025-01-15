import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { View, Text, TouchableOpacity } from 'react-native';
import { Tabs } from 'expo-router';

const CustomHeader = ({ title }: { title: string }) => {
    return (
        <View className="bg-teal-400 h-16 flex-row items-center px-4">
            <TouchableOpacity>
                <Ionicons name="arrow-back" size={24} color="white" />
            </TouchableOpacity>
            <Text className="text-white font-bold text-lg ml-4">{title}</Text>
        </View>
    );
};

export default function TabLayout() {
    return (
        <Tabs
            screenOptions={{
                tabBarStyle: {
                    backgroundColor: '#1A202C', // Dark background
                },
                tabBarActiveTintColor: '#38B2AC', // Active teal color
                tabBarInactiveTintColor: '#A0AEC0', // Inactive gray color
                headerShown: true, // Ensure header is visible on all screens
            }}
        >
            {/* Home Screen */}
            <Tabs.Screen
                name="index"
                options={{
                    title: 'Home',
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons
                            name="home-outline"
                            size={size}
                            color={color}
                        />
                    ),
                    header: () => <CustomHeader title="Home" />, // Common header for all screens
                }}
            />

            {/* Add Transaction Screen */}
            <Tabs.Screen
                name="add-transaction"
                options={{
                    title: 'Add Transaction',
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons
                            name="cash-outline"
                            size={size}
                            color={color}
                        />
                    ),
                    header: () => <CustomHeader title="Add Transaction" />, // Common header for all screens
                }}
            />

            {/* Dashboard Screen */}
            <Tabs.Screen
                name="transactionDashboard"
                options={{
                    title: 'Dashboard',
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons
                            name="pie-chart-outline"
                            size={size}
                            color={color}
                        />
                    ),
                    header: () => (
                        <CustomHeader title="Transaction Dashboard" />
                    ), // Common header for all screens
                }}
            />

            {/* Budget Screen */}
            <Tabs.Screen
                name="budgetlist"
                options={{
                    title: 'Budget',
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons
                            name="save-outline"
                            size={size}
                            color={color}
                        />
                    ),
                    header: () => <CustomHeader title="Budget List" />, // Common header for all screens
                }}
            />

            {/* Settings Screen */}
            <Tabs.Screen
                name="settings"
                options={{
                    title: 'Settings',
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons
                            name="settings-outline"
                            size={size}
                            color={color}
                        />
                    ),
                    header: () => <CustomHeader title="Settings" />, // Common header for all screens
                }}
            />
        </Tabs>
    );
}
