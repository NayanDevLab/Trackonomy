// src/components/common/PickImageButton.tsx
import React from 'react';
import { TouchableOpacity, Text, Image, View, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

interface PickImageButtonProps {
    onImagePicked: (uri: string) => void;
    imageUri?: string | null;
}

/**
 * PickImageButton is a reusable component that launches the image picker.
 * It returns the local image URI via the onImagePicked callback.
 */
const PickImageButton: React.FC<PickImageButtonProps> = ({
    onImagePicked,
    imageUri,
}) => {
    const handlePress = async () => {
        const permissionResult =
            await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (!permissionResult.granted) {
            Alert.alert(
                'Permission required',
                'Permission to access media library is required!',
            );
            return;
        }
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            quality: 1,
        });
        if (!result.canceled && result.assets && result.assets.length > 0) {
            const uri = result.assets[0].uri;
            onImagePicked(uri);
        }
    };

    return (
        <View className="mb-4">
            <TouchableOpacity
                onPress={handlePress}
                className="bg-gray-800 px-4 py-3 rounded-md"
            >
                <Text className="text-white">Select Receipt Image</Text>
            </TouchableOpacity>
            {imageUri && (
                <Image
                    source={{ uri: imageUri }}
                    className="w-24 h-24 mt-2 rounded-md"
                />
            )}
        </View>
    );
};

export default PickImageButton;
