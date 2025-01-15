import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IAccountState } from './accountType';
import { accountInitialState } from './accountInitialState';

const accountSlice = createSlice({
    name: 'account',
    initialState: accountInitialState,
    reducers: {
        setAccount(state, action: PayloadAction<IAccountState>) {
            state.account = action.payload;
        },
        resetAccount(state) {
            state.account = accountInitialState.account;
        },
    },
});

export const { setAccount, resetAccount } = accountSlice.actions;

export default accountSlice.reducer;
