import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    Image,
    TouchableOpacity,
    Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import PrimaryButton from '@/src/components/common/PrimaryButton';

export default function EditProfileScreen() {
    const [name, setName] = useState('Darshan Shah');
    const [email, setEmail] = useState('darshanshah@mail.com');
    const [mobileNumber, setMobileNumber] = useState('+91 1234567890');

    const handleUpdate = () => {
        Alert.alert(
            'Profile Updated',
            'Your profile details have been updated successfully.',
        );
    };

    const handleEditProfilePicture = () => {
        Alert.alert(
            'Edit Picture',
            'Profile picture edit functionality coming soon!',
        );
    };

    return (
        <View className="flex-1 bg-[#212129] px-4 pt-6">
            {/* Profile Picture */}
            <View className="items-center mb-8">
                <View className="relative">
                    <Image
                        source={{ uri: 'https://i.pravatar.cc/300' }} // Replace with your profile picture path
                        className="w-32 h-32 rounded-full"
                    />
                    <TouchableOpacity
                        className="absolute bottom-0 right-0 bg-teal-500 p-2 rounded-full"
                        onPress={handleEditProfilePicture}
                    >
                        <Ionicons
                            name="camera-outline"
                            size={16}
                            color="white"
                        />
                    </TouchableOpacity>
                </View>
            </View>

            {/* Form */}
            <View className="gap-y-4">
                {/* Name Field */}
                <View>
                    <Text className="text-gray-400 mb-2">Name</Text>
                    <TextInput
                        value={name}
                        onChangeText={setName}
                        className="bg-gray-800 text-white px-4 py-3 rounded-md"
                    />
                </View>

                {/* Email Field */}
                <View>
                    <Text className="text-gray-400 mb-2">Email address</Text>
                    <TextInput
                        value={email}
                        onChangeText={setEmail}
                        className="bg-gray-800 text-white px-4 py-3 rounded-md"
                        keyboardType="email-address"
                    />
                </View>

                {/* Mobile Number Field */}
                <View>
                    <Text className="text-gray-400 mb-2">Mobile number</Text>
                    <TextInput
                        value={mobileNumber}
                        onChangeText={setMobileNumber}
                        className="bg-gray-800 text-white px-4 py-3 rounded-md"
                        keyboardType="phone-pad"
                    />
                </View>
            </View>

            {/* Update Button */}
            <View className="mt-8">
                <PrimaryButton title="Update" onPress={handleUpdate} />
            </View>
        </View>
    );
}
