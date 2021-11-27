import { Field, Gender, KeyValue, Validation, ValidationResult } from "src/models";

export namespace ValidationService {

    const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,6})+$/;


    export const validate = (value: string | Gender | boolean, title: string, validationTypes: Validation[]): ValidationResult => {

        // to check required first
        const sorted = validationTypes.sort();

        const result: ValidationResult = {
            message: null,
            valid: true
        };

        for (let vtype of sorted) {
            switch (vtype) {
                case Validation.Required:
                    if (!value || (typeof value === 'string' && !value.trim())) {
                        result.message = `${title} is required`;
                        result.valid = false;
                    }
                    break;

                case Validation.Email:
                    if (!value || (typeof value === 'string' && !value.trim())) break;
                    if (typeof value !== 'string' || !emailRegex.test(value)) {
                        result.message = `${title} is not a vaild email`;
                        result.valid = false;
                    }
                    break;
            }

            // no need for further validation
            if (!result.valid) break;
        }

        return result;
    };

    export const validatModelByIndex = (fields: Field[], target: number | null, value: string): { fields: Field[], valid: boolean } => {
        let m = [...fields];
        let modelValid = true;

        if (target !== null) {
            m[target].value = (value) || "";
        }

        m.forEach((x, index) => {

            if (target !== null && target !== index) return;
            const { message, valid } = validate(x.value, x.label || "", x.validations || []);
            x.error = message || "";
            if (!valid) modelValid = valid;

        });

        return { fields: m, valid: modelValid };
    };

    export const validatModelByName = (fields: Field[], target: string | null, value: any): { fields: Field[], valid: boolean } => {
        let m = [...fields];
        let modelValid = true;

        if (target !== null) {
            const field = fields.find((x) => x.name === target);
            field && (field.value = (value) || "");
        }

        m.forEach((x) => {

            if (target !== null && target !== x.name) return;
            const { message, valid } = validate(x.value, x.label || "", x.validations || []);
            x.error = message || "";
            if (!valid) modelValid = valid;

        });

        return { fields: m, valid: modelValid };
    };

    export const convetToDto = (fields: Field[]): KeyValue => {

        const model: KeyValue = {};

        fields.forEach((x) => {
            let value: any = null;
            value = x.value;
            model[x.name] =
                x.type === "boolean" ? value === "true" :
                    x.type === "number" ? +value : value;
        });

        return model;

    };

}