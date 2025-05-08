import { createSlice } from '@reduxjs/toolkit';

const uiSlice = createSlice({
    name: 'ui',
    initialState: { authButtonsShown: false },
    reducers: {
        showAuthButtons(state) {
            state.authButtonsShown = true;
        },
        hideAuthButtons(state) {
            state.authButtonsShown = false;
        },
    },
});

export const uiActions = uiSlice.actions;

export default uiSlice;
