import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import EditIcon from "@mui/icons-material/Edit";
import TrashIcon from "@mui/icons-material/Delete";
import DownArrow from "@mui/icons-material/ArrowDropDown";
import UpArrow from "@mui/icons-material/ArrowDropUp";

export const StickyHeadTable = ({ columns, rows, keys }) => {
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [sortLable, setSortLable] = React.useState(false);

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

    const handleGetName = (test) => {
        console.log(test);
    }

    return (
        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
            <TableContainer sx={{ maxHeight: 440 }}>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            <TableCell
                                key="header-no"
                                align="center"
                                style={{ minWidth: 50 }}
                            >
                                No
                            </TableCell>
                            {columns.map((column) => (
                                <TableCell
                                    key={column.id}
                                    align={column.align}
                                    style={{ minWidth: column.minWidth }}
                                >
                                    {column.label}
                                    <span onClick={toggleSort}>
                                        {sortLable ?
                                            <DownArrow style={{ fontSize: "20px" }} /> :
                                            <UpArrow style={{ fontSize: "20px" }} />}
                                    </span>

                                </TableCell>
                            ))}
                            <TableCell
                                key="header-edit"
                                align="center"
                                style={{ minWidth: 100 }}
                            >
                                Edit
                            </TableCell>
                            <TableCell
                                key="header-delete"
                                align="center"
                                style={{ minWidth: 100 }}
                            >
                                Delete
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((row, index) => {
                                return (
                                    <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                                        <TableCell
                                            key={index + 1}
                                            align={"center"}
                                        >
                                            {index + 1}
                                        </TableCell>
                                        {columns.map((column) => {
                                            const value = row[column.id];
                                            return (
                                                <>
                                                    <TableCell key={column.id} align={column.align}>
                                                        {column.format && typeof value === 'number'
                                                            ? column.format(value)
                                                            : value}
                                                    </TableCell>
                                                </>
                                            );
                                        })}
                                        <TableCell
                                            key={row.id}
                                            align={"center"}
                                        >
                                            <EditIcon style={{fill: '#FFC20E', fontSize: '20px'}} onClick={() => handleGetName(row.id)} />
                                        </TableCell>
                                        <TableCell
                                            key={row.id}
                                            align={"center"}
                                        >
                                            <TrashIcon style={{fill: '#EB1C24', fontSize: '20px'}} onClick={() => handleGetName(row.id)} />
                                        </TableCell>
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
}