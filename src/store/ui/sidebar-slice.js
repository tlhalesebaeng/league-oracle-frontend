import { createSlice } from '@reduxjs/toolkit';

const sidebarSlice = createSlice({
    name: 'sidebar',
    initialState: { isShown: false },
    reducers: {
        showSidebar(state) {
            state.isShown = true;
        },
        hideSidebar(state) {
            state.isShown = false;
        },
    },
});

export const sidebarActions = sidebarSlice.actions;

export default sidebarSlice;
