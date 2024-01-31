import { fork } from "redux-saga/effects";

import productSaga from "./product.saga";
import categorySaga from "./category.saga";
import cartSaga from "./cart.saga";
import authSaga from "./auth.saga";

export default function* rootSaga() {
    yield fork(productSaga);
    yield fork(categorySaga);
    yield fork(cartSaga);
    yield fork(authSaga);
}
