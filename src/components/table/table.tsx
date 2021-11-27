import { Children, useCallback, useEffect, useState } from "react";
import { LeftArrow, RightArrow } from "../svg";
import { TableProps } from "./table.props";

export const Table: React.FC<TableProps> = ({ data, limit, total = 0, page = 1, fetch, children }) => {

    //#region  state

    const [list, setList] = useState({
        page: page,
        perPage: limit,
        total: total,
        totalPages: Math.ceil(total / limit),
    });

    //#region 

    //#region methods

    const loadData = useCallback((reset: boolean, page: number) => {
        fetch(reset, limit, ((page || 1) - 1) * limit);
    }, [fetch, limit]);

    const setPage = (page: number) => {
        setList((list) => ({ ...list, page }));
        loadData(false, page);
    }

    //#endregion

    //#region effects

    useEffect(() => {
        loadData(true, 1);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        setList((list) => ({
            ...list,
            total: total,
            totalPages: Math.ceil(total / limit),
            page: page
        }));
    }, [total, limit, page]);


    //#endregion

    //#region helpers

    const renderHeader = () => {
        return children && Children.map(children, (child: JSX.Element, index) => (
            child?.type.name === "TableRow" && <th key={index} style={{ width: child?.props.width }}>{child?.props.header}</th>
        ));
    };

    const renderBody = () => {
        return children && data.map((row, rowIndex) => (
            <tr key={rowIndex}>
                {
                    Children.map(children, (cell: JSX.Element, cellIndex) => {
                        if (cell?.type.name !== "TableRow") return;

                        const Template = cell.props.children;

                        let text =
                            (Template && <Template {...row} />) ||
                            (cell.props.text || row[cell.props.data]);

                        if ((typeof text === "boolean") || (text instanceof Boolean)) {
                            text = text ? "True" : "False"
                        }

                        if (!cell.props.onClick)
                            return <td key={cellIndex} data-title={cell?.props.header || undefined}>{text}</td>
                        else {
                            return <td key={cellIndex} data-title={cell?.props.header || undefined}>
                                <span onClick={() => cell.props.onClick(row[cell.props.data])}>{text}</span>
                            </td>
                        }
                    })
                }
            </tr>
        ));
    };

    // create pagination, shows maximum of 6 page button
    const renderPagination = () => {
        if (list.totalPages <= 1) return;

        const pageNos = 6;
        const currentPage = (list.page || 1);
        let minPage = 1;
        if (currentPage > pageNos / 2) minPage = Math.ceil(currentPage - (pageNos / 2));

        let maxPage = minPage + pageNos - 1;
        if (maxPage > list.totalPages) {
            minPage -= maxPage - list.totalPages;
            maxPage = minPage + pageNos - 1;
        }

        minPage = minPage > 0 ? minPage : 1;
        maxPage = maxPage <= list.totalPages ? maxPage : list.totalPages;

        const result = [
            <li key={-1} className={currentPage === 1 ? "disabled" : ""}>
                <span onClick={() => currentPage === 1 ? null : setPage(1)} >
                    <LeftArrow />
                </span>
            </li>
        ];

        for (let index = minPage; index <= maxPage; index++) {
            result.push(<li key={index} className={index === currentPage ? "current-page" : ""}>
                <span onClick={() => index === currentPage ? null : setPage(index)} > {index}</span>
            </li>);
        }

        result.push(<li key={-2} className={currentPage === list.totalPages ? "disabled" : ""}>
            <span onClick={() => currentPage === list.totalPages ? null : setPage(list.totalPages)} >
                <RightArrow />
            </span>
        </li>);

        return (<ul className="pagination">{result}</ul>);
    }

    // show entites numbers and page info
    const renderFooter = () => {
        return (
            <tr>
                <td colSpan={Children.count(children)}>
                    <div className="table-footer">
                        <span className="pagination-info">
                            Page {list.page || 1} of {list.totalPages} - {list.total} entities
                        </span>
                        {renderPagination()}
                    </div>
                </td>
            </tr>
        );
    }


    //#endregion

    return (
        <table className="table">
            {
                <>
                    <thead>
                        <tr>{renderHeader()}</tr>
                    </thead>
                    <tbody>
                        {renderBody()}
                    </tbody>
                    <tfoot>
                        {renderFooter()}
                    </tfoot>
                </>
            }
        </table>
    );
};