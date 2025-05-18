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

export let alertTimeout = null;

// an action creator to show the alert message and remove it after some time
export const showAlert = (type, message) => {
    return (dispatch) => {
        dispatch(alertActions.showAlert({ type, message }));

        // remove the alert after 5 seconds
        alertTimeout = setTimeout(() => {
            dispatch(alertActions.hideAlert());
            console.log('alert removed');
        }, 5 * 1000);
    };
};

export default alertSlice;
