import { takeEvery, put } from "redux-saga/effects";
import axios from "axios";
import { notification } from "antd";

import {
    getAllOrderRequest,
    getAllOrderSuccess,
    getAllOrderFailure,
    getOrderListRequest,
    getOrderListSuccess,
    getOrderListFailure,
    orderProductRequest,
    orderProductSuccess,
    orderProductFailure,
    getOrderDetailRequest,
    getOrderDetailSuccess,
    getOrderDetailFailure,
    updateOrderProductRequest,
    updateOrderProductSuccess,
    updateOrderProductFailure,
    deleteOrderProductRequest,
    deleteOrderProductSuccess,
    deleteOrderProductFailure,
} from "../slicers/order.slice";
import { deleteCartListRequest } from "../slicers/cart.slice";

function* getDashBoardOrder(action) {
    try {
        const result = yield axios.get("http://localhost:8080/orders", {
            params: {
                _expand: "state",
                isDelete: false,
            },
        });
        yield put(getAllOrderSuccess({ data: result.data }));
    } catch (e) {
        yield put(getAllOrderFailure({ error: "Lỗi" }));
    }
}

function* getOrderListSaga(action) {
    try {
        const { userId } = action.payload;
        const result = yield axios.get("http://localhost:8080/orders", {
            params: {
                _embed: "orderDetails",
                userId: userId,
                isDelete: false,
                _expand: "state",
            },
        });
        yield put(getOrderListSuccess({ data: result.data }));
    } catch (e) {
        yield put(getOrderListFailure({ error: "Lỗi" }));
    }
}

function* orderProductSaga(action) {
    try {
        const { orderData, cartList, callback } = action.payload;
        const orderResult = yield axios.post(
            "http://localhost:8080/orders",
            orderData
        );
        for (let i = 0; i < cartList.length; i++) {
            yield axios.post("http://localhost:8080/orderDetails", {
                productId: cartList[i].productId,
                thumbnail: cartList[i].thumbnail,
                mainText: cartList[i].mainText,
                price: cartList[i].price,
                quantity: cartList[i].quantity,
                orderId: orderResult.data.id,
            });
        }
        for (let i = 0; i < cartList.length; i++) {
            yield put(
                deleteCartListRequest({
                    id: cartList[i].id,
                    userId: orderData.userId,
                })
            );
        }
        yield notification.success({ message: "Thanh toán thành công" });
        yield callback();
        yield put(orderProductSuccess({ data: "Data" }));
    } catch (e) {
        yield put(orderProductFailure({ error: "Lỗi" }));
    }
}

function* getOrderDetailSaga(action) {
    try {
        const { productId } = action.payload;
        const result = yield axios.get("http://localhost:8080/orderDetails", {
            params: {
                productId: productId,
                _expand: "order",
            },
        });
        yield put(getOrderDetailSuccess({ data: result.data }));
    } catch (e) {
        yield put(getOrderDetailFailure({ error: "Lỗi" }));
    }
}

function* updateOrderProductSaga(action) {
    try {
        const { id, data } = action.payload;
        const result = yield axios.patch(`http://localhost:8080/orders/${id}`, data);
        yield put(updateOrderProductSuccess({ data: result.data }));
        notification.success({
            message: "Cập nhật trạng thái thành công",
        });
    } catch (e) {
        yield put(updateOrderProductFailure({ error: "Lỗi" }));
    }
}

function* deleteOrderProductSaga(action) {
    try {
        const { id, orderDetailData, userId } = action.payload;
        const orderResult = yield axios.patch(`http://localhost:8080/orders/${id}`, {
            isDelete: true,
        });
        for (let i = 0; i < orderDetailData.length; i++) {
            yield axios.patch(
                `http://localhost:8080/orderDetails/${orderDetailData[i].id}`,
                {
                    isDelete: true,
                }
            );
        }
        yield put(deleteOrderProductSuccess({ data: orderResult.data }));
        yield put(getOrderListRequest({ userId: userId }));
        notification.success({
            message: "Huỷ đơn hàng thành công",
        });
    } catch (e) {
        yield put(deleteOrderProductFailure({ error: "Lỗi" }));
    }
}

export default function* orderSaga() {
    yield takeEvery(getAllOrderRequest, getDashBoardOrder);
    yield takeEvery(getOrderListRequest, getOrderListSaga);
    yield takeEvery(orderProductRequest, orderProductSaga);
    yield takeEvery(getOrderDetailRequest, getOrderDetailSaga);
    yield takeEvery(updateOrderProductRequest, updateOrderProductSaga);
    yield takeEvery(deleteOrderProductRequest, deleteOrderProductSaga);
}
