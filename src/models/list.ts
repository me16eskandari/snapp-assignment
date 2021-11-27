import { Passenger } from "./passenger";

export type List = {
    meta: {
        skipped: number;
        limit: number;
        total: number;
        criteria: any;
    };
    items: Passenger[];
};