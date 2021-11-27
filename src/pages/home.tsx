import { ChangeEvent, useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Filter, Table } from "src/components";
import { AddPassengerModal } from "src/components/modals";
import { Plus } from "src/components/svg";
import { TableRow } from "src/components/table/table.row";
import { Gender, Passenger } from "src/models";
import { ModalsAction, PassengersActions, PassengersInitialState, PassengersState } from "src/store";

interface HomeState {
    name: string;
    value: string | boolean | Gender | undefined;
    type: string;
    applied: boolean;
}

export const Home: React.FC = () => {

    //#region state

    const [state, setState] = useState<HomeState>({
        name: "first_name",
        value: "",
        type: "string",
        applied: false,
    });

    const filters = useRef([
        { value: "first_name", title: "First Name", type: "string" },
        { value: "last_name", title: "Last Name", type: "string" },
        { value: "email", title: "Email", type: "string" },
        { value: "banned", title: "Banned", type: "boolean" },
    ]);

    const yesNo = useRef([
        { value: undefined, title: "-" },
        { value: true, title: "True" },
        { value: false, title: "False" },
    ]);

    //#endregion

    //#region props

    const dispatch = useDispatch();
    const passengers: PassengersState = useSelector((state: any) => state.passengers);

    //#endregion


    //#region methods

    const getList = useCallback((reset: boolean, limit: number, skip: number) => {
        dispatch(PassengersActions.searchPassengers(reset, limit || passengers.list.meta.limit, skip || 0, state.applied ? state : undefined));
    }, [dispatch, passengers.list.meta.limit, state]);

    const onChangeName = (event: ChangeEvent<HTMLSelectElement>) => {
        const name = event.target.value;

        const newFilter = filters.current.find((x) => x.value === name);
        if (!newFilter) return;

        const currentFilter = filters.current.find((x) => x.value === state.name);
        if (!currentFilter) return;

        const value = newFilter.type === currentFilter.type ? state.value :
            newFilter.type === "string" ? "" : undefined;


        setState((s) => ({ ...s, name, value, type: newFilter.type }));
    };

    const onChangeValueBoolean = (event: ChangeEvent<HTMLSelectElement>) => {
        const v = event.target.value;
        const value = v === "true" ? true : v === "false" ? false : undefined;
        setState((s) => ({ ...s, value }));
    };

    const onChangeValueString = (event: ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setState((s) => ({ ...s, value }));
    };

    const applyFilter = () => {
        setState((s) => ({ ...s, applied: true }));
        dispatch(PassengersActions.searchPassengers(true, passengers.list.meta.limit, 0, state));
    };

    const removeFilter = () => {
        setState((s) => ({ ...s, applied: false, value: "" }));
        dispatch(PassengersActions.searchPassengers(true, passengers.list.meta.limit, 0));
    };

    const addPassenger = () => dispatch(ModalsAction.showAddPassenger());

    //#endregion

    //#region effect

    useEffect(() => {
        return () => {
            dispatch(ModalsAction.hideAddPassenger());
            dispatch(PassengersActions.setList({ ...PassengersInitialState.list }));
        };
    }, [dispatch]);

    //#endregion

    const page = 1 + passengers.list.meta.skipped / passengers.list.meta.limit;

    return (
        <>
            <Filter
                {...state}
                applyFilter={applyFilter}
                removeFilter={removeFilter}
                filters={filters.current}
                onChangeName={onChangeName}
                onChangeValueBoolean={onChangeValueBoolean}
                onChangeValueString={onChangeValueString}
                yesNo={yesNo.current}
            />
            <Table data={passengers.list.items} page={page} fetch={getList} limit={passengers.list.meta.limit} total={passengers.list.meta.total}>
                <TableRow data="first_name" header="First Name" />
                <TableRow data="last_name" header="Last Name" />
                <TableRow data="gender" header="Gender" />
                <TableRow data="email" header="Email" />
                <TableRow data="balance" header="Balance" />
                <TableRow data="banned" header="Banned" />
                <TableRow header="">
                    {({ id }: Passenger) => <Link to={`/passenger/${id}`}>View</Link>}
                </TableRow>
            </Table>
            <AddPassengerModal />
            <div className="floating-button" onClick={addPassenger}>
                <Plus />
            </div>
        </>
    );

};