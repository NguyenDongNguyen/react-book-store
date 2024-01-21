import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";
import { PRODUCT_LIMIT } from "../../constants/paging";

const initialState = {
    productList: {
        data: [],
        meta: {
            page: 1,
            limit: PRODUCT_LIMIT,
        },
        loading: false,
        error: null,
    },
    productDetail: {
        data: {},
        loading: false,
        error: null,
    },
};

export const productSlice = createSlice({
    name: "product",
    initialState: initialState,
    reducers: {
        // getProductList
        getProductListRequest: (state) => {
            state.productList.loading = true;
            state.productList.error = null;
        },
        getProductListSuccess: (state, action) => {
            const { data, meta, isShowMore } = action.payload;
            state.productList.data = isShowMore
                ? [...state.productList.data, ...data]
                : data;
            state.productList.meta = meta;
            state.productList.loading = false;
        },
        getProductListFail: (state, action) => {
            const { error } = action.payload;
            state.productList.error = error;
            state.productList.loading = false;
        },

        // getProductDetail
        getProductDetailRequest: (state) => {
            state.productDetail.loading = true;
            state.productDetail.error = null;
        },
        getProductDetailSuccess: (state, action) => {
            const { data } = action.payload;
            state.productDetail.data = data;
            state.productDetail.loading = false;
        },
        getProductDetailFail: (state, action) => {
            const { error } = action.payload;
            state.productDetail.error = error;
            state.productDetail.loading = false;
        },
        updateProduct: () => {
            // do something
        },
        deleteProduct: () => {
            // do something
        },
    },
});

export const {
    getProductListRequest,
    getProductListSuccess,
    getProductListFail,
    getProductDetailRequest,
    getProductDetailSuccess,
    getProductDetailFail,
} = productSlice.actions;

export default productSlice.reducer;
