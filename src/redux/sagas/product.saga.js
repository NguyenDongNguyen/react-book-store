import { takeEvery, put } from "redux-saga/effects";
import axios from "axios";

import {
    getProductListRequest,
    getProductListSuccess,
    getProductListFail,
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
        } = action.payload;
        const result = yield axios.get("http://localhost:8080/books", {
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

export default function* productSaga() {
    yield takeEvery(getProductListRequest, getProductListSaga);
}
