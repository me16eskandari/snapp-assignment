import { List, Passenger } from "src/models";

export type PassengersState = {
    list: List;
    currentPassenger?: Passenger;
    searching: boolean;
    fetching: boolean;
    adding: boolean;
    editing: boolean;
    deleting: boolean;
};

export const PassengersInitialState: PassengersState = {
    list: {
        meta: {
            limit: 20,
            skipped: 0,
            total: 0,
            criteria: {}
        },
        items: []
    },
    searching: false,
    fetching: false,
    adding: false,
    editing: false,
    deleting: false,
};