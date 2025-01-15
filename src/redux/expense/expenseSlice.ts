import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IExpenseState } from './expenseTypes';
import { expenseInitialState } from './expenseInitialState';

const expenseSlice = createSlice({
    name: 'expense',
    initialState: expenseInitialState,
    reducers: {
        setExpense(state, action: PayloadAction<IExpenseState>) {
            state.expense = action.payload;
        },
        resetExpense(state) {
            state.expense = { ...expenseInitialState.expense };
        },
    },
});

export const { setExpense, resetExpense } = expenseSlice.actions;
export default expenseSlice.reducer;
