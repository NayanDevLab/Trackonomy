import AsyncStorage from '@react-native-async-storage/async-storage';
import { apiSlice } from '../apiSlice';
import { ILoginResponse, LoginPayload } from './authType';

export const authApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation<ILoginResponse, LoginPayload>({
            query: (credentials) => ({
                url: '/auth/login',
                method: 'POST',
                body: credentials,
            }),
            async onQueryStarted(args, { queryFulfilled, dispatch }) {
                try {
                    const { data } = await queryFulfilled;
                    if (data?.success) {
                        await AsyncStorage.setItem(
                            'authToken',
                            data.data.token,
                        );
                    }
                } catch (error) {
                    console.error('Login failed:', error);
                }
            },
        }),
        register: builder.mutation({
            query: (userData) => ({
                url: '/auth/register',
                method: 'POST',
                body: userData,
            }),
        }),
    }),
});

export const { useLoginMutation, useRegisterMutation } = authApi;
