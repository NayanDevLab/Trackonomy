import { combineReducers } from '@reduxjs/toolkit';
import expenseReducer from './expense/expenseSlice';
import authReducer from './auth/authSlice';
import accountReducer from './account/accountSlice';
import categoryReducer from './category/categorySlice';
import { apiSlice } from './apiSlice';

export const rootReducer = combineReducers({
    expense: expenseReducer,
    auth: authReducer,
    account: accountReducer,
    category: categoryReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
});
