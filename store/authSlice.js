import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        token: null,
        userData: null,
        attemptedAutoLogin: false,
    },
    reducers: {
        authenticate: (state, action) => {
            const { payload } = action;
            state.token = payload.token;
            state.userData = payload.userData;
            state.attemptedAutoLogin = true;
        },
        setAttemptedAutoLogin: (state, action) => {
            state.attemptedAutoLogin = true;
        },
        logout: (state, action) => {
            state.token = null;
            state.userData = null;
            state.attemptedAutoLogin = false;
        },
    },
});

export const authenticate = authSlice.actions.authenticate;
export const setAttemptedAutoLogin = authSlice.actions.setAttemptedAutoLogin;
export const logout = authSlice.actions.logout;
export default authSlice.reducer;
