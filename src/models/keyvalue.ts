import { Gender } from ".";

export interface KeyValue {
    [key: string]: string | number | boolean | Gender | undefined;
};