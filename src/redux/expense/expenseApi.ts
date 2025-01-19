import { apiSlice } from '../apiSlice';
import {
    ExpenseResponse,
    ExpenseResponseItem,
    IExpenseState,
} from './expenseTypes';

export const expenseApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getExpenses: builder.query<
            ExpenseResponse,
            { sort?: string; limit?: number }
        >({
            query: ({ sort, limit }) => {
                let url = '/expenses';

                const queryParams: string[] = [];
                if (sort) queryParams.push(`sort=${sort}`);
                if (limit) queryParams.push(`limit=${limit}`);

                if (queryParams.length > 0) {
                    // Add the query parameters to the URL
                    url += `?${queryParams.join('&')}`;
                }

                return {
                    url,
                    meta: {
                        skipSuccessToast: false,
                    },
                };
            },
            providesTags: ['Expense'],
        }),
        getExpenseById: builder.query<ExpenseResponseItem, string>({
            query: (id) => ({
                url: `/expenses/${id}`,
                meta: { skipSuccessToast: true },
            }),
            providesTags: (result, error, id) => [{ type: 'Expense', id }],
        }),

        addExpense: builder.mutation({
            query: (expense) => ({
                url: '/expenses',
                method: 'POST',
                body: expense,
            }),
            invalidatesTags: ['Expense'],
        }),
        deleteExpense: builder.mutation({
            query: (id) => ({
                url: `/expenses/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Expense'],
        }),
        // Update Expense by ID
        updateExpenseById: builder.mutation({
            query: ({ id, expense }) => ({
                url: `/expenses/${id}`,
                method: 'PUT',
                body: expense,
            }),
            invalidatesTags: (result, error, { id }) => [
                { type: 'Expense', id },
            ],
        }),
    }),
});

export const {
    useGetExpensesQuery,
    useGetExpenseByIdQuery,
    useAddExpenseMutation,
    useDeleteExpenseMutation,
    useUpdateExpenseByIdMutation,
} = expenseApi;
