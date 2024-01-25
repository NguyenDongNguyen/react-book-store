import { takeEvery, put } from "redux-saga/effects";
import axios from "axios";

import {
    getCartListRequest,
    getCartListSuccess,
    getCartListFail,
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

export default function* cartSaga() {
    yield takeEvery(getCartListRequest, getCartListSaga);
}
