import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";

import productReducer from "./redux/slicers/product.slice";
import categoryReducer from "./redux/slicers/category.slice";
import cartReducer from "./redux/slicers/cart.slice";
import authReducer from "./redux/slicers/auth.slice";
import locationReducer from "./redux/slicers/location.slice";
import orderReducer from "./redux/slicers/order.slice";
import favoriteReducer from "./redux/slicers/favorite.slice";
import reviewReducer from "./redux/slicers/review.slice";
import statusReducer from "./redux/slicers/status.slice";

import rootSaga from "./redux/sagas";

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
    reducer: {
        product: productReducer,
        category: categoryReducer,
        cart: cartReducer,
        auth: authReducer,
        location: locationReducer,
        order: orderReducer,
        favorite: favoriteReducer,
        review: reviewReducer,
        status: statusReducer,
    },
    middleware: (getDefaultMiddleware) => [
        ...getDefaultMiddleware({
            thunk: false,
            serializableCheck: false,
        }),
        sagaMiddleware,
    ],
});

sagaMiddleware.run(rootSaga);

export default store;
