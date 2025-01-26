import { apiSlice } from '../apiSlice';
import { AccountsResponse } from './accountType';

export const accountApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getAccounts: builder.query<AccountsResponse, void>({
            query: () => ({
                url: '/accounts',
                meta: { skipSuccessToast: true },
            }),
            providesTags: ['Account'],
        }),
        addAccount: builder.mutation({
            query: (account) => ({
                url: '/accounts',
                method: 'POST',
                body: account,
            }),
            invalidatesTags: ['Account'],
        }),
        deleteAccount: builder.mutation({
            query: (id) => ({
                url: `/accounts/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Account'],
        }),
        updateAccount: builder.mutation({
            query: ({ id, ...account }) => ({
                url: `/accounts/${id}`,
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
