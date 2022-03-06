import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import EditIcon from "@mui/icons-material/Edit";
import TrashIcon from "@mui/icons-material/Delete";
import DownArrow from "@mui/icons-material/ArrowDropDown";
import UpArrow from "@mui/icons-material/ArrowDropUp";
import EditTableContext from "../../../store/edit-table-context";

export const StickyHeadTable = ({ columns, rows, keys }) => {
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [sortLable, setSortLable] = React.useState(false);
    const editTableCtx = React.useContext(EditTableContext);


    const toggleSort = () => {
        setSortLable(!sortLable);
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const handleGetData = (data) => {
        const dataValue = Object.values(data);
        editTableCtx.getValue(dataValue);
    }

    return (
        <Paper sx={{ width: "100%", overflow: "hidden" }}>
            <TableContainer sx={{ maxHeight: 440 }}>
                <Table stickyHeader aria-label="sticky table" key={keys}>
                    <TableHead>
                        <TableRow>
                            <TableCell
                                key="header-edit"
                                align="center"
                                style={{ width: "10%" }}
                            >
                                Edit
                            </TableCell>
                            <TableCell
                                key="header-delete"
                                align="center"
                                style={{ width: "10%" }}
                            >
                                Delete
                            </TableCell>
                            <TableCell
                                key="header-no"
                                align="center"
                                style={{ width: "20%" }}
                            >
                                ID
                                <span onClick={toggleSort}>
                                    {sortLable ? (
                                        <DownArrow style={{ fontSize: "20px" }} />
                                    ) : (
                                        <UpArrow style={{ fontSize: "20px" }} />
                                    )}
                                </span>
                            </TableCell>
                            {columns.map((column) => (
                                <TableCell
                                    key={column.id}
                                    align={column.align}
                                    style={{ width: column.width }}>
                                    {column.label}
                                    <span onClick={toggleSort}>
                                        {sortLable ? (
                                            <DownArrow style={{ fontSize: "20px" }} />
                                        ) : (
                                            <UpArrow style={{ fontSize: "20px" }} />
                                        )}
                                    </span>
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((row, index) => {
                                return (
                                    <TableRow
                                        hover
                                        role="checkbox"
                                        tabIndex={-1}
                                        key={row.id}>
                                        <TableCell
                                            key={index + 2}
                                            align={"center"}
                                        >
                                            <EditIcon
                                                style={{ fill: '#FFC20E', fontSize: '20px' }}
                                                onClick={() => handleGetData(row)}
                                            />
                                        </TableCell>
                                        <TableCell
                                            key={index + 3}
                                            align={"center"}
                                        >
                                            <TrashIcon
                                                style={{ fill: '#EB1C24', fontSize: '20px' }}
                                                onClick={() => handleGetData(row)}
                                            />
                                        </TableCell>
                                        <TableCell key={index + 1} align={"center"}>
                                            {row.id}
                                        </TableCell>
                                        {columns.map((column) => {
                                            const value = row[column.id];
                                            return (
                                                <>
                                                    <TableCell
                                                        key={column.id}
                                                        align={column.align}>
                                                        {column.format &&
                                                            typeof value === "number"
                                                            ? column.format(value)
                                                            : value}
                                                    </TableCell>
                                                </>
                                            );
                                        })}
                                    </TableRow>
                                );
                            })}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[10, 20, 50]}
                component="div"
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </Paper>
    );
};
