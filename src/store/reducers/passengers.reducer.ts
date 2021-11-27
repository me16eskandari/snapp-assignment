import { PassengersState, PassengersInitialState, ReduxAction } from "../models";
import { PassengersTypes } from "../types";

export const PassengersReducer = (state: PassengersState = PassengersInitialState, action?: ReduxAction): PassengersState => {

    if (!action) return state;

    switch (action.type) {

        case PassengersTypes.SEARCH_PASSENGERS:
            return { ...state, searching: true, list: { ...state.list, items: action.payload?.reset ? [] : state.list.items } };

        case PassengersTypes.SET_PASSENGER_LIST:
            return { ...state, searching: false, list: { ...action.payload } };

        case PassengersTypes.REQUEST_PASSENGER_INFO:
            return { ...state, fetching: true, currentPassenger: undefined };

        case PassengersTypes.SET_PASSENGER_INFO:
            return { ...state, fetching: true, currentPassenger: action.payload };

        case PassengersTypes.REQUEST_ADD_PASSENGER:
            return { ...state, adding: true };

        case PassengersTypes.DONE_ADD_PASSENGER:
            return { ...state, adding: false };

        case PassengersTypes.REQUEST_EDIT_PASSENGER:
            return { ...state, editing: true };

        case PassengersTypes.DONE_EDIT_PASSENGER:
            return { ...state, editing: false };

        case PassengersTypes.REQUEST_DELETE_PASSENGER:
            return { ...state, deleting: true };

        case PassengersTypes.DONE_DELETE_PASSENGER:
            return { ...state, deleting: false };
    }

    return state;
};