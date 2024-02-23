import { takeEvery, put } from "redux-saga/effects";
import axios from "axios";
import { notification } from "antd";

import {
    getOrderListRequest,
    getOrderListSuccess,
    getOrderListFailure,
    orderProductRequest,
    orderProductSuccess,
    orderProductFailure,
} from "../slicers/order.slice";
import { deleteCartListRequest } from "../slicers/cart.slice";

function* getOrderListSaga(action) {
    try {
        const { userId } = action.payload;
        const result = yield axios.get("http://localhost:8080/orders", {
            params: {
                _embed: "orderDetails",
                userId: userId,
                isDelete: false,
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

export default function* orderSaga() {
    yield takeEvery(getOrderListRequest, getOrderListSaga);
    yield takeEvery(orderProductRequest, orderProductSaga);
}
