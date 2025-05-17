import { createSlice } from '@reduxjs/toolkit';

const alertSlice = createSlice({
    name: 'alert',
    initialState: { isShown: false, message: '', type: '' },
    reducers: {
        showAlert(state, action) {
            state.isShown = true;
            state.message = action.payload.message;
            state.type = action.payload.type;
        },
        hideAlert(state) {
            state.isShown = false;
            state.message = '';
            state.type = '';
        },
    },
});

export const alertActions = alertSlice.actions;

export default alertSlice;
