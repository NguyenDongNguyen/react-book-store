import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";
import { PRODUCT_LIMIT } from "../../constants/paging";
import { favoriteProductSuccess, unFavoriteProductSuccess } from "./favorite.slice";

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
    productSuggest: {
        data: [],
        meta: {},
        loading: false,
        error: null,
    },
    createProductData: {
        loading: false,
        error: null,
    },
    updateProductData: {
        loading: false,
        error: null,
    },
    deleteProductData: {
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

        // getProductSuggest
        getProductSuggestRequest: (state) => {
            state.productSuggest.loading = true;
            state.productSuggest.error = null;
        },
        getProductSuggestSuccess: (state, action) => {
            const { data } = action.payload;
            state.productSuggest.data = data;
            state.productSuggest.loading = false;
        },
        getProductSuggestFail: (state, action) => {
            const { error } = action.payload;
            state.productSuggest.error = error;
            state.productSuggest.loading = false;
        },

        // createProductRequest
        createProductRequest: (state, action) => {
            state.createProductData.loading = true;
            state.createProductData.error = null;
        },
        createProductSuccess: (state, action) => {
            state.createProductData.loading = false;
        },
        createProductFailure: (state, action) => {
            const { error } = action.payload;
            state.createProductData.loading = false;
            state.createProductData.error = error;
        },

        // updateProductRequest
        updateProductRequest: (state, action) => {
            state.updateProductData.loading = true;
            state.updateProductData.error = null;
        },
        updateProductSuccess: (state, action) => {
            state.updateProductData.loading = false;
        },
        updateProductFailure: (state, action) => {
            const { error } = action.payload;
            state.updateProductData.loading = false;
            state.updateProductData.error = error;
        },
        // deleteProductRequest
        deleteProductRequest: (state, action) => {
            state.deleteProductData.loading = true;
            state.deleteProductData.error = null;
        },
        deleteProductSuccess: (state, action) => {
            state.deleteProductData.loading = false;
        },
        deleteProductFailure: (state, action) => {
            const { error } = action.payload;
            state.deleteProductData.loading = false;
            state.deleteProductData.error = error;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(favoriteProductSuccess, (state, action) => {
                const { data } = action.payload;
                state.productDetail.data.favorites.push(data);
            })
            .addCase(unFavoriteProductSuccess, (state, action) => {
                const { id } = action.payload;
                if (state.productDetail.data.favorites?.length) {
                    state.productDetail.data.favorites =
                        state.productDetail.data.favorites.filter(
                            (item) => item.id !== id
                        );
                }
            });
    },
});

export const {
    getProductListRequest,
    getProductListSuccess,
    getProductListFail,
    getProductDetailRequest,
    getProductDetailSuccess,
    getProductDetailFail,
    getProductSuggestRequest,
    getProductSuggestSuccess,
    getProductSuggestFail,
    createProductRequest,
    createProductSuccess,
    createProductFailure,
    updateProductRequest,
    updateProductSuccess,
    updateProductFailure,
    deleteProductRequest,
    deleteProductSuccess,
    deleteProductFailure,
} = productSlice.actions;

export default productSlice.reducer;
