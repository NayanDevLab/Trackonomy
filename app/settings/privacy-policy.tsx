import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { PRIVACY_POLICY } from '@/src/constants';

export default function PrivacyPolicyScreen() {
    return (
        <View className="flex-1 bg-[#212129] px-4 pt-6">
            <ScrollView showsVerticalScrollIndicator={false}>
                <View className="items-center mb-6">
                    <Ionicons
                        name="document-text-outline"
                        size={64}
                        color="#14b8a6"
                    />
                    <Text className="text-teal-400 font-bold text-xl mt-4">
                        Trackonomy
                    </Text>
                </View>

                {PRIVACY_POLICY.map((section, index) => (
                    <View key={index} className="mb-4">
                        <Text className="text-teal-400 font-semibold text-md mt-4">
                            {section.heading}
                        </Text>

                        {section.paragraphs.map((para, pIndex) => (
                            <Text
                                key={pIndex}
                                className="text-gray-400 text-md leading-6 mt-2"
                            >
                                {para}
                            </Text>
                        ))}
                    </View>
                ))}
            </ScrollView>
        </View>
    );
}
