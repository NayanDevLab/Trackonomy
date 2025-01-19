import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { baseQueryWithInterceptor } from './customBaseQuery';

export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: baseQueryWithInterceptor,
    tagTypes: ['Expense', 'Account', 'Category'],
    endpoints: () => ({}),
});
