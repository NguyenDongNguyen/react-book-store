import { takeEvery, put } from "redux-saga/effects";
import axios from "axios";

import {
    registerRequest,
    registerSuccess,
    registerFail,
    loginRequest,
    loginSuccess,
    loginFail,
    getUserInfoRequest,
    getUserInfoSuccess,
    getUserInfoFail,
} from "../slicers/auth.slice";
import { notification } from "antd";

function* registerSaga(action) {
    try {
        const { data, callback } = action.payload;
        const result = yield axios.post("http://localhost:8080/register", data);
        yield put(registerSuccess({ data: result.data }));
        yield callback();
        notification.success({
            message: "Đăng ký thành công",
        });
    } catch (e) {
        console.log(e);
        yield put(registerFail({ error: e.response.data }));
    }
}

function* loginSaga(action) {
    try {
        const { data, callback } = action.payload;
        const result = yield axios.post("http://localhost:8080/login", data);
        yield localStorage.setItem("accessToken", result.data.accessToken);
        yield put(loginSuccess({ data: result.data.user }));
        yield callback(result.data.user.role);
        notification.success({
            message: "Đăng nhập thành công",
        });
    } catch (e) {
        console.log(e);
        yield put(loginFail({ error: "Email or password is incorrect" }));
    }
}

function* getUserInfo(action) {
    try {
        const { id } = action.payload;
        const result = yield axios.get(`http://localhost:8080/users/${id}`);
        yield put(getUserInfoSuccess({ data: result.data }));
    } catch (e) {
        console.log(e);
        yield put(getUserInfoFail({ error: "Lỗi..." }));
    }
}

export default function* authSaga() {
    yield takeEvery(registerRequest, registerSaga);
    yield takeEvery(loginRequest, loginSaga);
    yield takeEvery(getUserInfoRequest, getUserInfo);
}
