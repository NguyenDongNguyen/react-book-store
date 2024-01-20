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
        updateProduct: () => {
            // do something
        },
        deleteProduct: () => {
            // do something
        },
    },
});

export const { getProductListRequest, getProductListSuccess, getProductListFail } =
    productSlice.actions;

export default productSlice.reducer;
