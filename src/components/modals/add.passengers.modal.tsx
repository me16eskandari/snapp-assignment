import { useDispatch, useSelector } from "react-redux";
import { Field, KeyValue, Validation } from "src/models";
import { ModalsAction, ModalsState, PassengersActions, PassengersState } from "src/store";
import { Form } from "../form";
import { Close } from "../svg";

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
        name: "email",
        type: "string",
        value: "",
        label: "Email",
        placeholder: "someone@exmaple.com",
        validations: [Validation.Required, Validation.Email]
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
        name: "note",
        type: "string",
        value: "",
        label: "Note",
        placeholder: ""
    },
];

export const AddPassengerModal: React.FC = () => {

    //#region props

    const dispatch = useDispatch();
    const modals: ModalsState = useSelector((s: any) => s.modals);
    const passengers: PassengersState = useSelector((s: any) => s.passengers);

    //#endregion


    //#region methods

    const close = () => dispatch(ModalsAction.hideAddPassenger());

    const onSubmit = (model: KeyValue, onSuccess?: Function, onError?: Function) => {
        dispatch(PassengersActions.requestAdd(model, onSuccess, onError));
    };

    //#endregion


    if (!modals.addPassenger) return null;

    return (
        <div className="modal-overlay">
            <div className="modal">
                <div className="modal-header">
                    <h2 className="title">Add Passenger</h2>
                    <span className="close" onClick={close}><Close /></span>
                </div>
                <div className="modal-body">
                    <Form loading={passengers.adding} model={model} onSubmit={onSubmit} onSuccess={close} />
                </div>
            </div>
        </div>
    );

};