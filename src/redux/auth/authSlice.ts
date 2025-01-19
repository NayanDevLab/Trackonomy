import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { LoginPayload, RegistrationPayload, UserProfile } from './authType';
import { authInitialState } from './authInitialState';
import AsyncStorage from '@react-native-async-storage/async-storage';

const initialState = {
    login: {
        email: '',
        password: '',
    },
    registration: {
        username: '',
        password: '',
        email: '',
    },
    loginError: {
        email: { isError: false, message: '' },
        password: { isError: false, message: '' },
    },
    registrationError: {
        username: { isError: false, message: '' },
        password: { isError: false, message: '' },
        email: { isError: false, message: '' },
    },
    token: '',
    isAuthenticated: false,
    userProfile: {
        id: 0,
        username: '',
        email: '',
    },
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setLogin(state, action: PayloadAction<LoginPayload>) {
            state.login = action.payload;
            state.loginError = initialState.loginError; // Clear login errors
        },
        setLoginError(
            state,
            action: PayloadAction<Partial<(typeof initialState)['loginError']>>,
        ) {
            state.loginError = { ...state.loginError, ...action.payload };
        },
        setRegistration(state, action: PayloadAction<RegistrationPayload>) {
            state.registration = action.payload;
            state.registrationError = initialState.registrationError;
        },
        setRegistrationError(
            state,
            action: PayloadAction<
                Partial<(typeof initialState)['registrationError']>
            >,
        ) {
            state.registrationError = {
                ...state.registrationError,
                ...action.payload,
            };
        },
        // Reset all states
        resetAuthState(state) {
            return initialState;
        },
        setToken: (state, action: PayloadAction<string>) => {
            state.token = action.payload;
            state.isAuthenticated = true;
        },
        logout: (state) => {
            state.token = '';
            state.isAuthenticated = false;
            AsyncStorage.removeItem('authToken');
        },
        setUserProfile(state, action: PayloadAction<UserProfile>) {
            state.userProfile = action.payload;
        },
    },
});

export const {
    setLogin,
    setLoginError,
    setRegistration,
    setRegistrationError,
    resetAuthState,
    setToken,
    logout,
    setUserProfile,
} = authSlice.actions;

export default authSlice.reducer;
