import React from 'react';
import { Modal, View, Text, FlatList, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const icons = [
    { id: '1', name: 'fast-food-outline' },
    { id: '2', name: 'tv-outline' },
    { id: '3', name: 'wallet-outline' },
    { id: '4', name: 'cash-outline' },
    { id: '5', name: 'card-outline' },
    { id: '6', name: 'cart-outline' },
    { id: '7', name: 'pricetag-outline' },
    { id: '8', name: 'receipt-outline' },
    { id: '9', name: 'trending-up-outline' },
    { id: '10', name: 'trending-down-outline' },
    { id: '11', name: 'stats-chart-outline' },
    { id: '12', name: 'pie-chart-outline' },
    { id: '13', name: 'bar-chart-outline' },
    { id: '14', name: 'wallet-outline' },
    { id: '15', name: 'cash-sharp' },
    { id: '16', name: 'card-sharp' },
    { id: '17', name: 'cart-sharp' },
    { id: '18', name: 'pricetag-sharp' },
    { id: '19', name: 'receipt-sharp' },
    { id: '20', name: 'trending-up-sharp' },
    { id: '21', name: 'trending-down-sharp' },
    { id: '22', name: 'stats-chart-sharp' },
    { id: '23', name: 'pie-chart-sharp' },
    { id: '24', name: 'bar-chart-sharp' },
    { id: '25', name: 'wallet-sharp' },
    { id: '26', name: 'cash' },
    { id: '27', name: 'card' },
    { id: '28', name: 'cart' },
    { id: '29', name: 'pricetag' },
    { id: '30', name: 'receipt' },
    { id: '31', name: 'trending-up' },
    { id: '32', name: 'trending-down' },
    { id: '33', name: 'stats-chart' },
    { id: '34', name: 'pie-chart' },
    { id: '35', name: 'bar-chart' },
    { id: '36', name: 'wallet' },
    { id: '37', name: 'cash-outline' },
    { id: '38', name: 'card-outline' },
    { id: '39', name: 'cart-outline' },
    { id: '40', name: 'pricetag-outline' },
    { id: '41', name: 'receipt-outline' },
    { id: '42', name: 'trending-up-outline' },
    { id: '43', name: 'trending-down-outline' },
    { id: '44', name: 'stats-chart-outline' },
    { id: '45', name: 'pie-chart-outline' },
    { id: '46', name: 'bar-chart-outline' },
    { id: '47', name: 'wallet-outline' },
    { id: '48', name: 'cash-sharp' },
    { id: '49', name: 'card-sharp' },
    { id: '50', name: 'cart-sharp' },
    { id: '51', name: 'airplane-outline' },
    { id: '52', name: 'alarm-outline' },
    { id: '53', name: 'albums-outline' },
    { id: '54', name: 'alert-circle-outline' },
    { id: '55', name: 'american-football-outline' },
    { id: '56', name: 'analytics-outline' },
    { id: '57', name: 'aperture-outline' },
    { id: '58', name: 'apps-outline' },
    { id: '59', name: 'archive-outline' },
    { id: '60', name: 'at-outline' },
];

interface IconPickerModalProps {
    isVisible: boolean;
    onClose: () => void;
    onSelectIcon: (icon: string) => void;
    selectedIcon?: string; // Optional, if no icon selected, default will be shown
}

const IconPickerModal: React.FC<IconPickerModalProps> = ({
    isVisible,
    onClose,
    onSelectIcon,
    selectedIcon = '',
}) => {
    return (
        <Modal
            transparent
            visible={isVisible}
            animationType="fade"
            onRequestClose={onClose}
        >
            <View className="flex-1 justify-center items-center bg-black/50">
                <View className="bg-gray-900 rounded-lg p-4 w-4/5 max-h-[300px]">
                    <Text className="text-white text-lg font-bold mb-4 text-center">
                        Select Icon
                    </Text>

                    <FlatList
                        data={icons}
                        keyExtractor={(item) => item.id}
                        numColumns={5}
                        renderItem={({ item }) => (
                            <TouchableOpacity
                                onPress={() => onSelectIcon(item.name)}
                                className="p-3 items-center"
                            >
                                <Ionicons
                                    name={item.name as any}
                                    size={32}
                                    color={
                                        selectedIcon === item.name
                                            ? '#14b8a6' // Selected icon
                                            : '#9CA3AF' // Default icon
                                    }
                                />
                            </TouchableOpacity>
                        )}
                    />
                    <TouchableOpacity
                        onPress={onClose}
                        className="bg-teal-500 rounded-md py-2 mt-4"
                    >
                        <Text className="text-center text-white font-bold">
                            Close
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
};

export default IconPickerModal;
