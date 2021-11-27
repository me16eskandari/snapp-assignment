import { FilterProps } from "./filter.props";

export const Filter: React.FC<FilterProps> = ({
    name, type, value, onChangeName, removeFilter,
    onChangeValueBoolean, onChangeValueString, applyFilter,
    filters, yesNo
}) => {

    return (
        <div className="table-filter">
            <div className="input">
                <label>Filter By:</label>
                <select value={name} onChange={onChangeName}>
                    {filters.map((x, i) => (
                        <option value={x.value} key={i}>{x.title}</option>
                    ))}
                </select>
            </div>
            {
                type === "boolean" &&
                <div className="input">
                    <label>Equals:</label>
                    <select value={"" + value} onChange={onChangeValueBoolean}>
                        {yesNo.map((x, i) => (
                            <option value={"" + x.value} key={i}>{x.title}</option>
                        ))}
                    </select>
                </div>
            }
            {
                type === "string" &&
                <div className="input">
                    <label>Contains:</label>
                    <input type="text" value={"" + value} onChange={onChangeValueString} />
                </div>
            }
            <div className="actions">
                <button onClick={applyFilter}>َSearch</button>
                <button onClick={removeFilter}>Reset</button>
            </div>
        </div>
    );
};