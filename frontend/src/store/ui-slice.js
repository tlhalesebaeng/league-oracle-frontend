import { createSlice } from '@reduxjs/toolkit';

const uiSlice = createSlice({
    name: 'ui',
    initialState: {
        authButtonsShown: false,
        leaguesModalShown: false,
        confirmModalShown: false,
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
    },
});

export const uiActions = uiSlice.actions;

export default uiSlice;
