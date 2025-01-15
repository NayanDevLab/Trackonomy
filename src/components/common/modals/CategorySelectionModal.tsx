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
import { useGetCategoriesQuery } from '@/src/redux/category/categoryApi';
import { CategoryModelResponse } from '@/src/redux/category/categoryType';

interface CategorySelectionModalProps {
    isVisible: boolean;
    onSelectCategory: (category: CategoryModelResponse) => void;
    onClose: () => void;
}

const CategorySelectionModal: React.FC<CategorySelectionModalProps> = ({
    isVisible,
    onSelectCategory,
    onClose,
}) => {
    const { data, isLoading, error } = useGetCategoriesQuery();
    return (
        <Modal
            transparent
            visible={isVisible}
            animationType="slide"
            onRequestClose={onClose}
        >
            <View style={styles.modalOverlay}>
                <View className="bg-gray-900 rounded-t-lg w-full p-4 max-h-[60%]">
                    <Text className="text-white text-xl font-semibold text-center mb-4">
                        Select Category
                    </Text>

                    <FlatList
                        data={data?.data || []}
                        numColumns={3}
                        keyExtractor={(item) => item.id.toString()}
                        renderItem={({ item }) => (
                            <TouchableOpacity
                                onPress={() => {
                                    onSelectCategory(item);
                                    onClose();
                                }}
                                className="flex-1 items-center justify-center m-2 p-4 bg-gray-800 rounded-md"
                            >
                                <Ionicons
                                    name={
                                        item.icon as keyof typeof Ionicons.glyphMap
                                    }
                                    size={32}
                                    color="#38B2AC"
                                />
                                <Text className="text-white text-center mt-2">
                                    {item.name}
                                </Text>
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

export default CategorySelectionModal;

const styles = StyleSheet.create({
    modalOverlay: {
        backgroundColor: 'rgba(0,0,0,0.5)',
        flex: 1,
        justifyContent: 'flex-end',
    },
});
