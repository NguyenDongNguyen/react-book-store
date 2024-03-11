import { fork } from "redux-saga/effects";

import productSaga from "./product.saga";
import categorySaga from "./category.saga";
import cartSaga from "./cart.saga";
import authSaga from "./auth.saga";
import locationSaga from "./location.saga";
import orderSaga from "./order.saga";
import favoriteSaga from "./favorite.saga";
import reviewSaga from "./review.saga";
import statusSaga from "./status.saga";

export default function* rootSaga() {
    yield fork(productSaga);
    yield fork(categorySaga);
    yield fork(cartSaga);
    yield fork(authSaga);
    yield fork(locationSaga);
    yield fork(orderSaga);
    yield fork(favoriteSaga);
    yield fork(reviewSaga);
    yield fork(statusSaga);
}
