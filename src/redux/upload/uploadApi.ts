import { apiSlice } from '../apiSlice';

export const uploadApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        uploadImage: builder.mutation<{ url: string }, FormData>({
            query: (formData) => ({
                url: '/upload/image',
                method: 'POST',
                body: formData,
            }),
        }),
    }),
});

export const { useUploadImageMutation } = uploadApi;
