import { takeEvery, put } from "redux-saga/effects";
import axios from "axios";
import {
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
} from "../slicers/cart.slice";

function* getCartListSaga(action) {
    try {
        const { userId } = action.payload;
        const result = yield axios.get("http://localhost:8080/carts", {
            params: {
                userId: userId,
                _expand: "product",
            },
        });
        yield put(getCartListSuccess({ data: result.data }));
    } catch (e) {
        yield put(getCartListFail({ error: "Lỗi..." }));
    }
}

function* addCartListSaga(action) {
    try {
        const { data } = action.payload;
        const result = yield axios.post("http://localhost:8080/carts", data);
        console.log("🚀 ~ function*addCartListSaga ~ result:", result);
        yield put(addCartListSuccess({ data: result.data }));
    } catch (e) {
        yield put(addCartListFail({ error: "Lỗi..." }));
    }
}

function* updateCartListSaga(action) {
    try {
        const { id, data } = action.payload;
        const result = yield axios.patch(`http://localhost:8080/carts/${id}`, data);
        yield put(updateCartListSuccess({ data: result.data }));
    } catch (e) {
        yield put(updateCartListFail({ error: "Lỗi..." }));
    }
}

function* deleteCartListSaga(action) {
    try {
        const { id, userId } = action.payload;
        const result = yield axios.delete(`http://localhost:8080/carts/${id}`);
        console.log("🚀 ~ function*deleteCartListSaga ~ result:", result);
        yield put(getCartListRequest({ userId: userId }));
        yield put(deleteCartListSuccess({ data: result.data }));
    } catch (e) {
        yield put(deleteCartListFail({ error: "Lỗi..." }));
    }
}

export default function* cartSaga() {
    yield takeEvery(getCartListRequest, getCartListSaga);
    yield takeEvery(addCartListRequest, addCartListSaga);
    yield takeEvery(updateCartListRequest, updateCartListSaga);
    yield takeEvery(deleteCartListRequest, deleteCartListSaga);
}
