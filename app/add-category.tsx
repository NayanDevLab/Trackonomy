import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    Modal,
    FlatList,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

const icons = [
    { id: '1', name: 'fast-food-outline' },
    { id: '2', name: 'tv-outline' },
    { id: '3', name: 'wallet-outline' },
    // Add more icons here
];

const AddCategoryScreen = () => {
    const [category, setCategory] = useState({
        name: '',
        icon: '',
    });
    const [isModalVisible, setModalVisible] = useState(false);
    const [selectedIcon, setSelectedIcon] = useState('');
    const router = useRouter();

    const handleIconSelect = (icon: string) => {
        setSelectedIcon(icon);
        setModalVisible(false);
    };

    const handleSaveCategory = () => {
        // Logic to save the category
        console.log('Category saved:', category);
        router.push('/settings/category-list'); // Navigate to category list screen after saving
    };

    return (
        <View className="flex-1 bg-darkBg px-4 pt-6">
            <Text className="text-white text-2xl font-bold mb-6">
                Add Category
            </Text>

            <TextInput
                className="bg-gray-800 text-white px-4 py-3 rounded-md mb-6"
                placeholder="Category Name"
                placeholderTextColor="#A0AEC0"
                value={category.name}
                onChangeText={(text) =>
                    setCategory({ ...category, name: text })
                }
            />

            <TouchableOpacity
                className="bg-gray-800 px-4 py-3 rounded-md mb-6"
                onPress={() => setModalVisible(true)} // Open Modal
            >
                <Text className="text-white">
                    {selectedIcon || 'Select Icon'}
                </Text>
            </TouchableOpacity>

            <TouchableOpacity
                onPress={handleSaveCategory}
                className="bg-teal-500 rounded-md py-4"
            >
                <Text className="text-center text-white font-bold text-lg">
                    Save Category
                </Text>
            </TouchableOpacity>

            <Modal
                transparent
                visible={isModalVisible}
                animationType="fade"
                onRequestClose={() => setModalVisible(false)}
            >
                <View className="flex-1 justify-center items-center bg-black/50">
                    <View className="bg-gray-900 rounded-lg p-4 w-4/5 max-h-[300px]">
                        <Text className="text-white text-lg font-bold mb-4 text-center">
                            Select Icon
                        </Text>
                        <FlatList
                            data={icons}
                            keyExtractor={(item) => item.id}
                            renderItem={({ item }) => (
                                <TouchableOpacity
                                    onPress={() => handleIconSelect(item.name)}
                                    className="p-3 items-center"
                                >
                                    <Ionicons
                                        name={item.name as any}
                                        size={32}
                                        color={
                                            selectedIcon === item.name
                                                ? '#14b8a6'
                                                : '#9CA3AF'
                                        }
                                    />
                                </TouchableOpacity>
                            )}
                        />
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

export default AddCategoryScreen;
