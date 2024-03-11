import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    allOrder: {
        data: [],
        loading: false,
        error: null,
    },
    orderList: {
        data: [],
        loading: false,
        error: null,
    },
    orderProductData: {
        loading: false,
        error: null,
    },
    orderDetail: {
        data: [],
        loading: false,
        error: null,
    },
    updateOrder: {
        loading: false,
        error: null,
    },
    deleteOrder: {
        loading: false,
        error: null,
    },
};

export const orderSlice = createSlice({
    name: "order",
    initialState,
    reducers: {
        // getAllOrder
        getAllOrderRequest: (state, action) => {
            state.allOrder.loading = true;
            state.allOrder.error = null;
        },
        getAllOrderSuccess: (state, action) => {
            const { data } = action.payload;
            state.allOrder.data = data;
            state.allOrder.loading = false;
        },
        getAllOrderFailure: (state, action) => {
            const { error } = action.payload;
            state.allOrder.loading = false;
            state.allOrder.error = error;
        },

        // getOrderList
        getOrderListRequest: (state, action) => {
            state.orderList.loading = true;
            state.orderList.error = null;
        },
        getOrderListSuccess: (state, action) => {
            const { data } = action.payload;
            state.orderList.data = data;
            state.orderList.loading = false;
        },
        getOrderListFailure: (state, action) => {
            const { error } = action.payload;
            state.orderList.loading = false;
            state.orderList.error = error;
        },
        // orderProduct
        orderProductRequest: (state, action) => {
            state.orderProductData.loading = true;
            state.orderProductData.error = null;
        },
        orderProductSuccess: (state, action) => {
            state.orderProductData.loading = false;
        },
        orderProductFailure: (state, action) => {
            const { error } = action.payload;
            state.orderProductData.loading = false;
            state.orderProductData.error = error;
        },

        // getOrderDetail
        getOrderDetailRequest: (state, action) => {
            state.orderDetail.loading = true;
            state.orderDetail.error = null;
        },
        getOrderDetailSuccess: (state, action) => {
            const { data } = action.payload;
            state.orderDetail.data = data;
            state.orderDetail.loading = false;
        },
        getOrderDetailFailure: (state, action) => {
            const { error } = action.payload;
            state.orderDetail.loading = false;
            state.orderDetail.error = error;
        },

        // updateOrder
        updateOrderProductRequest: (state, action) => {
            state.updateOrder.loading = true;
            state.updateOrder.error = null;
        },
        updateOrderProductSuccess: (state, action) => {
            state.updateOrder.loading = false;
        },
        updateOrderProductFailure: (state, action) => {
            const { error } = action.payload;
            state.updateOrder.loading = false;
            state.updateOrder.error = error;
        },

        // deleteOrder
        deleteOrderProductRequest: (state, action) => {
            state.deleteOrder.loading = true;
            state.deleteOrder.error = null;
        },
        deleteOrderProductSuccess: (state, action) => {
            state.deleteOrder.loading = false;
        },
        deleteOrderProductFailure: (state, action) => {
            const { error } = action.payload;
            state.deleteOrder.loading = false;
            state.deleteOrder.error = error;
        },
    },
});

export const {
    getOrderListRequest,
    getOrderListSuccess,
    getOrderListFailure,
    orderProductRequest,
    orderProductSuccess,
    orderProductFailure,
    getAllOrderRequest,
    getAllOrderSuccess,
    getAllOrderFailure,
    getOrderDetailRequest,
    getOrderDetailSuccess,
    getOrderDetailFailure,
    updateOrderProductRequest,
    updateOrderProductSuccess,
    updateOrderProductFailure,
    deleteOrderProductRequest,
    deleteOrderProductSuccess,
    deleteOrderProductFailure,
} = orderSlice.actions;

export default orderSlice.reducer;
