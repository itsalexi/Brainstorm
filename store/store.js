import { configureStore } from '@reduxjs/toolkit';
import authSlice from './authSlice';
import chatSlice from './chatSlice';
import usersSlice from './usersSlice';

export const store = configureStore({
    reducer: {
        auth: authSlice,
        users: usersSlice,
        chats: chatSlice,
    },
});
