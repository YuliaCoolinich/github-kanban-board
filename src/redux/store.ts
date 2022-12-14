import { configureStore, Middleware  } from "@reduxjs/toolkit";
import rootReducer from "./rootReducer";

import createSagaMiddleware from 'redux-saga';
import rootSaga from './rootSaga';

const sagaMiddleWare = createSagaMiddleware();
const middlewares: Middleware[] = [sagaMiddleWare];

const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        immutableCheck: false,
        serializableCheck: false,
   }).concat(middlewares)
});

sagaMiddleWare.run(rootSaga);

export default store;