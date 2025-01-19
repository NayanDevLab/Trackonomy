import TransactionCard from '@/src/components/screens/Home/TransactionCard';
import TransactionTypeAmountCard from '@/src/components/screens/Home/TransactionTypeAmountCard';
import { useTypedSelector } from '@/src/hooks/useTypedSelector';
import { useGetExpensesQuery } from '@/src/redux/expense/expenseApi';
import { getGreeting } from '@/src/utils/greetings';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { View, Text, TouchableOpacity, FlatList, Image } from 'react-native';
import Toast from 'react-native-toast-message';

export default function HomeScreen() {
    const router = useRouter();
    const { data: expenses } = useGetExpensesQuery({ limit: 4 });
    const { userProfile } = useTypedSelector((state) => state.auth);

    return (
        <View className="flex-1 bg-darkBg px-4 pt-10">
            {/* Header */}
            <View className="flex-row justify-between items-center mb-6">
                <View className="flex-row items-center">
                    <Image
                        source={{ uri: 'https://via.placeholder.com/50' }}
                        className="w-12 h-12 rounded-full mr-4"
                    />
                    <View>
                        <Text className="text-white text-lg font-bold">
                            Hi, {userProfile?.username}
                        </Text>
                        <Text className="text-gray-400 text-sm">
                            {getGreeting()}
                        </Text>
                    </View>
                </View>
                <TouchableOpacity>
                    <Ionicons
                        name="person-circle-outline"
                        size={28}
                        color="#FFFFFF"
                    />
                </TouchableOpacity>
            </View>

            {/* Stats */}
            <Text className="text-white text-lg font-bold mb-4">
                This month
            </Text>
            <View className="flex-row justify-between mb-6">
                <TransactionTypeAmountCard amount={'$500.00'} type={'Income'} />
                <TransactionTypeAmountCard
                    amount={'$500.00'}
                    type={'Expense'}
                />
                <TransactionTypeAmountCard amount={'$500.00'} type={'Total'} />
            </View>

            {/* Recent Transactions */}
            <View>
                <View className="flex-row justify-between items-center mb-4">
                    <Text className="text-white text-lg font-bold">
                        Recent Transactions
                    </Text>
                    <TouchableOpacity
                        onPress={() => {
                            router.push('/transactions');
                        }}
                    >
                        <Text className="text-teal-400 text-sm font-bold">
                            View all
                        </Text>
                    </TouchableOpacity>
                </View>
                <FlatList
                    data={expenses?.data?.expenses || []}
                    renderItem={({ item }) => (
                        <TransactionCard
                            transaction={item}
                            onPress={() => {
                                router.push(`/transactionsDetails/${item.id}`);
                            }}
                        />
                    )}
                    keyExtractor={(item) => item.id.toString()}
                    ItemSeparatorComponent={() => <View className="h-2" />}
                />
            </View>

            {/* Floating Action Button */}
            <TouchableOpacity className="absolute bottom-6 right-6 bg-teal-400 w-14 h-14 rounded-full items-center justify-center">
                <Ionicons name="add" size={28} color="#FFFFFF" />
            </TouchableOpacity>
        </View>
    );
}
