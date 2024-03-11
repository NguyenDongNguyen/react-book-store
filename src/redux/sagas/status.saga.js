import { put, takeEvery } from "redux-saga/effects";
import axios from "axios";

import {
    getStatusListRequest,
    getStatusListSuccess,
    getStatusListFailure,
} from "../slicers/status.slice";

function* getStatusListSaga(action) {
    try {
        const result = yield axios.get("http://localhost:8080/states");
        yield put(getStatusListSuccess({ data: result.data }));
    } catch (e) {
        yield put(getStatusListFailure({ error: "Lỗi" }));
    }
}

export default function* reviewSaga() {
    yield takeEvery(getStatusListRequest, getStatusListSaga);
}
