import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
    name: 'auth',
    initialState: { isAuthenticated: false },
    reducers: {
        authenticate(state) {
            state.isAuthenticated = true;
        },
    },
});

export const authActions = authSlice.actions;

export default authSlice;
