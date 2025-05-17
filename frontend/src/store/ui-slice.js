import { createSlice } from '@reduxjs/toolkit';

const uiSlice = createSlice({
    name: 'ui',
    initialState: {
        authButtonsShown: false,
        leaguesModalShown: false,
        confirmModalShown: false,
        alert: { isShown: false, message: '', type: '' },
    },
    reducers: {
        showAuthButtons(state) {
            state.authButtonsShown = true;
        },
        hideAuthButtons(state) {
            state.authButtonsShown = false;
        },
        showLeaguesModal(state) {
            state.leaguesModalShown = true;
        },
        hideLeaguesModal(state) {
            state.leaguesModalShown = false;
        },
        showConfirmModal(state) {
            state.confirmModalShown = true;
        },
        hideConfirmModal(state) {
            state.confirmModalShown = false;
        },
        showAlert(state, action) {
            state.alert.isShown = true;
            state.alert.message = action.payload.message;
            state.alert.type = action.payload.type;
        },
        hideAlert(state) {
            state.alert.isShown = false;
            state.alert.message = '';
            state.alert.type = '';
        },
    },
});

export const uiActions = uiSlice.actions;

export default uiSlice;
