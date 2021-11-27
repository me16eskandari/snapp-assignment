import { Field, KeyValue } from "src/models";

export type FormProps = {
    model: Field[];
    onSubmit: (model: KeyValue, onSuccess?: Function, onError?: Function) => any;
    onSuccess?: Function;
    onError?: Function;
    loading?: boolean;
    className?: string;
}