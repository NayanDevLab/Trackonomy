import Dropdown from '@/src/components/common/Dropdown';
import PrimaryInput from '@/src/components/common/PrimaryInput';
import { accountConstants } from '@/src/constants/screens/account';
import { useAppDispatch, useTypedSelector } from '@/src/hooks/useTypedSelector';
import { useAddAccountMutation } from '@/src/redux/account/accountApi';
import { resetAccount, setAccount } from '@/src/redux/account/accountSlice';
import { Ionicons } from '@expo/vector-icons'; // Import Ionicons
import { useRouter } from 'expo-router'; // Expo Router for navigation
import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    Modal,
    FlatList,
    ScrollView,
    Alert,
} from 'react-native';

const icons: {
    id: string;
    name: keyof typeof Ionicons.glyphMap;
}[] = [
    { id: '1', name: 'cash-outline' },
    { id: '2', name: 'card-outline' },
    { id: '3', name: 'logo-paypal' },
    { id: '4', name: 'wallet-outline' },
    { id: '5', name: 'business-outline' },
    { id: '6', name: 'home-outline' },
    { id: '7', name: 'analytics-outline' },
    { id: '8', name: 'speedometer-outline' },
    { id: '9', name: 'flame-outline' },
    { id: '10', name: 'megaphone-outline' },
    { id: '11', name: 'build-outline' },
    { id: '12', name: 'checkmark-circle-outline' },
    { id: '13', name: 'ban-outline' },
    { id: '14', name: 'cash-sharp' },
    { id: '15', name: 'card-sharp' },
    { id: '16', name: 'logo-bitcoin' },
    { id: '17', name: 'logo-usd' },
    { id: '18', name: 'logo-euro' },
    { id: '19', name: 'logo-yen' },
    { id: '20', name: 'logo-venmo' },
    { id: '21', name: 'logo-google' },
    { id: '22', name: 'logo-apple' },
    { id: '23', name: 'logo-amazon' },
    { id: '24', name: 'logo-twitter' },
    { id: '25', name: 'logo-facebook' },
    { id: '26', name: 'logo-instagram' },
    { id: '27', name: 'logo-linkedin' },
    { id: '28', name: 'logo-pinterest' },
    { id: '29', name: 'logo-reddit' },
    { id: '30', name: 'logo-snapchat' },
    { id: '31', name: 'logo-tumblr' },
    { id: '32', name: 'logo-vimeo' },
    { id: '33', name: 'logo-whatsapp' },
    { id: '34', name: 'logo-youtube' },
    { id: '35', name: 'logo-twitch' },
    { id: '36', name: 'logo-slack' },
    { id: '37', name: 'logo-skype' },
    { id: '38', name: 'text-outline' },
    { id: '39', name: 'logo-wechat' },
    { id: '40', name: 'wine-sharp' },
    { id: '41', name: 'logo-wordpress' },
    { id: '42', name: 'logo-xing' },
    { id: '43', name: 'logo-yahoo' },
    { id: '44', name: 'logo-yen' },
    { id: '45', name: 'logo-ionic' },
    { id: '46', name: 'logo-android' },
    { id: '47', name: 'logo-angular' },
    { id: '48', name: 'logo-chrome' },
    { id: '49', name: 'logo-codepen' },
    { id: '50', name: 'logo-css3' },
    { id: '51', name: 'logo-dribbble' },
    { id: '52', name: 'logo-dropbox' },
    { id: '53', name: 'logo-edge' },
    { id: '54', name: 'logo-electron' },
    { id: '55', name: 'logo-firebase' },
    { id: '56', name: 'logo-firefox' },
    { id: '57', name: 'logo-github' },
    { id: '58', name: 'logo-gitlab' },
    { id: '59', name: 'logo-html5' },
    { id: '60', name: 'logo-ionic' },
    { id: '61', name: 'logo-javascript' },
    { id: '62', name: 'logo-laravel' },
    { id: '63', name: 'logo-markdown' },
    { id: '64', name: 'logo-nodejs' },
    { id: '65', name: 'logo-npm' },
    { id: '66', name: 'logo-python' },
    { id: '67', name: 'logo-react' },
    { id: '68', name: 'logo-sass' },
    { id: '69', name: 'logo-stackoverflow' },
    { id: '70', name: 'logo-steam' },
    { id: '71', name: 'logo-vue' },
    { id: '72', name: 'logo-windows' },
    { id: '73', name: 'logo-wordpress' },
    { id: '74', name: 'logo-xbox' },
    { id: '75', name: 'logo-yahoo' },
    { id: '76', name: 'logo-yen' },
    { id: '77', name: 'logo-youtube' },
    { id: '78', name: 'warning-outline' },
    { id: '79', name: 'logo-ionic' },
    { id: '80', name: 'logo-apple' },
];

