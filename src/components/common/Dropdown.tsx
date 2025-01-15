import React, { useState } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    Modal,
    FlatList,
    ScrollView,
    StyleSheet,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface DropdownProps {
    label: string;
    selectedValue: string;
    options: { id: string; label: string }[];
    onValueChange: (value: string) => void;
}

const Dropdown: React.FC<DropdownProps> = ({
    label,
    selectedValue,
    options,
    onValueChange,
}) => {
    const [isModalVisible, setModalVisible] = useState(false);

    const handleSelect = (value: string) => {
        onValueChange(value);
        setModalVisible(false);
    };

    return (
        <View>
            <Text className="text-gray-400 text-sm mb-2">{label}</Text>
            <TouchableOpacity
                onPress={() => setModalVisible(true)} // Open Modal
                className="bg-gray-800 rounded-md px-4 py-3"
            >
                <Text className="text-white">
                    {selectedValue || 'Select an option'}
                </Text>
            </TouchableOpacity>

            {/* Modal for Dropdown */}
            <Modal
                transparent
                visible={isModalVisible}
                animationType="fade"
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.modalOverlay}>
                    <View className="bg-gray-900 rounded-lg w-4/5 max-h-[300px] p-4">
                        {/* Modal Header */}
                        <Text className="text-white text-lg font-bold mb-4 text-center">
                            Select an Option
                        </Text>

                        {/* Scrollable List of Options */}
                        <ScrollView
                            style={{ maxHeight: 200 }}
                            showsVerticalScrollIndicator={true} // Ensure scrollbar is visible
                        >
                            <FlatList
                                data={options}
                                keyExtractor={(item) => item.id}
                                scrollEnabled={false} // Use parent ScrollView for scrolling
                                renderItem={({ item }) => (
                                    <TouchableOpacity
                                        onPress={() => handleSelect(item.label)}
                                        className="flex-row items-center justify-between p-3 rounded-md mb-2 bg-gray-800"
                                    >
                                        <Text className="text-white">
                                            {item.label}
                                        </Text>
                                        {selectedValue === item.label && (
                                            <Ionicons
                                                name="checkmark-circle-outline"
                                                size={20}
                                                color="#14b8a6"
                                            />
                                        )}
                                    </TouchableOpacity>
                                )}
                            />
                        </ScrollView>

                        {/* Close Button */}
                        <TouchableOpacity
                            onPress={() => setModalVisible(false)}
                            className="bg-teal-500 rounded-md py-2 mt-4"
                        >
                            <Text className="text-center text-white font-bold">
                                Close
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    modalOverlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
});

export default Dropdown;
