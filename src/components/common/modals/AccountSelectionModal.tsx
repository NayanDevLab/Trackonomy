import React from 'react';
import {
    Modal,
    View,
    Text,
    FlatList,
    TouchableOpacity,
    StyleSheet,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useGetAccountsQuery } from '@/src/redux/account/accountApi';
import { AccountModelResponse } from '@/src/redux/account/accountType';

interface AccountListModalProps {
    isVisible: boolean;
    onSelectAccount: (account: AccountModelResponse) => void;
    onClose: () => void;
}

const AccountSelectionModal: React.FC<AccountListModalProps> = ({
    isVisible,
    onSelectAccount,
    onClose,
}) => {
    const { data, isLoading, error } = useGetAccountsQuery();
    return (
        <Modal
            transparent
            visible={isVisible}
            animationType="slide"
            onRequestClose={onClose}
        >
            <View style={styles.modalOverlay}>
                <View className="bg-gray-900 rounded-t-lg w-full p-4 max-h-[60%] pt-10">
                    <Text className="text-white text-xl font-semibold text-center mb-4">
                        Select Account
                    </Text>

                    <FlatList
                        data={data?.data || []}
                        keyExtractor={(item) => item.id.toString()}
                        renderItem={({ item }) => (
                            <TouchableOpacity
                                onPress={() => {
                                    onSelectAccount(item);
                                    onClose();
                                }}
                                className="flex-row bg-gray-800 rounded-md p-4 mb-4 items-center"
                            >
                                <Ionicons
                                    name={
                                        item.icon as keyof typeof Ionicons.glyphMap
                                    }
                                    size={32}
                                    color="#14b8a6"
                                />
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
                            </TouchableOpacity>
                        )}
                    />

                    <TouchableOpacity
                        onPress={onClose}
                        className="bg-teal-500 rounded-md py-2 mt-4 mx-auto w-full"
                    >
                        <Text className="text-white font-bold text-center">
                            Close
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
};

export default AccountSelectionModal;

const styles = StyleSheet.create({
    modalOverlay: {
        backgroundColor: 'rgba(0,0,0,0.5)',
        flex: 1,
        justifyContent: 'flex-end',
    },
});
