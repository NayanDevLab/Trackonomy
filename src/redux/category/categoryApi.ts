import { apiSlice } from '../apiSlice';
import { CategoriesResponse } from './categoryType';

export const categoryApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getCategories: builder.query<CategoriesResponse, void>({
            query: () => ({
                url: '/categories',
                meta: { skipSuccessToast: false },
            }),
            providesTags: ['Category'],
        }),
        addCategory: builder.mutation({
            query: (category) => ({
                url: '/categories',
                method: 'POST',
                body: category,
            }),
            invalidatesTags: ['Category'],
        }),
        deleteCategory: builder.mutation({
            query: (id) => ({
                url: `/categories/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Category'],
        }),
        updateCategory: builder.mutation({
            query: ({ id, ...category }) => ({
                url: `/categories/${id}`,
                method: 'PUT',
                body: category,
            }),
            invalidatesTags: ['Category'],
        }),
    }),
});

export const {
    useGetCategoriesQuery,
    useAddCategoryMutation,
    useDeleteCategoryMutation,
    useUpdateCategoryMutation,
} = categoryApi;
