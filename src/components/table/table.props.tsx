export type TableProps = {

    data: any[];
    limit: number;
    total: number;
    page?: number;
    fetch: (reset: boolean, limit: number, skip: number) => void;
    children: JSX.Element | JSX.Element[];
};