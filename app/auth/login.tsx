import { useRouter } from 'expo-router';
import React from 'react';
import { View, Text, Image, TouchableOpacity, Alert } from 'react-native';

import BackButton from '@/src/components/common/BackButton';
import PrimaryInput from '@/src/components/common/PrimaryInput';
import PrimaryButton from '@/src/components/common/PrimaryButton';
import { COMMON_CONSTANTS, REGISTER_SCREEN } from '@/src/constants';
import { useAppDispatch, useTypedSelector } from '@/src/hooks/useTypedSelector';
import { setLogin, setLoginError } from '@/src/redux/auth/authSlice';
import { useLoginMutation } from '@/src/redux/auth/authApi';
import { emailValidate, passwordValidate } from '@/src/utils/validation';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function LoginScreen() {
    const router = useRouter();
    const dispatch = useAppDispatch();
    const { login, loginError } = useTypedSelector((state) => state.auth);

    const [loginApi, { isLoading }] = useLoginMutation();

    const onChangeInputFields = (field: string, value: string) => {
        dispatch(setLogin({ ...login, [field]: value }));
    };

    const handleLogin = async () => {
        const emailError = emailValidate(login.email);
        const passwordError = passwordValidate(login.password);

        if (emailError || passwordError) {
            dispatch(
                setLoginError({
                    email: { isError: !!emailError, message: emailError || '' },
                    password: {
                        isError: !!passwordError,
                        message: passwordError || '',
                    },
                }),
            );
            return;
        }

        try {
            const response = await loginApi(login).unwrap();
            console.log('Login Successful:', response);

            await AsyncStorage.setItem('authToken', response.data.token);

            router.replace('/home'); // Navigate to home screen
        } catch (error: any) {
            console.error('Login Failed:', error);
            Alert.alert(
                'Login Failed',
                error?.data?.message || 'An unexpected error occurred.',
            );
        }
    };

    const goToRegistrationScreen = () => {
        router.push('/auth/registration');
    };

    return (
        <View className="flex-1 bg-[#212129] px-4 pt-10">
            {/* Header */}
            <View className="items-center mb-6 relative">
                <BackButton classname="absolute left-0" />
                <Image
                    source={require('../../assets/images/money_icon.png')}
                    className="w-16 h-16 mb-2"
                    resizeMode="contain"
                />
                <Text className="text-teal-400 text-lg font-bold">
                    {COMMON_CONSTANTS.APP.NAME}
                </Text>
            </View>

            {/* Form */}
            <View className="bg-[#2B2B33] rounded-3xl p-6">
                <Text className="text-white text-lg font-bold text-center mb-2">
                    {REGISTER_SCREEN.HEADER.LOGIN_TITLE}
                </Text>
                <Text className="text-gray-400 text-center mb-6">
                    {REGISTER_SCREEN.HEADER.LOGIN_SUBTITLE}
                </Text>

                {/* Input Fields */}
                <View className="gap-y-3">
                    <PrimaryInput
                        placeholder={REGISTER_SCREEN.FORM.EMAIL_PLACEHOLDER}
                        placeholderTextColor="#A0AEC0"
                        keyboardType="email-address"
                        value={login.email}
                        onChangeText={(value) =>
                            onChangeInputFields('email', value)
                        }
                        errorMessage={loginError.email.message}
                    />
                    <PrimaryInput
                        placeholder={REGISTER_SCREEN.FORM.PASSWORD_PLACEHOLDER}
                        placeholderTextColor="#A0AEC0"
                        value={login.password}
                        onChangeText={(value) =>
                            onChangeInputFields('password', value)
                        }
                        errorMessage={loginError.password.message}
                        secureTextEntry
                    />
                    <PrimaryButton
                        title={
                            isLoading
                                ? 'Logging In...'
                                : REGISTER_SCREEN.BUTTON.LOGIN
                        }
                        onPress={handleLogin}
                        disabled={isLoading}
                    />
                    <View className="flex flex-row justify-center mt-4">
                        <Text className="text-gray-400">
                            {REGISTER_SCREEN.DONT_ACCOUNT}{' '}
                        </Text>
                        <TouchableOpacity onPress={goToRegistrationScreen}>
                            <Text className="text-teal-400 font-bold underline">
                                {REGISTER_SCREEN.SIGN_IN}
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </View>
    );
}
