import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

const initialState = {
    cartList: {
        data: [],
        meta: {},
        loading: false,
        error: null,
    },
};

export const cartSlice = createSlice({
    name: "cart",
    initialState: initialState,
    reducers: {
        // getProductList
        getCartListRequest: (state) => {
            state.cartList.loading = true;
            state.cartList.error = null;
        },
        getCartListSuccess: (state, action) => {
            const { data } = action.payload;
            state.cartList.data = data;
            state.cartList.loading = false;
        },
        getCartListFail: (state, action) => {
            const { error } = action.payload;
            state.cartList.error = error;
            state.cartList.loading = false;
        },
    },
});

export const { getCartListRequest, getCartListSuccess, getCartListFail } =
    cartSlice.actions;

export default cartSlice.reducer;
