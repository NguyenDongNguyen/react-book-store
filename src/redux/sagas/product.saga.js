import { takeEvery, put, debounce } from "redux-saga/effects";
import axios from "axios";

import {
    getProductListRequest,
    getProductListSuccess,
    getProductListFail,
    getProductDetailRequest,
    getProductDetailSuccess,
    getProductDetailFail,
    getProductSuggestRequest,
    getProductSuggestSuccess,
    getProductSuggestFail,
    createProductRequest,
    createProductSuccess,
    createProductFailure,
    updateProductRequest,
    updateProductSuccess,
    updateProductFailure,
    deleteProductRequest,
    deleteProductSuccess,
    deleteProductFailure,
} from "../slicers/product.slice";
import { notification } from "antd";

function* getProductListSaga(action) {
    try {
        const {
            page,
            limit,
            isShowMore = false,
            categoryId,
            sort,
            order,
            from,
            to,
            keyword,
        } = action.payload;
        console.log("okeee");
        const result = yield axios.get("http://localhost:8080/products", {
            params: {
                _page: page,
                _limit: limit,
                categoryId: categoryId,
                _sort: sort,
                _order: order,
                ...(from &&
                    to && {
                        price_gte: from,
                        price_lte: to,
                    }),
                ...(keyword && {
                    q: keyword,
                }),
                _expand: "category",
                isDelete: false,
            },
        });
        yield put(
            getProductListSuccess({
                data: result.data,
                meta: {
                    page: page,
                    limit: limit,
                    total: +result.headers["x-total-count"],
                },
                isShowMore,
            })
        );
    } catch (e) {
        yield put(getProductListFail({ error: "Lỗi..." }));
    }
}

function* getProductDetailSaga(action) {
    try {
        const { id } = action.payload;
        const result = yield axios.get(`http://localhost:8080/products/${id}`, {
            params: {
                _expand: "category",
                _embed: "favorites",
            },
        });
        yield put(getProductDetailSuccess({ data: result.data }));
    } catch (e) {
        yield put(getProductDetailFail({ error: "Lỗi..." }));
    }
}

function* getProductSuggestSaga(action) {
    try {
        const { keyword } = action.payload;
        const result = yield axios.get("http://localhost:8080/products", {
            params: {
                ...(keyword && {
                    q: keyword,
                }),
            },
        });
        yield put(
            getProductSuggestSuccess({
                data: result.data,
            })
        );
    } catch (e) {
        yield put(getProductSuggestFail({ error: "Lỗi..." }));
    }
}

function* createProductSaga(action) {
    try {
        const { data } = action.payload;
        const result = yield axios.post("http://localhost:8080/products", data);
        yield put(createProductSuccess({ data: result.data }));
        notification.success({
            message: "Thêm sản phẩm thành công",
        });
    } catch (e) {
        yield put(createProductFailure({ error: "Lỗi" }));
    }
}

function* updateProductSaga(action) {
    try {
        const { id, data } = action.payload;
        const result = yield axios.patch(
            `http://localhost:8080/products/${id}`,
            data
        );
        yield put(updateProductSuccess({ data: result.data }));
        notification.success({
            message: "Cập nhậT sản phẩm thành công",
        });
    } catch (e) {
        yield put(updateProductFailure({ error: "Lỗi..." }));
    }
}

function* deleteProductSaga(action) {
    try {
        const { id } = action.payload;
        const result = yield axios.patch(`http://localhost:8080/products/${id}`, {
            isDelete: true,
        });
        yield put(deleteProductSuccess({ data: result.data }));
        notification.success({
            message: "Xoá sản phẩm thành công",
        });
    } catch (e) {
        yield put(deleteProductFailure({ error: "Lỗi" }));
    }
}

export default function* productSaga() {
    yield debounce(300, getProductListRequest, getProductListSaga);
    yield takeEvery(getProductDetailRequest, getProductDetailSaga);
    yield debounce(300, getProductSuggestRequest, getProductSuggestSaga);
    yield takeEvery(createProductRequest, createProductSaga);
    yield takeEvery(updateProductRequest, updateProductSaga);
    yield takeEvery(deleteProductRequest, deleteProductSaga);
}
