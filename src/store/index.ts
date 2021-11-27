import { applyMiddleware, compose, createStore, StoreEnhancer } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import createSagaMiddleware from "redux-saga";
import { createBrowserHistory } from "history";
import { routerMiddleware } from "connected-react-router";

import { createRootReducer } from "./reducers";
import { PassengersSaga } from "./sagas";
import { DevService } from "src/services";

export * from "./actions";
export * from "./reducers";
export * from "./sagas";
export * from "./types";
export * from "./models";

export const history = createBrowserHistory();

export const ConfigStore = () => {

    const sagaMiddleware = createSagaMiddleware();

    const doCompose: <StoreExt>(...funcs: Array<StoreEnhancer<StoreExt>>) =>
        StoreEnhancer<StoreExt> = DevService.isDev() ? composeWithDevTools : compose;

    const enhancers = doCompose(applyMiddleware(sagaMiddleware), applyMiddleware(routerMiddleware(history)));

    const store = createStore(createRootReducer(history), enhancers);

    sagaMiddleware.run(PassengersSaga);

    return store;
};


export const store = ConfigStore();
