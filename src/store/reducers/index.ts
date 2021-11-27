import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";
import { PassengersReducer } from "./passengers.reducer";
import { ModalsReducer } from "./modals.reducer";

export const createRootReducer = (history: any) => combineReducers({
    router: connectRouter(history),
    passengers: PassengersReducer,
    modals: ModalsReducer
});