import TransactionCard from '@/src/components/screens/Home/TransactionCard';
import { useGetExpensesQuery } from '@/src/redux/expense/expenseApi';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';

type Transaction = {
    id: string;
    title: string;
    category: string;
    amount: string;
    color: string;
    expenseType: string;
    icon:
        | 'fast-food-outline'
        | 'wallet-outline'
        | 'tv-outline'
        | 'trending-up-outline';
};

const transactions: Transaction[] = [
    {
        id: '1',
        title: 'Lunch at Subway', // Transaction title
        category: 'Food', // Category of the transaction
        expenseType: 'Expense', // Expense or Income type
        amount: '- $50.00',
        color: 'red',
        icon: 'fast-food-outline',
    },
    {
        id: '2',
        title: 'Monthly Salary', // Transaction title
        category: 'Salary', // Category of the transaction
        expenseType: 'Income', // Expense or Income type
        amount: '+ $200.00',
        color: 'teal',
        icon: 'wallet-outline',
    },
    {
        id: '3',
        title: 'Netflix Subscription', // Transaction title
        category: 'Entertainment', // Category of the transaction
        expenseType: 'Expense', // Expense or Income type
        amount: '- $40.00',
        color: 'red',
        icon: 'tv-outline',
    },
    {
        id: '4',
        title: 'Stock Returns', // Transaction title
        category: 'Investment', // Category of the transaction
        expenseType: 'Income', // Expense or Income type
        amount: '+ $100.00',
        color: 'teal',
        icon: 'trending-up-outline',
    },
    {
        id: '5',
        title: 'Lunch at Subway', // Transaction title
        category: 'Food', // Category of the transaction
        expenseType: 'Expense', // Expense or Income type
        amount: '- $50.00',
        color: 'red',
        icon: 'fast-food-outline',
    },
    {
        id: '6',
        title: 'Monthly Salary', // Transaction title
        category: 'Salary', // Category of the transaction
        expenseType: 'Income', // Expense or Income type
        amount: '+ $200.00',
        color: 'teal',
        icon: 'wallet-outline',
    },
    {
        id: '7',
        title: 'Netflix Subscription', // Transaction title
        category: 'Entertainment', // Category of the transaction
        expenseType: 'Expense', // Expense or Income type
        amount: '- $40.00',
        color: 'red',
        icon: 'tv-outline',
    },
    {
        id: '8',
        title: 'Stock Returns', // Transaction title
        category: 'Investment', // Category of the transaction
        expenseType: 'Income', // Expense or Income type
        amount: '+ $100.00',
        color: 'teal',
        icon: 'trending-up-outline',
    },
];

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
            {/* Header */}
            <View className="flex-row items-center justify-between mb-4">
                <Text className="text-white text-lg font-bold">
                    Recent Transactions
                </Text>
                <TouchableOpacity>
                    <Text className="text-teal-500 text-sm font-bold">
                        View all
                    </Text>
                </TouchableOpacity>
            </View>

            <FlatList
                // data={transactions}
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
