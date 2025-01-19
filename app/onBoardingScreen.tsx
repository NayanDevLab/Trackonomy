import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import {
    GestureHandlerRootView,
    GestureDetector,
    Gesture,
} from 'react-native-gesture-handler'; // Corrected import
import MyStatusBar from '@/src/components/common/MyStatusBar';
import onBoardingConstants from '@/src/constants/screens/onBoarding';

export default function OnboardingScreen() {
    const [currentSlide, setCurrentSlide] = useState<number>(0);
    const router = useRouter();

    // Gesture detection logic using Gesture.Pan
    const panGesture = Gesture.Pan().onUpdate((event) => {
        if (event.translationX < -100) {
            // Right to Left swipe (next slide)
            if (currentSlide < onBoardingConstants.onBoardingData.length - 1) {
                setCurrentSlide(currentSlide + 1);
            }
        } else if (event.translationX > 100) {
            // Left to Right swipe (previous slide)
            if (currentSlide > 0) {
                setCurrentSlide(currentSlide - 1);
            }
        }
    });

    const handleNext = () => {
        if (currentSlide < onBoardingConstants.onBoardingData.length - 1) {
            setCurrentSlide(currentSlide + 1);
        } else {
            router.replace('/auth/registration');
        }
    };

    const handlePrevious = () => {
        if (currentSlide > 0) {
            setCurrentSlide(currentSlide - 1);
        }
    };

    const handleSkip = () => {
        router.replace('/auth/registration');
    };

    return (
        <GestureHandlerRootView className="flex-1 bg-darkBg">
            <MyStatusBar />
            <View className="absolute top-12 right-6">
                <TouchableOpacity onPress={handleSkip}>
                    <Text className="text-teal-400 font-bold">
                        {onBoardingConstants.button.skip}
                    </Text>
                </TouchableOpacity>
            </View>
            <GestureDetector gesture={panGesture}>
                <View className="flex-1 items-center justify-center">
                    <Image
                        source={require('../assets/images/money_ai.png')}
                        className="h-64 w-64"
                        resizeMode="contain"
                    />
                </View>
            </GestureDetector>
            <View className="rounded-t-3xl bg-[#37373E] p-6">
                <Text className="text-center text-teal-400 text-lg font-bold mb-2">
                    {onBoardingConstants.onBoardingData[currentSlide].title}
                </Text>
                <Text className="text-center text-gray-400 mb-4">
                    {
                        onBoardingConstants.onBoardingData[currentSlide]
                            .description
                    }
                </Text>
                <View className="flex-row justify-center mt-2 mb-6">
                    {onBoardingConstants.onBoardingData.map((_, index) => (
                        <View
                            key={index}
                            className={`h-2 w-2 mx-1 rounded-full ${
                                index === currentSlide
                                    ? 'bg-teal-400'
                                    : 'bg-gray-500'
                            }`}
                        />
                    ))}
                </View>
                <View className="flex-row justify-between px-4 mt-4 gap-x-4">
                    <TouchableOpacity
                        onPress={handlePrevious}
                        disabled={currentSlide === 0}
                        className={`flex-1 items-center justify-center rounded-lg py-3 ${
                            currentSlide === 0
                                ? 'bg-teal-400 opacity-50'
                                : 'bg-teal-400'
                        }`}
                    >
                        <Text className="text-white font-bold text-lg">
                            {onBoardingConstants.button.previous}
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={handleNext}
                        className="flex-1 items-center justify-center rounded-lg py-3 bg-teal-400"
                    >
                        <Text className="text-white font-bold text-lg">
                            {currentSlide ===
                            onBoardingConstants.onBoardingData.length - 1
                                ? onBoardingConstants.button.finish
                                : onBoardingConstants.button.next}
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </GestureHandlerRootView>
    );
}
