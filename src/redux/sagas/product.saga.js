import { takeEvery, put, debounce } from "redux-saga/effects";
import axios from "axios";

import {
    getProductListRequest,
    getProductListSuccess,
    getProductListFail,
    getProductDetailRequest,
    getProductDetailSuccess,
    getProductDetailFail,
} from "../slicers/product.slice";

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
        const result = yield axios.get(`http://localhost:8080/products/${id}`);
        yield put(getProductDetailSuccess({ data: result.data }));
    } catch (e) {
        yield put(getProductDetailFail({ error: "Lỗi..." }));
    }
}

export default function* productSaga() {
    yield debounce(300, getProductListRequest, getProductListSaga);
    yield takeEvery(getProductDetailRequest, getProductDetailSaga);
}
