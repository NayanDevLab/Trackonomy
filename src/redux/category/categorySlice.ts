import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ICategoryState } from './categoryType';
import { categoryInitialState } from './categoryInitialState';

const categorySlice = createSlice({
    name: 'category',
    initialState: categoryInitialState,
    reducers: {
        setCategory(state, action: PayloadAction<ICategoryState>) {
            state.category = action.payload;
        },
        resetCategory(state) {
            state.category = categoryInitialState.category;
        },
    },
});

export const { setCategory, resetCategory } = categorySlice.actions;

export default categorySlice.reducer;
