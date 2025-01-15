import { AccountModelResponse } from '../account/accountType';
import { CategoryModelResponse } from '../category/categoryType';

export interface IExpenseState {
    title: string;
    category: CategoryModelResponse;
    amount: number;
    date: string;
    description: string;
    account: AccountModelResponse;
}

export interface ExpenseModelResponse {
    id: number;
    title: string;
    description?: string;
    amount: number;
    date: string;
    category: CategoryModelResponse;
    icon: string;
    file_url: string;
    created_at: string;
    updated_at: string;
}

export interface ExpenseResponse {
    data: {
        current_page: number;
        expenses: ExpenseModelResponse[];
        limit: number;
        total: number;
    };
    message: string;
    success: boolean;
}
