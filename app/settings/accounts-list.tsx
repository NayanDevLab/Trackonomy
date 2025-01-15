import React from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useGetAccountsQuery } from '@/src/redux/account/accountApi';
import { AccountModelResponse } from '@/src/redux/account/accountType';

const AccountListScreen = () => {
    const router = useRouter();
    const { data, isLoading, error } = useGetAccountsQuery();

    const handleAddAccount = () => {
        router.push('/addAccount');
    };

    const renderItem = ({ item }: { item: AccountModelResponse }) => (
        <View className="flex-row bg-gray-800 rounded-md p-4 mb-4 items-center">
            <Ionicons name={item.icon as any} size={32} color="#14b8a6" />
            <View className="ml-4 flex-1">
                <Text className="text-white text-lg font-bold">
                    {item.name}
                </Text>
                <Text className="text-gray-400 text-sm">
                    {item.account_type}
                </Text>
                <Text className="text-teal-500 font-bold">
                    ${item.balance.toFixed(2)}
                </Text>
                {item.description && (
                    <Text className="text-gray-400 text-xs">
                        {item.description}
                    </Text>
                )}
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
                onPress={handleAddAccount}
                className="bg-teal-500 rounded-full py-3 mb-6"
            >
                <Text className="text-white text-center font-bold">
                    + Add Account
                </Text>
            </TouchableOpacity>
        </View>
    );
};

export default AccountListScreen;
