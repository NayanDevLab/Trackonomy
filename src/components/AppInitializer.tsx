import React, { useEffect } from 'react';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch } from 'react-redux';
import { setToken } from '@/src/redux/auth/authSlice';
import { useConnectivity } from '../hooks/useConnectivity';
import { useGetUserProfileQuery } from '../redux/auth/authApi';

const AppInitializer: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    const router = useRouter();
    const dispatch = useDispatch();
    const isConnected = useConnectivity();
    const { data } = useGetUserProfileQuery({});

    useEffect(() => {
        const checkFirstLaunch = async () => {
            const isFirstLaunch = await AsyncStorage.getItem('isFirstLaunch');

            if (isFirstLaunch === null) {
                await AsyncStorage.setItem('isFirstLaunch', 'false');
                router.push('/onBoardingScreen');
            } else {
                initializeApp();
            }
        };

        const initializeApp = async () => {
            if (isConnected === false) {
                router.replace('/nointernetscreen');
                return;
            }

            if (isConnected === true) {
                const token = await AsyncStorage.getItem('authToken');
                if (token) {
                    dispatch(setToken(token));
                    router.replace('/home');
                } else {
                    router.replace('/auth/login');
                }
            }
        };

        checkFirstLaunch();
    }, [dispatch, router, isConnected, data]);

    if (isConnected === null) {
        console.log('Checking internet connection...');
        return null;
    }

    return <>{children}</>;
};

export default AppInitializer;
