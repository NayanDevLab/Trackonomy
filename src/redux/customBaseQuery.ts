import { fetchBaseQuery, FetchBaseQueryError } from '@reduxjs/toolkit/query';
import type { BaseQueryFn } from '@reduxjs/toolkit/query';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';
import { Alert } from 'react-native';

export interface CommonResponse<DataType = any> {
    success: boolean;
    message?: string;
    data?: DataType;
    errors?: any;
}

/**
 * Optional: We'll allow each endpoint to pass custom "meta" settings.
 * For example, meta: { successMessage: "Overridden success message" }
 */
interface CustomMeta {
    successMessage?: string;
    errorMessage?: string;
    skipSuccessToast?: boolean;
    skipErrorToast?: boolean;
}

type CustomBaseQueryArgs = {
    url: string;
    method?: string;
    body?: any;
    params?: Record<string, any>;
    meta?: CustomMeta; // We'll read this in the base query
};

const rawBaseQuery = fetchBaseQuery({
    baseUrl: 'https://trackonomy-api.onrender.com/api',
    prepareHeaders: async (headers) => {
        // Retrieve token from AsyncStorage
        const token = await AsyncStorage.getItem('authToken');
        if (token) {
            headers.set('Authorization', `Bearer ${token}`);
        }
        return headers;
    },
});

/**
 * A custom base query that intercepts and shows toast messages.
 */
export const baseQueryWithInterceptor: BaseQueryFn<
    CustomBaseQueryArgs, // Arguments
    unknown, // Returned response
    unknown // Error
> = async (args, api, extraOptions) => {
    // Extract meta fields (if provided)
    const { meta, ...baseQueryArgs } = args;

    // Execute the real base query
    const result = await rawBaseQuery(baseQueryArgs, api, extraOptions);

    // If there is a "fetchBaseQuery" error (network/server error, 5xx, 4xx, etc.)
    if (result.error) {
        const fetchError = result.error as FetchBaseQueryError & {
            data?: CommonResponse;
        };

        // Possibly the server returned error with CommonResponse
        const serverData = fetchError?.data;

        // Show a toast if skipErrorToast is not set to true
        if (!meta?.skipErrorToast) {
            Alert.alert(
                'Error',
                meta?.errorMessage ||
                    serverData?.message ||
                    'An unexpected error occurred.',
            );
        }

        return {
            error: result.error,
        };
    }

    // Otherwise, we have a successful HTTP call, but let's check `success` from the server
    const data = result.data as CommonResponse;

    if (!data.success) {
        // The server responded, but success=false
        if (!meta?.skipErrorToast) {
            Alert.alert(
                'Error',
                meta?.errorMessage ||
                    data?.message ||
                    'An unexpected error occurred.',
            );
        }

        // Return an "error" so that RTK Query sets `isError` in the hooks
        return {
            error: {
                status: 'CUSTOM_ERROR',
                data,
            },
        };
    }

    // If we reach here, success = true. Optionally show a success toast
    if (!meta?.skipSuccessToast) {
        const successMsg = meta?.successMessage || data?.message;
        if (successMsg) {
            Alert.alert('Success', successMsg);
        }
    }

    // Return the data as normal for the success case
    return {
        data: data,
    };
};
