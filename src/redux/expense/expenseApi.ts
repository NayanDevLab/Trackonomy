import { apiSlice } from '../apiSlice';
import {
    ExpenseResponse,
    ExpenseResponseItem,
    IExpenseState,
} from './expenseTypes';

export const expenseApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getExpenses: builder.query<ExpenseResponse, void>({
            query: () => '/expenses',
            providesTags: ['Expense'],
        }),
        // Get Expense by ID
        getExpenseById: builder.query<ExpenseResponseItem, string>({
            query: (id) => `/expenses/${id}`,
            providesTags: (result, error, id) => [{ type: 'Expense', id }],
        }),
        // Add Expense
        addExpense: builder.mutation({
            query: (expense) => ({
                url: '/expenses',
                method: 'POST',
                body: expense,
            }),
            invalidatesTags: ['Expense'],
        }),
        // Delete Expense
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
