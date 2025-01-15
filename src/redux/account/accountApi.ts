import { apiSlice } from '../apiSlice';
import { AccountsResponse } from './accountType';

export const accountApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getAccounts: builder.query<AccountsResponse, void>({
            query: () => '/accounts', // API endpoint for fetching accounts
            providesTags: ['Account'],
        }),
        addAccount: builder.mutation({
            query: (account) => ({
                url: '/accounts', // API endpoint for adding a new account
                method: 'POST',
                body: account,
            }),
            invalidatesTags: ['Account'],
        }),
        deleteAccount: builder.mutation({
            query: (id) => ({
                url: `/accounts/${id}`, // API endpoint for deleting an account
                method: 'DELETE',
            }),
            invalidatesTags: ['Account'],
        }),
        updateAccount: builder.mutation({
            query: ({ id, ...account }) => ({
                url: `/accounts/${id}`, // API endpoint for updating an account
                method: 'PUT',
                body: account,
            }),
            invalidatesTags: ['Account'],
        }),
    }),
});

export const {
    useGetAccountsQuery,
    useAddAccountMutation,
    useDeleteAccountMutation,
    useUpdateAccountMutation,
} = accountApi;
