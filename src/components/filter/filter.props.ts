import { Gender } from "src/models";

export type FilterProps = {
    name: string;
    value: string | boolean | Gender | undefined;
    type: string;
    onChangeName: (event: React.ChangeEvent<HTMLSelectElement>) => any;
    onChangeValueBoolean: (event: React.ChangeEvent<HTMLSelectElement>) => any;
    onChangeValueString: (event: React.ChangeEvent<HTMLInputElement>) => any;
    applyFilter: () => any;
    removeFilter: () => any;
    filters: { title: string, value: string, type: string }[];
    yesNo: { title: string; value: boolean | undefined }[];
};