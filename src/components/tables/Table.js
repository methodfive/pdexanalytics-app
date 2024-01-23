import { useState, useMemo } from 'react'
import { Pagination } from './Pagination'
import {filterRows, paginateRows, sortRows} from "./TableUtil";

export const Table = ({ columns, rows, defaultSort, loading, onRowClick }) => {
    const [activePage, setActivePage] = useState(1)
    // eslint-disable-next-line no-unused-vars
    const [filters, setFilters] = useState({})
    const [sort, setSort] = useState(defaultSort)
    const rowsPerPage = 10;

    const filteredRows = useMemo(() => filterRows(rows, filters), [rows, filters])
    const sortedRows = useMemo(() => sortRows(filteredRows, sort), [filteredRows, sort])
    const calculatedRows = paginateRows(sortedRows, activePage, rowsPerPage)

    const count = !loading && filteredRows && filteredRows.length
    const totalPages = !loading && Math.ceil(count / rowsPerPage)

    const updateActivePage = (e, p) => {
        e.preventDefault();
        setActivePage(p);
    }

    const handleSort = (e, accessor) => {
        e.preventDefault();
        setActivePage(1)
        setSort((prevSort) => ({
            order: prevSort.order === 'asc' && prevSort.orderBy === accessor ? 'desc' : 'asc',
            orderBy: accessor,
        }))
    }

    return (
        <>
            <table className="table table-borderless table-nowrap align-middle mb-0">
                <thead className="table-light">
                <tr className="">
                    {columns.map((column) => {
                        const sortIcon = () => {
                            if (column.accessor === sort.orderBy) {
                                if (sort.order === 'asc') {
                                    return <i className="fa-solid fa-arrow-up"></i>
                                }
                                return <i className="fa-solid fa-arrow-down"></i>
                            }
                            return <></>;
                        }
                        return (
                            <th style={column.headerStyle} className={column.headerClass} key={column.accessor}>
                                {!(column.isSortable == null || column.isSortable === true) &&
                                    <>{column.labelFunc && column.labelFunc()}{column.label}</>}
                                {(column.isSortable == null || column.isSortable === true) &&
                                    <><a href="#sort" onClick={(e) => handleSort(e, column.accessor)}>{column.labelFunc && column.labelFunc()}{column.label}</a> {sortIcon(column)}</>}
                            </th>
                        )
                    })}
                </tr>
                </thead>
                <tbody>
                {!loading && calculatedRows.map((row) => {
                    return (
                        <tr key={row.i} className={onRowClick && "clickable"} onClick={(e) => {
                            if(onRowClick != null) {
                                onRowClick(e, row)
                            }
                        }}>
                            {columns.map((column) => {
                                if (column.content) {
                                    return <td className={column.bodyClass} key={column.accessor}>{column.content(row[column.accessor], row)}</td>
                                }
                                if (column.format) {
                                    return <td className={column.bodyClass} key={column.accessor}>{column.format(row[column.accessor])}</td>
                                }
                                return <td className={column.bodyClass} key={column.accessor}>{row[column.accessor]}</td>
                            })}
                        </tr>
                    )
                })}
                </tbody>
            </table>
            {loading && <>
                <div className="loading-background mt-3" style={{width:"300px", marginLeft:"16px"}}><h4 className="mb-0">&nbsp;</h4></div>
                <div className="loading-background mt-3" style={{width:"300px", marginLeft:"16px"}}><h4 className="mb-0">&nbsp;</h4></div>
                <div className="loading-background mt-3" style={{width:"300px", marginLeft:"16px"}}><h4 className="mb-0">&nbsp;</h4></div>
            </>}

            {count > 0 ? (
                <Pagination
                    activePage={activePage}
                    count={count}
                    rowsPerPage={rowsPerPage}
                    totalPages={totalPages}
                    setActivePage={updateActivePage}
                />
            ) : (
                <p>No data found</p>
            )}
        </>
    )
}