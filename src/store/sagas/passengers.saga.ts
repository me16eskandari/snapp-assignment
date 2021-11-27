import { AxiosResponse } from "axios";
import { push } from "connected-react-router";
import { put, takeLatest, takeLeading } from "redux-saga/effects";
import { URLs } from "src/configs";
import { KeyValue, List, Passenger } from "src/models";
import { HttpService } from "src/services/http.service";
import { PassengersActions, PassengersInitialState, PassengersTypes, ReduxAction } from "..";

export function* PassengersSaga() {

    yield takeLatest(PassengersTypes.SEARCH_PASSENGERS, searchPassengers);
    yield takeLatest(PassengersTypes.REQUEST_PASSENGER_INFO, getPassenger);
    yield takeLeading(PassengersTypes.REQUEST_ADD_PASSENGER, addPassenger);
    yield takeLeading(PassengersTypes.REQUEST_EDIT_PASSENGER, editPassenger);
    yield takeLeading(PassengersTypes.REQUEST_DELETE_PASSENGER, deletePassenger);
};

function* deletePassenger(action: ReduxAction) {
    try {
        const id = action.payload;
        const { url, method } = URLs.passengers.delete(+id);
        yield HttpService.Fetch(url, method);
        yield put(push("/"));
    }
    finally {
        yield put(PassengersActions.doneDelete());
    }
}

function* getPassenger(action: ReduxAction) {
    try {
        const id = action.payload;
        const { url, method } = URLs.passengers.info(+id);
        const response: AxiosResponse<Passenger> = yield HttpService.Fetch(url, method);
        yield put(PassengersActions.setInfo(response.data));
    }
    catch {
        yield put(push("/404"));
    }
}

function* editPassenger(action: ReduxAction) {
    const { id, info, onSuccess, onError }: { id: number, info: KeyValue, onSuccess?: Function, onError?: Function } = action.payload;
    try {
        const { url, method } = URLs.passengers.edit(id);
        const response: AxiosResponse<Passenger> = yield HttpService.Fetch(url, method, info);
        yield put(PassengersActions.setInfo(response.data));
        onSuccess && onSuccess();
    }
    catch {
        onError && onError();
    }
    finally {
        yield put(PassengersActions.doneEdit());
    }
}


function* addPassenger(action: ReduxAction) {
    const { info, onSuccess, onError }: { info: KeyValue, onSuccess?: Function, onError?: Function } = action.payload;
    try {
        const { url, method } = URLs.passengers.add();
        const response: AxiosResponse<Passenger> = yield HttpService.Fetch(url, method, info);
        onSuccess && onSuccess();

        if (response.data?.id) {
            yield put(push(`./passenger/${response.data?.id}`));
        }
    }
    catch {
        onError && onError();
    }
    finally {
        yield put(PassengersActions.doneAdd());
    }
}

function* searchPassengers(action: ReduxAction) {
    try {
        const { limit, skip, criteria } = action.payload;


        let query = "";
        if (criteria) {
            const { name, value, type } = criteria;
            if (value !== "" && value !== undefined) {
                query = `where={"${name}":${type === "boolean" ? value : `{"contains":"${value}"}`}}`;
            }
        }

        const { url, method } = URLs.passengers.list(limit, skip, query);

        const response: AxiosResponse<List> = yield HttpService.Fetch(url, method);

        if (response.data?.meta?.total === 1) {
            yield put(push(`./passenger/${response.data?.items[0]?.id}`));
        }

        yield put(PassengersActions.setList(response.data));
    }
    catch {
        yield put(PassengersActions.setList({ ...PassengersInitialState.list }));
    }
}