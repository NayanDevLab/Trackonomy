import { apiSlice } from '../apiSlice';
import { ExpenseResponse } from './expenseTypes';

export const expenseApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getExpenses: builder.query<ExpenseResponse, void>({
            query: () => '/expenses',
            providesTags: ['Expense'],
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
    }),
});

export const {
    useGetExpensesQuery,
    useAddExpenseMutation,
    useDeleteExpenseMutation,
} = expenseApi;