export default function AddAccount() {
    const router = useRouter();
    const [selectedIcon, setSelectedIcon] = useState('');
    const [isModalVisible, setModalVisible] = useState(false);

    const dispatch = useAppDispatch();
    const { account } = useTypedSelector((state) => state.account);

    const handleIconSelect = (icon: string) => {
        setSelectedIcon(icon);
        setModalVisible(false); // Close modal after selection
    };

    const onChangeInputFields = (field: string, value: string | number) => {
        let parsedValue: string | number = value;

        if (field === 'balance') {
            parsedValue = value === '' ? 0 : parseFloat(value as string);
        }

        dispatch(setAccount({ ...account, [field]: parsedValue }));
    };

    const [addAccount] = useAddAccountMutation();

    const handleAddAccount = async () => {
        try {
            console.log('Adding account:', account);
            const response = await addAccount({
                ...account,
                account_type: 'Savings',
            }).unwrap();
            console.log('Account added successfully:', response);
            dispatch(resetAccount());
            router.navigate('/settings/accounts-list');

            Alert.alert('Success', 'Account added successfully!');
        } catch (error: any) {
            console.error('Error adding account:', error);

            if (error?.status === 400) {
                Alert.alert(
                    'Validation Error',
                    error.data?.message ||
                        'Invalid input. Please check your data.',
                );
            } else if (error?.status === 401) {
                Alert.alert(
                    'Unauthorized',
                    'You are not authorized to perform this action.',
                );
            } else if (error?.status === 500) {
                Alert.alert(
                    'Server Error',
                    'Something went wrong on our end. Please try again later.',
                );
            } else {
                Alert.alert(
                    'Error',
                    'An unexpected error occurred. Please try again.',
                );
            }
        }
    };

    return (
        <View className="flex-1 bg-darkBg px-4 pt-6">
            {/* Header */}
            <View className="flex-row items-center mb-6">
                <TouchableOpacity onPress={() => router.back()}>
                    <Text className="text-teal-500 text-lg">←</Text>
                </TouchableOpacity>
                <Text className="text-white text-lg font-bold ml-4">
                    Add Account
                </Text>
            </View>

            <PrimaryInput
                value={account.name}
                onChangeText={(value) => onChangeInputFields('name', value)}
                placeholder="Enter Account Name"
                label="Account Name"
                placeholderTextColor="#A0AEC0"
            />

            <PrimaryInput
                value={account.balance.toString()}
                onChangeText={(value) => onChangeInputFields('balance', value)}
                label="Balance"
                placeholder="Enter Balance"
                placeholderTextColor="#A0AEC0"
                keyboardType="numeric"
            />

            <View className="mb-6">
                <Text className="text-gray-400 text-sm mb-2">Select Icon</Text>
                <TouchableOpacity
                    onPress={() => setModalVisible(true)} // Open Modal
                    className="bg-gray-800 px-4 py-3 rounded-md"
                >
                    <Text className="text-white">
                        {selectedIcon ? selectedIcon : 'Select Icon'}
                    </Text>
                </TouchableOpacity>
            </View>

            <View className="mb-6">
                <Dropdown
                    label="Account Type"
                    options={accountConstants.accountTypeDropdownOptions}
                    selectedValue={account.accountType}
                    onValueChange={(value) =>
                        onChangeInputFields('accountType', value)
                    }
                />
            </View>

            <PrimaryInput
                value={account.description}
                onChangeText={(value) =>
                    onChangeInputFields('description', value)
                }
                label="Description"
                placeholder="Enter Description"
                placeholderTextColor="#A0AEC0"
                multiline={true}
            />

            {/* Add Button */}
            <TouchableOpacity
                onPress={handleAddAccount}
                className="bg-teal-500 rounded-md py-4"
            >
                <Text className="text-center text-white font-bold text-lg">
                    Add
                </Text>
            </TouchableOpacity>
            <Modal
                transparent
                visible={isModalVisible}
                animationType="fade"
                onRequestClose={() => setModalVisible(false)}
            >
                <View className="flex-1 bg-black/50 justify-center items-center">
                    <View className="bg-gray-900 rounded-lg p-4 w-4/5 max-h-[300px]">
                        {/* Modal Header */}
                        <Text className="text-white text-lg font-bold mb-4 text-center">
                            Select Icon
                        </Text>

                        {/* Scrollable List of Icons */}
                        <ScrollView className="flex-grow">
                            <FlatList
                                data={icons}
                                numColumns={4}
                                keyExtractor={(item) => item.id}
                                scrollEnabled={false} // Use parent ScrollView for scrolling
                                renderItem={({ item }) => (
                                    <TouchableOpacity
                                        onPress={() => {
                                            onChangeInputFields(
                                                'icon',
                                                item.name,
                                            );
                                            setModalVisible(false);
                                        }}
                                        className="w-1/4 items-center justify-center mb-4"
                                    >
                                        <Ionicons
                                            name={item.name}
                                            size={32}
                                            color={
                                                selectedIcon === item.name
                                                    ? '#14b8a6'
                                                    : '#9CA3AF' // Teal for selected, gray for others
                                            }
                                        />
                                    </TouchableOpacity>
                                )}
                            />
                        </ScrollView>

                        {/* Close Button */}
                        <TouchableOpacity
                            onPress={() => setModalVisible(false)}
                            className="bg-teal-500 rounded-md mt-4 py-2"
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
}
