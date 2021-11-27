import { ModalsState, ModalsInitialState, ReduxAction } from "../models";
import { ModalsTypes } from "../types";

export const ModalsReducer = (state: ModalsState = ModalsInitialState, action?: ReduxAction): ModalsState => {

    if (!action) return state;

    switch (action.type) {

        case ModalsTypes.SHOW_ADD_PASSENGER:
            return { ...state, addPassenger: true };

        case ModalsTypes.HIDE_ADD_PASSENGER:
            return { ...state, addPassenger: false };
    }

    return state;
};