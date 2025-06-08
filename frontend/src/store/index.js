import { configureStore } from '@reduxjs/toolkit';
import authSlice from './auth-slice.js';
import uiSlice from './ui/ui-slice.js';
import alertSlice from './ui/alert-slice.js';
import sidebarSlice from './ui/sidebar-slice.js';

const store = configureStore({
    reducer: {
        auth: authSlice.reducer,
        ui: uiSlice.reducer,
        alert: alertSlice.reducer,
        sidebar: sidebarSlice.reducer,
    },
});

export default store;
