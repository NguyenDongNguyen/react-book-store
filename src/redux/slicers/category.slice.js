import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

const initialState = {
    categoryList: {
        data: [],
        meta: {},
        loading: false,
        error: null,
    },
};

export const categorySlice = createSlice({
    name: "category",
    initialState: initialState,
    reducers: {
        // getProductList
        getCategoryListRequest: (state) => {
            state.categoryList.loading = true;
            state.categoryList.error = null;
        },
        getCategoryListSuccess: (state, action) => {
            const { data } = action.payload;
            state.categoryList.data = data;
            state.categoryList.loading = false;
        },
        getCategoryListFail: (state, action) => {
            const { error } = action.payload;
            state.categoryList.error = error;
            state.categoryList.loading = false;
        },
    },
});

export const {
    getCategoryListRequest,
    getCategoryListSuccess,
    getCategoryListFail,
} = categorySlice.actions;

export default categorySlice.reducer;
