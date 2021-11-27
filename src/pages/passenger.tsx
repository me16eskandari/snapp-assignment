import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { Form, PassengerInfo } from "src/components";
import { Field, KeyValue, Validation } from "src/models";
import { PassengersActions, PassengersState } from "src/store";

const model: Field[] = [
    {
        name: "first_name",
        type: "string",
        value: "",
        label: "First Name",
        placeholder: "John",
        validations: [Validation.Required]
    },
    {
        name: "last_name",
        type: "string",
        value: "",
        label: "Last Name",
        placeholder: "Wick",
        validations: [Validation.Required]
    },
    {
        name: "phone",
        type: "string",
        value: "",
        label: "Phone",
        placeholder: "-"
    },
    {
        name: "cellphone_verified",
        type: "boolean",
        value: "",
        label: "Phone Verified",
        placeholder: "-"
    },
    {
        name: "gender",
        type: "gender",
        value: "",
        label: "Gender",
        placeholder: "-"
    },
    {
        name: "number_masked",
        type: "string",
        value: "",
        label: "Number Masked",
        placeholder: ""
    },
    {
        name: "notes",
        type: "string",
        value: "",
        label: "Note",
        placeholder: ""
    },
    {
        name: "balance",
        type: "number",
        value: "",
        label: "Balance",
        placeholder: ""
    },
    {
        name: "banned",
        type: "boolean",
        value: "",
        label: "Banned",
        placeholder: "-"
    },
];


export const Passenger: React.FC = () => {

    //#region props

    const dispatch = useDispatch();
    const passengers: PassengersState = useSelector((state: any) => state.passengers);
    const { id }: any = useParams();

    //#endregion

    //#region state

    const [state, setState] = useState<{ editing: boolean, feilds: Field[] }>({ editing: false, feilds: JSON.parse(JSON.stringify(model)) });

    //#endregion

    //#region method
    const onDelete = () => {
        dispatch(PassengersActions.requestDelete(+id));
    };

    const onEdit = () => {

        if (state.editing) {
            setState((s) => ({ ...s, editing: false }));
            return;
        }

        setState((s) => ({
            editing: true,
            //@ts-ignore
            feilds: [...s.feilds.map((x) => ({ ...x, value: passengers.currentPassenger[x.name], error: "" }))]
        }));
    };

    const onSubmit = (model: KeyValue, onSuccess?: Function, onError?: Function) => {
        dispatch(PassengersActions.requestEdit(+id, model, onSuccess, onError));
    };

    const onEditSuccess = () => setState((s) => ({ ...s, editing: false }));

    //#endregion

    //#region effect

    useEffect(() => {
        dispatch(PassengersActions.requestInfo(id))
        return () => {
            dispatch(PassengersActions.setInfo(undefined));
        };
    }, [dispatch, id]);

    //#endregion

    if (!passengers.currentPassenger) return (
        <div className="loading">LOADING</div>
    );

    return (
        <>
            <div className="page-actions">
                <Link to="/">Return</Link>
                <button disabled={state.editing || passengers.deleting || passengers.editing} onClick={onDelete}>Delete</button>
                <button disabled={passengers.deleting || passengers.editing} onClick={onEdit}>{state.editing ? "Cancel Editing" : "Edit"}</button>
            </div>
            <PassengerInfo {...passengers.currentPassenger} />
            {
                state.editing &&
                <Form className="two-column has-bg" loading={passengers.editing} model={state.feilds} onSubmit={onSubmit} onSuccess={onEditSuccess} />
            }
        </>
    );

};