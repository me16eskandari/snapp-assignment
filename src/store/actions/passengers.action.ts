import { Gender, KeyValue, List, Passenger } from "src/models";
import { PassengersTypes } from "../types";
import { createAction } from "./ceate.action";

export namespace PassengersActions {

    export const searchPassengers =
        (reset: boolean, limit: number, skip: number, criteria?: { name: string, value: string | boolean | Gender | undefined, type: string }) =>
            createAction(PassengersTypes.SEARCH_PASSENGERS, { reset, limit, skip, criteria });
    export const setList = (list: List) => createAction(PassengersTypes.SET_PASSENGER_LIST, list);


    export const requestInfo = (id: number) => createAction(PassengersTypes.REQUEST_PASSENGER_INFO, id);
    export const setInfo = (info?: Passenger) => createAction(PassengersTypes.SET_PASSENGER_INFO, info);

    export const requestAdd = (info: KeyValue, onSuccess?: Function, onError?: Function) => createAction(PassengersTypes.REQUEST_ADD_PASSENGER, { info, onSuccess, onError });
    export const doneAdd = () => createAction(PassengersTypes.DONE_ADD_PASSENGER);

    export const requestEdit = (id: number, info: KeyValue, onSuccess?: Function, onError?: Function) => createAction(PassengersTypes.REQUEST_EDIT_PASSENGER, { id, info, onSuccess, onError });
    export const doneEdit = () => createAction(PassengersTypes.DONE_EDIT_PASSENGER);

    export const requestDelete = (id: number) => createAction(PassengersTypes.REQUEST_DELETE_PASSENGER, id);
    export const doneDelete = () => createAction(PassengersTypes.DONE_DELETE_PASSENGER);

};