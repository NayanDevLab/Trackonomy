import { Stack } from 'expo-router';
import { ROUTES } from '@/src/constants/routes';
import '../global.css';
import { Provider } from 'react-redux';
import Toast from 'react-native-toast-message';
import store from '@/src/redux/store';
import AppInitializer from '@/src/components/AppInitializer';
import React from 'react';
import PrimaryHeader from '@/src/components/common/layouts/Primaryheader';
export default function RootLayout() {
    const allRoutes = [...ROUTES.AUTH, ...ROUTES.MAIN];

    return (
        <>
            <Toast />
            <Provider store={store}>
                <AppInitializer>
                    <Stack screenOptions={{ headerShown: false }}>
                        {allRoutes.map((route) => (
                            <Stack.Screen
                                key={route.name}
                                name={route.name}
                                options={{
                                    ...route.options,
                                    ...(route.options.headerShown && {
                                        header: () => (
                                            <PrimaryHeader
                                                title={
                                                    route.options.title ||
                                                    'My App'
                                                }
                                            />
                                        ),
                                    }),
                                }}
                            />
                        ))}
                    </Stack>
                </AppInitializer>
            </Provider>
        </>
    );
}
