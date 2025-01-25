// src/constants/routes.ts

// 1) Define an interface for route options
interface RouteOptions {
    title?: string; // optional
    headerShown?: boolean; // optional
    // You can add other properties as needed
}

interface RouteObject {
    name: string;
    options: RouteOptions;
}

// 2) Use those interfaces in your ROUTES
export const ROUTES = {
    AUTH: [
        {
            name: 'auth/login',
            options: { title: 'Login' },
        },
        {
            name: 'auth/registration',
            options: { title: 'Registration' },
        },
        {
            name: 'auth/otpVerification',
            options: { title: 'OTP Verification' },
        },
    ] as RouteObject[], // Cast as an array of RouteObject

    MAIN: [
        {
            name: 'onBoardingScreen',
            options: { title: 'Onboarding' },
        },
        {
            name: 'transactions',
            options: { title: 'Transactions', headerShown: true },
        },
        {
            name: 'nointernetscreen',
            options: { title: 'No Internet Connection' },
        },
        {
            name: 'home',
            options: { title: 'Home', headerShown: false },
        },
        {
            name: 'editTransaction/[id]',
            options: { title: 'Edit Transaction', headerShown: true },
        },
        {
            name: 'transactionsDetails/[id]',
            options: { title: 'Transactions Details', headerShown: true },
        },
        {
            name: 'transactions/add-expense',
            options: { title: 'Transactions Details', headerShown: true },
        },
        {
            name: 'settings/category-list',
            options: { title: 'Categories', headerShown: true },
        },
        {
            name: 'settings/accounts-list',
            options: { title: 'Accounts', headerShown: true },
        },
        {
            name: 'settings/edit-profile',
            options: { title: 'Edit Profile', headerShown: true },
        },
        {
            name: 'settings/privacy-policy',
            options: { title: 'Privacy Policy', headerShown: true },
        },
        {
            name: 'settings/term-condition',
            options: { title: 'Term & Condition', headerShown: true },
        },
    ] as RouteObject[],
};
