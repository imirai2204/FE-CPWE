//import * as React from 'react';
import React, { useState, useContext, Fragment } from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import Paper from "@mui/material/Paper";
import { visuallyHidden } from "@mui/utils";
import EditIcon from "@mui/icons-material/Edit";
import TrashIcon from "@mui/icons-material/Delete";
import UpArrow from "@mui/icons-material/ArrowDropUp";
import ConfirmDialog from "../Modal/ConfirmDialog";
import CloseIcon from "@mui/icons-material/Close";

import EditPopup from "../Modal/EditPopup";
import EditForm from "./EditForm";

function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

function getComparator(order, orderBy) {
    return order === "desc"
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) {
            return order;
        }
        return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
}

function EnhancedTableHead(props) {
    const { order, orderBy, onRequestSort, columns } = props;
    const createSortHandler = (property) => (event) => {
        onRequestSort(event, property);
    };

    const sortType = order === "desc" ? "sorted descending" : "sorted ascending";
    const sortColumnTable = (columnId) => {
        if (orderBy === columnId) {
            return (
                <Box component='span' sx={visuallyHidden}>
                    {sortType}
                </Box>
            );
        }
        return null;
    };

    return (
        <TableHead>
            <TableRow>
                {columns.map((column) => (
                    <TableCell
                        key={column.id}
                        align={column.align}
                        sortDirection={orderBy === column.id ? order : false}
                        width={column.width}>
                        <TableSortLabel
                            active={orderBy === column.id}
                            direction={orderBy === column.id ? order : "asc"}
                            onClick={createSortHandler(column.id)}
                            IconComponent={UpArrow}
                            style={column.style}>
                            {column.label}
                            {sortColumnTable(column.id)}
                        </TableSortLabel>
                    </TableCell>
                ))}
                {props.isEditCol ? (
                    <TableCell key='header-edit' align='center' style={{ width: "5%" }}>
                        Edit
                    </TableCell>
                ) : (
                    <Fragment />
                )}
                {props.isDeleteCol ? (
                    <TableCell key='header-delete' align='center' style={{ width: "5%" }}>
                        Delete
                    </TableCell>
                ) : (
                    <Fragment />
                )}
                {props.isDisableCol ? (
                    <TableCell
                        key='header-disabled'
                        align='center'
                        style={{ width: "5%" }}>
                        Disabled
                    </TableCell>
                ) : (
                    <Fragment />
                )}
            </TableRow>
        </TableHead>
    );
}

EnhancedTableHead.propTypes = {
    onRequestSort: PropTypes.func.isRequired,
    order: PropTypes.oneOf(["asc", "desc"]).isRequired,
    orderBy: PropTypes.string.isRequired,
};

export const EnhancedTable = ({ columns, rows, ...props }) => {
    const [order, setOrder] = React.useState("asc");
    const [orderBy, setOrderBy] = React.useState("ID");
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [confirmDialog, setConfirmDialog] = useState({
        isOpen: false,
        title: "",
        subTitle: "",
    });
    const [openPopup, setOpenpopup] = useState(false);

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === "asc";
        setOrder(isAsc ? "desc" : "asc");
        setOrderBy(property);
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

    return (
        <Fragment>
            <Paper sx={{ width: "100%", overflow: "hidden" }}>
                <TableContainer sx={{ maxHeight: 440 }}>
                    <Table stickyHeader aria-label='sticky table'>
                        <EnhancedTableHead
                            order={order}
                            orderBy={orderBy}
                            onRequestSort={handleRequestSort}
                            columns={columns}
                            isEditCol={props.hasEditedBtn}
                            isDeleteCol={props.hasDeletedBtn}
                            isDisableCol={props.hasDisabledBtn}
                        />
                        <TableBody>
                            {stableSort(rows, getComparator(order, orderBy))
                                .slice(
                                    page * rowsPerPage,
                                    page * rowsPerPage + rowsPerPage
                                )
                                .map((row, index) => {
                                    return (
                                        <TableRow
                                            hover
                                            role='checkbox'
                                            tabIndex={-1}
                                            key={row.id}>
                                            {columns.map((column) => {
                                                const value = row[column.id];
                                                return (
                                                    <TableCell
                                                        key={column.id}
                                                        align={column.align}>
                                                        {column.format &&
                                                        typeof value === "number"
                                                            ? column.format(value)
                                                            : value}
                                                    </TableCell>
                                                );
                                            })}
                                            {props.hasEditedBtn ? (
                                                <TableCell
                                                    key={index + 2}
                                                    align={"center"}>
                                                    <EditIcon
                                                        style={{
                                                            fill: "#FFC20E",
                                                            fontSize: "20px",
                                                        }}
                                                        // onClick={() => setOpenpopup(true)}
                                                    />
                                                </TableCell>
                                            ) : (
                                                <Fragment />
                                            )}
                                            {props.hasDeletedBtn ? (
                                                <TableCell
                                                    key={index + 3}
                                                    align={"center"}>
                                                    <TrashIcon
                                                        style={{
                                                            fill: "#EB1C24",
                                                            fontSize: "20px",
                                                        }}
                                                        onClick={() => {
                                                            setConfirmDialog({
                                                                isOpen: true,
                                                                title: "Are you sure you want to delete this record?",
                                                                subTitle:
                                                                    "You can't undo this operetion",
                                                                selectDelete: row.id,
                                                            });
                                                        }}
                                                    />
                                                </TableCell>
                                            ) : (
                                                <Fragment />
                                            )}
                                            {props.hasDisabledBtn ? (
                                                <TableCell
                                                    key={index + 4}
                                                    align={"center"}>
                                                    <CloseIcon
                                                        style={{
                                                            fill: "#636E72",
                                                            fontSize: "20px",
                                                        }}
                                                        onClick={() => {
                                                            setConfirmDialog({
                                                                isOpen: true,
                                                                title: "Are you sure you want to disabled this record?",
                                                                subTitle:
                                                                    "You can enable it again before final closure date",
                                                                selectDisable: row.id,
                                                            });
                                                        }}
                                                    />
                                                </TableCell>
                                            ) : (
                                                <Fragment />
                                            )}
                                        </TableRow>
                                    );
                                })}
                            {emptyRows > 0 && (
                                <TableRow>
                                    <TableCell colSpan={6} />
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    component='div'
                    count={rows.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
                <ConfirmDialog
                    confirmDialog={confirmDialog}
                    setConfirmDialog={setConfirmDialog}
                />
            </Paper>

            <EditPopup
                title='Edit Department'
                openPopup={openPopup}
                setOpenpopup={setOpenpopup}>
                <EditForm props={setOpenpopup} />
            </EditPopup>
        </Fragment>
    );
};
