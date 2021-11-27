import { Gender } from ".";

export enum Validation {
    Required,
    Email,
}

export type Field = {
    name: string;
    label?: string;
    placeholder?: string;
    type: "string" | "number" | "boolean" | "gender";
    value: string | boolean | Gender;
    error?: string;
    validations?: Validation[];
}