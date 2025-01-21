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
        setExpenseDetails: (state, action: PayloadAction<IExpenseState>) => {
            state.expenseDetails = action.payload;
        },
        updateExpenseDetails: (state, action: PayloadAction<IExpenseState>) => {
            if (state.expenseDetails) {
                state.expenseDetails = {
                    ...state.expenseDetails,
                    ...action.payload,
                };
            }
        },
    },
});

export const {
    setExpense,
    resetExpense,
    setExpenseDetails,
    updateExpenseDetails,
} = expenseSlice.actions;
export default expenseSlice.reducer;
