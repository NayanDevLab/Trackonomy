import React from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface TransactionTypeSelectionModalProps {
    isVisible: boolean;
    onSelectType: (type: 'income' | 'expense') => void;
    onClose: () => void;
}

const TransactionTypeSelectionModal: React.FC<
    TransactionTypeSelectionModalProps
> = ({ isVisible, onSelectType, onClose }) => {
    return (
        <Modal
            transparent
            visible={isVisible}
            animationType="slide"
            onRequestClose={onClose}
        >
            <View style={styles.modalOverlay} className="bg-black/50">
                <View className="bg-gray-900 rounded-t-lg p-6">
                    <Text className="text-white text-lg font-bold mb-4 text-center">
                        Transaction Type
                    </Text>
                    <View className="flex-row justify-around">
                        {/* Income Button */}
                        <TouchableOpacity
                            onPress={() => onSelectType('income')}
                            className={`flex-1 mx-2 items-center p-4 bg-teal-500 rounded-lg border`}
                        >
                            <Ionicons
                                name="arrow-up-circle-outline"
                                size={45}
                                color={'white'}
                            />
                            <Text className="`mt-2 font-bold text-white">
                                Income
                            </Text>
                        </TouchableOpacity>

                        {/* Expense Button */}
                        <TouchableOpacity
                            onPress={() => onSelectType('expense')}
                            className={`flex-1 mx-2 items-center bg-red-500 p-4 rounded-lg border`}
                        >
                            <Ionicons
                                name="arrow-down-circle-outline"
                                size={45}
                                color={'white'}
                            />
                            <Text className={`mt-2 font-bold text-white`}>
                                Expense
                            </Text>
                        </TouchableOpacity>
                    </View>

                    {/* Close Button */}
                    <TouchableOpacity
                        onPress={onClose}
                        className="bg-teal-500 w-full py-3 mt-4 rounded-lg flex items-center justify-center"
                    >
                        <Text className="text-white font-bold">Close</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
};

export default TransactionTypeSelectionModal;

const styles = StyleSheet.create({
    modalOverlay: {
        backgroundColor: 'rgba(0,0,0,0.5)',
        flex: 1,
        justifyContent: 'flex-end',
    },
});
