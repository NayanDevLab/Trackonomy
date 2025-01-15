export interface IAccountState {
    name: string;
    icon: string;
    balance: number;
    description: string;
    accountType: string;
}

export interface AccountsResponse {
    data: AccountModelResponse[];
    message: string;
    success: boolean;
}

export interface AccountModelResponse {
    id: number;
    name: string;
    icon: string;
    balance: number;
    description: string;
    account_type: string;
}
