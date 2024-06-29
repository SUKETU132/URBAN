import { createSlice } from "@reduxjs/toolkit";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import productService from "../MongoDB/config";

const customBaseQuery = async (args, api, extraOptions) => {
    try {
        const result = await productService.getAllProduct();
        if (result) {
            return { data: result };
        } else {
            throw new Error('No data found');
        }
    } catch (error) {
        return { error: { status: 'CUSTOM_ERROR', error: error.message } };
    }
};

const getUserCartProducts = async (args, api, extraOptions) => {
    try {
        const result = await productService.getUserCartProduct();
        if (result) {
            return { data: result };
        } else {
            throw new Error('No data found');
        }
    } catch (error) {
        return { error: { status: 'CUSTOM_ERROR', error: error.message } };
    }
}

const getUserOrderProducts = async (args, api, extraOptions) => {
    try {
        const result = await productService.getOrderData();
        if (result) {
            return { data: result };
        } else {
            throw new Error('No data found');
        }
    } catch (error) {
        return { error: { status: 'CUSTOM_ERROR', error: error.message } };
    }
}

const getAllProductWithOwnerRTK = async (args, api, extraOptions) => {
    try {
        const result = await productService.getAllProductWithOwner();
        if (result) {
            return { data: result };
        } else {
            throw new Error('No data found');
        }
    } catch (error) {
        return { error: { status: 'CUSTOM_ERROR', error: error.message } };
    }
}

export const api = createApi({
    reducerPath: 'api',
    baseQuery: customBaseQuery,
    endpoints: (builder) => ({
        getData: builder.query({
            query: () => ({})
        }),
    }),
});

export const cartApi = createApi({
    reducerPath: 'cartApi',
    baseQuery: getUserCartProducts,
    endpoints: (builder) => ({
        getCartItem: builder.query({
            query: () => ({})
        }),
    }),
});

export const orderApi = createApi({
    reducerPath: 'orderApi',
    baseQuery: getUserOrderProducts,
    endpoints: (builder) => ({
        getOrderItem: builder.query({
            query: () => ({})
        }),
    }),
});

export const productApi = createApi({
    reducerPath: 'productApi',
    baseQuery: getAllProductWithOwnerRTK,
    endpoints: (builder) => ({
        getProductItem: builder.query({
            query: () => ({})
        }),
    }),
});


export const { useGetDataQuery } = api;
export const { useGetCartItemQuery } = cartApi;
export const { useGetOrderItemQuery } = orderApi;
export const { useGetProductItemQuery } = productApi;

