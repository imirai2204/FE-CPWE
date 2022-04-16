import React, { useState, useEffect } from "react";
import "../styles/style.scss";
import { Formik, Form } from "formik";
import { TextField } from "../components/UI/Form/TextField";
import { EnhancedTable } from "../components/UI/Table/Table";
import { DepartmentSchema } from "../validation";
import { DepartmentUrl, Flag, Warn } from "../api/EndPoint";
import { ColumnsDepartment } from "../components/UI/Table/TableItems";
import { AxiosInstance } from "../api/AxiosClient";
import { useSelector } from "react-redux";
import ErrorMessagePopUp from "../components/UI/Modal/ErrorMessage";
import AuthorizationAPI from "../api/AuthorizationAPI";
import PageNotFound from "../404";

const handleSubmit = async (values, setIsSubmiting, setErrorData) => {
    await AxiosInstance.post(DepartmentUrl.create, values, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    })
        .then((res) => {
            var errorData = {
                code: res.data.code,
                message: res.data.message,
            }
            setErrorData(errorData);
            console.log("Create success");
            setIsSubmiting(false);
        })
        .catch((error) => {
            if (error && error.response) {
                console.log("Error: ", error);
            }
        });
};

const handleGet = async (values, setReturnData, setPagination) => {
    const paramsValue = {
        searchKey: values === null || values.searchKey === null ? null : values.searchKey,
        page: values === null || values.page === null ? 1 : values.page,
        limit: values === null || values.limit === null ? 5 : values.limit,
        sortBy: values === null || values.sortBy === null ? "createdDate" : values.sortBy,
        sortType: values === null || values.sortType === null ? "DESC" : values.sortType,
    };
    await AxiosInstance.get(DepartmentUrl.get, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        params: paramsValue,
    })
        .then((res) => {
            // console.log(res)
            var pagination = {
                page: res.data.data.page,
                size: res.data.data.size,
                totalPages: res.data.data.totalPages,
            };
            var tableData = res.data.data.content.map((content) => {
                return {
                    id: content.id,
                    department: content.department,
                };
            });
            setReturnData(tableData);
            setPagination(pagination);
        })
        .catch((error) => {
            if (error && error.response) {
                console.log("Error: ", error);
            }
        });
};

const initialValues = {
    department: "",
};

function Department() {
    const [permission, setPermission] = useState(true);
    const [returnData, setReturnData] = useState([]);
    const [returnPagination, setPagination] = useState({});
    const [isSubmiting, setIsSubmiting] = useState(false);
    const [errorData, setErrorData] = useState({
        code: 1,
        message: "ok"
    });
    // const tableAttr = useSelector((state) => state.table);
    const currentPage = useSelector((state) => state.table.page);
    const currentLimit = useSelector((state) => state.table.rowsPerPage);

    const tableDatas = {
        // searchKey: tableAttr.searchText,
        searchKey: null,
        limit: currentLimit,
        page: currentPage,
        sortBy: null,
        sortType: null,
    };

    useEffect(() => {
        AuthorizationAPI(Flag.manageSemester, setPermission)
    }, [permission])

    useEffect(() => {
        if (permission === true) {
            handleGet(tableDatas, setReturnData, setPagination);
        }
    }, [permission, currentPage, currentLimit]);

    if (isSubmiting === false) {
        handleGet(tableDatas, setReturnData, setPagination);
        setIsSubmiting(true);
    }

    if (permission) {
        return (
            <div className='department-page container'>
                <h2 className='page-title'>Department</h2>
                <div className='layout-form'>
                    <Formik
                        initialValues={initialValues}
                        validationSchema={DepartmentSchema}
                        onSubmit={(values, { setSubmitting }) => {
                            handleSubmit(values, setIsSubmiting, setErrorData);
                        }}>
                        {({
                            isSubmiting,
                            handleChange,
                            handleBlur,
                            handleSubmit,
                            values,
                            errors,
                            touched,
                            setFieldValue,
                        }) => (
                            <Form className='submit-form'>
                                <div className='form-container'>
                                    <div className='input-section label-mark'>
                                        <TextField
                                            label={"Department Name"}
                                            name='department'
                                            type='text'
                                            placeholder='Department Name…'
                                        />
                                    </div>
                                </div>
                                <hr />
                                <div className='list-button'>
                                    <button className={"btn btn-info"} type='reset'>
                                        Refresh
                                    </button>
                                    <button className={"btn btn-success"} type='submit'>
                                        Save
                                    </button>
                                </div>
                            </Form>
                        )}
                    </Formik>
                </div>
                <div className='layout-table'>
                    <EnhancedTable
                        columns={ColumnsDepartment}
                        rows={returnData}
                        totalPages={returnPagination.totalPages}
                    />
                </div>
                {errorData.code !== 1 ?
                    <ErrorMessagePopUp closebtn={setErrorData} errorMess={errorData.message} /> :
                    <></>
                }
            </div>
        );
    } else {
        return (
            <PageNotFound warn={Warn.noPermission} />
        );
    }
}

export default Department;
