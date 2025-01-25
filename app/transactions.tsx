import TransactionCard from '@/src/components/screens/Home/TransactionCard';
import { useGetExpensesQuery } from '@/src/redux/expense/expenseApi';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';

export default function RecentTransactions() {
    const router = useRouter();
    const {
        data: expenses,
        isLoading,
        isError,
        error,
    } = useGetExpensesQuery({});
    console.log(expenses);
    return (
        <View className="flex-1 bg-darkBg px-4 pt-6">
            <FlatList
                data={expenses?.data?.expenses || []}
                keyExtractor={(item) => item.id.toString()}
                ItemSeparatorComponent={() => <View className="h-4" />}
                renderItem={({ item }) => (
                    <TransactionCard
                        transaction={item}
                        onPress={() => {
                            router.push(`/transactionsDetails/${item.id}`);
                        }}
                    />
                )}
            />
        </View>
    );
}
