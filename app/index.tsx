import React from 'react';
import { View, Text, Image } from 'react-native';
import MyStatusBar from '@/src/components/common/MyStatusBar';
import { COMMON_CONSTANTS } from '@/src/constants';

export default function SplashScreen() {
    return (
        <View className="flex-1 bg-darkBg items-center justify-center">
            <MyStatusBar />
            <Image
                source={require('../assets/images/money_icon.png')}
                className="w-24 h-24 mb-5"
                resizeMode="contain"
            />

            <Text className="text-2xl font-bold text-teal-400">
                {COMMON_CONSTANTS.APP.NAME}
            </Text>
        </View>
    );
}
