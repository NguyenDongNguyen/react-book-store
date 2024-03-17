import { takeEvery, put } from "redux-saga/effects";
import axios from "axios";

import {
    registerRequest,
    registerSuccess,
    registerFail,
    loginRequest,
    loginSuccess,
    loginFail,
    getUserListRequest,
    getUserListSuccess,
    getUserListFail,
    getUserInfoRequest,
    getUserInfoSuccess,
    getUserInfoFail,
    createUserRequest,
    createUserSuccess,
    createUserFail,
    updateUserInfoRequest,
    updateUserInfoSuccess,
    updateUserInfoFail,
    deleteUserRequest,
    deleteUserSuccess,
    deleteUserFailure,
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
    } catch (e) {
        console.log(e);
        yield put(loginFail({ error: "Email or password is incorrect" }));
    }
}

function* getUserList(action) {
    try {
        const { page, limit, sort, order, keyword } = action.payload;
        const result = yield axios.get(`http://localhost:8080/users`, {
            params: {
                _page: page,
                _limit: limit,
                _sort: sort,
                _order: order,
                ...(keyword && {
                    q: keyword,
                }),
                isDelete: false,
            },
        });

        yield put(
            getUserListSuccess({
                data: result.data,
                meta: {
                    page: page,
                    limit: limit,
                    total: +result.headers["x-total-count"],
                },
            })
        );
    } catch (e) {
        console.log(e);
        yield put(getUserListFail({ error: "Lỗi..." }));
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

function* createUserSaga(action) {
    try {
        const { data } = action.payload;
        const result = yield axios.post("http://localhost:8080/users", data);
        yield put(createUserSuccess({ data: result.data }));
        notification.success({
            message: "Tạo người dùng thành công",
        });
    } catch (e) {
        console.log(e);
        yield put(createUserFail({ error: e.response.data }));
    }
}

function* updateUserInfo(action) {
    try {
        const { id, data } = action.payload;
        const result = yield axios.patch(`http://localhost:8080/users/${id}`, data);
        yield put(updateUserInfoSuccess({ data: result.data }));
        notification.success({
            message: "Cập nhật thông tin thành công",
        });
    } catch (e) {
        console.log(e);
        yield put(updateUserInfoFail({ error: "Password is incorrect" }));
    }
}

function* deleteUserSaga(action) {
    try {
        const { id } = action.payload;
        const result = yield axios.patch(`http://localhost:8080/users/${id}`, {
            isDelete: true,
        });
        yield put(deleteUserSuccess({ data: result.data }));
        notification.success({
            message: "Xoá người dùng thành công",
        });
    } catch (e) {
        yield put(deleteUserFailure({ error: "Lỗi" }));
    }
}

export default function* authSaga() {
    yield takeEvery(registerRequest, registerSaga);
    yield takeEvery(loginRequest, loginSaga);
    yield takeEvery(getUserListRequest, getUserList);
    yield takeEvery(getUserInfoRequest, getUserInfo);
    yield takeEvery(createUserRequest, createUserSaga);
    yield takeEvery(updateUserInfoRequest, updateUserInfo);
    yield takeEvery(deleteUserRequest, deleteUserSaga);
}
