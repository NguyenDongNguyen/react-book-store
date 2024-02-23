import { createSlice } from "@reduxjs/toolkit";
import { message } from "antd";
import { v4 as uuidv4 } from "uuid";

const initialState = {
    cartList: {
        data: [],
        meta: {},
        loading: false,
        error: null,
    },
    addCartList: {
        loading: false,
        error: null,
    },
    updateCartList: {
        loading: false,
        error: null,
    },
    deleteCartList: {
        loading: false,
        error: null,
    },
};

export const cartSlice = createSlice({
    name: "cart",
    initialState: initialState,
    reducers: {
        // getCartList
        getCartListRequest: (state) => {
            state.cartList.loading = true;
            state.cartList.error = null;
        },
        getCartListSuccess: (state, action) => {
            const { data } = action.payload;
            const tempData = data.map((item) => {
                const obj = {};
                obj.id = item.id;
                obj.productId = item.productId;
                obj.thumbnail = item.product.thumbnail;
                obj.mainText = item.product.mainText;
                obj.price = item.product.price;
                obj.quantity = item.quantity;
                return obj;
            });
            state.cartList.data = tempData;
            state.cartList.loading = false;
        },
        getCartListFail: (state, action) => {
            const { error } = action.payload;
            state.cartList.error = error;
            state.cartList.loading = false;
        },

        // addCartList
        addCartListRequest: (state) => {
            state.addCartList.loading = true;
            state.addCartList.error = null;
        },
        addCartListSuccess: (state, action) => {
            const { data } = action.payload;
            let carts = state.cartList.data;

            // let isExistIndex = carts.findIndex(
            //     (c) => c.productId === data.productId
            // );
            // console.log("🚀 ~ isExistIndex:", isExistIndex);
            // if (isExistIndex > -1) {
            //     carts[isExistIndex].quantity += data.quantity;
            //     if (carts[isExistIndex].quantity > carts.product.quantity) {
            //         carts[isExistIndex].quantity = carts.product.quantity;
            //     }
            // } else {
            //     carts.push({
            //         id: data.id,
            //         userId: data.userId,
            //         productId: data.productId,
            //         quantity: data.quantity,
            //     });
            // }

            carts.push({
                id: data.id,
                userId: data.userId,
                productId: data.productId,
                quantity: data.quantity,
            });

            // update redux
            state.cartList.data = carts;
            message.success("Sản phẩm đã được thêm vào Giỏ hàng");

            state.addCartList.loading = false;
        },
        addCartListFail: (state, action) => {
            const { error } = action.payload;
            state.addCartList.error = error;
            state.addCartList.loading = false;
        },

        // getCartList
        updateCartListRequest: (state) => {
            state.updateCartList.loading = true;
            state.updateCartList.error = null;
        },
        updateCartListSuccess: (state, action) => {
            const { data } = action.payload;
            state.cartList.data = [...state.cartList.data, data];
            state.updateCartList.loading = false;
        },
        updateCartListFail: (state, action) => {
            const { error } = action.payload;
            state.updateCartList.error = error;
            state.updateCartList.loading = false;
        },

        // deleteCartList
        deleteCartListRequest: (state) => {
            state.deleteCartList.loading = true;
            state.deleteCartList.error = null;
        },
        deleteCartListSuccess: (state, action) => {
            state.deleteCartList.loading = false;
        },
        deleteCartListFail: (state, action) => {
            const { error } = action.payload;
            state.deleteCartList.error = error;
            state.deleteCartList.loading = false;
        },
    },
});

export const {
    getCartListRequest,
    getCartListSuccess,
    getCartListFail,
    addCartListRequest,
    addCartListSuccess,
    addCartListFail,
    updateCartListRequest,
    updateCartListSuccess,
    updateCartListFail,
    deleteCartListRequest,
    deleteCartListSuccess,
    deleteCartListFail,
} = cartSlice.actions;

export default cartSlice.reducer;
