import AsyncStorage from '@react-native-async-storage/async-storage';
import { apiSlice } from '../apiSlice';
import { ILoginResponse, LoginPayload } from './authType';
import { setUserProfile } from './authSlice';

export const authApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation<ILoginResponse, LoginPayload>({
            query: (credentials) => ({
                url: '/auth/login',
                method: 'POST',
                body: credentials,
                meta: { successMessage: 'You have logged in successfully!' },
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
                meta: { successMessage: 'You have registered successfully!' },
            }),
        }),
        getUserProfile: builder.query({
            query: () => ({
                url: '/user/profile',
                meta: { skipSuccessToast: true },
            }),
            onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
                try {
                    const { data } = await queryFulfilled;
                    dispatch(setUserProfile(data.data));
                } catch (error) {
                    console.error('Get user profile failed:', error);
                }
            },
        }),
    }),
});

export const { useLoginMutation, useRegisterMutation, useGetUserProfileQuery } =
    authApi;
