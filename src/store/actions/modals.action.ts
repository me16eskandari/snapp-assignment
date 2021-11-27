import { ModalsTypes } from "..";
import { createAction } from "./ceate.action";

export namespace ModalsAction {
    export const showAddPassenger = () => createAction(ModalsTypes.SHOW_ADD_PASSENGER);
    export const hideAddPassenger = () => createAction(ModalsTypes.HIDE_ADD_PASSENGER);
}