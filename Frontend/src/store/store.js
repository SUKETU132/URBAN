import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import { api } from './cartSlice';
import { cartApi, orderApi, productApi } from './cartSlice';

const store = configureStore({
    reducer: {
        auth: authReducer,
        [api.reducerPath]: api.reducer,
        [cartApi.reducerPath]: cartApi.reducer,
        [orderApi.reducerPath]: orderApi.reducer,
        [productApi.reducerPath]: productApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(api.middleware, cartApi.middleware, orderApi.middleware, productApi.middleware),
});

export default store;