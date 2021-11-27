import { useState } from "react";
import { GenderTypes, KeyValue } from "src/models";
import { ValidationService } from "src/services";
import { FormProps } from "./form.props";

export const Form: React.FC<FormProps> = ({ className, loading, model, onError, onSubmit, onSuccess }) => {

    //#region state

    const [state, setState] = useState([...JSON.parse(JSON.stringify(model))]);

    //#endregion

    //#region methods

    const validate = (name: string | null, value: string) => {
        const model = ValidationService.validatModelByName(state, name, value);
        const fromState = state;
        setState([...fromState]);
        return model.valid;
    };

    const onChange = (name: string, e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const value = e.target.value;
        validate(name, value);
    };

    const onFormSuccess = () => {
        setState((s) => [...s.map((x) => ({ ...x, value: x.type === "boolean" ? false : "", error: "" }))]);
        onSuccess && onSuccess();
    };

    const onFormSubmit = (e: React.SyntheticEvent) => {
        e.preventDefault();

        if (loading) return;

        const valid = validate(null, "");
        if (valid) {
            const model: KeyValue = ValidationService.convetToDto(state);
            onSubmit(model, onFormSuccess);
        }
    };

    //#endregion


    return (
        <form className={"form " + className} onSubmit={onFormSubmit}>
            {
                state.map((field) => (
                    <div className="input" key={field.name}>
                        <label>{field.label}</label>
                        {
                            (field.type === "string" || field.type === "number") &&
                            <input
                                placeholder={field.placeholder}
                                className={field.error ? " is-invalid" : ""}
                                name={field.name}
                                value={(field.value || "")}
                                onChange={(e) => onChange(field.name, e)}
                            />
                        }
                        {
                            field.type === "gender" &&
                            <select
                                className={field.error ? " is-invalid" : ""}
                                value={"" + field.value}
                                onChange={(e) => onChange(field.name, e)}>
                                <option title={field.placeholder} value={undefined}>{field.placeholder}</option>
                                {Object.values(GenderTypes).map((value) => (
                                    <option
                                        title={value}
                                        value={value}
                                        key={value}>{value}</option>)
                                )}
                            </select>
                        }
                        {
                            field.type === "boolean" &&
                            <select
                                className={field.error ? " is-invalid" : ""}
                                value={"" + field.value}
                                onChange={(e) => onChange(field.name, e)}>
                                <option title="True" value={"true"}>True</option>
                                <option title="False" value={"false"}>False</option>
                            </select>
                        }
                        {field.error && <div className="error">{field.error}</div>}
                    </div>
                ))
            }
            <div className="actions">
                <button disabled={loading} type="submit">Submit</button>
            </div>
        </form>
    );
};