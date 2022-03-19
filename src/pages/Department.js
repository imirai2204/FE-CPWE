import React, { useState } from "react";
import "../styles/style.scss";
import { Formik, Form } from "formik";
import { TextField } from "../components/UI/Form/TextField";
import { EnhancedTable } from "../components/UI/Table/Table";
import { DepartmentSchema } from "../validation";
import axios from "axios";
import { DepartmentUrl, Authen } from "../api/EndPoint";
import { RequestHeader } from "../api/AxiosComponent";
import { Columns } from "./dummy-data/department-page";

const handleSubmit = async (values, setIsSubmiting) => {
    const response = await axios
        .post(DepartmentUrl.create, values, { headers: RequestHeader.checkAuthHeaders })
        .then(() => {
            console.log("Create success")
            setIsSubmiting(false)
        })
        .catch((error) => {
            if (error && error.response) {
                console.log("Error: ", error);
            }
        });
};

const handleGet = async (values, setReturnData, returnData, setPagination) => {
    console.log(values)
    const paramsValue = {
        searchKey: values === null || values.searchKey === null ? null : values.searchKey,
        page: values === null || values.page === null ? 1 : values.page,
        limit: values === null || values.limit === null ? 5 : values.limit,
        sortBy: values === null || values.sortBy === null ? "id" : values.sortBy,
        sortType: values === null || values.sortType === null ? "ASC" : values.sortType,
    } 
    const response = await axios
        .get(DepartmentUrl.get, {
            headers: RequestHeader.checkAuthHeaders,
            params: paramsValue
        })
        .then((res) => {
            console.log(res)
            var pagination = {
                page: res.data.data.page,
                size: res.data.data.size,
                totalPages: res.data.data.totalPages
            }
            var tableData = res.data.data.content.map((content) => {
                return {
                    id: content.id,
                    department: content.department,
                }
            })
            setReturnData(tableData)
            setPagination(pagination)

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

const checkPermission = async (setPermission) => {
    const response = await axios
        .post(Authen.checkPermission, RequestHeader.checkAuthHeaders)
        .then((response) => {
            if (response.data.code === 1) {
                setPermission(true);
            } else {
                setPermission(false);
            }
        })
        .catch((error) => {
            if (error && error.response) {
                console.log("Error: ", error);
                // setHasError(true);
            }
        });
};

function Department() {
    const [permission, setPermission] = useState(true);
    const [returnData, setReturnData] = useState([]);
    const [returnPagination, setPagination] = useState({});
    const [isSubmiting, setIsSubmiting] = useState(false);

    if (isSubmiting === false) {
        handleGet(null, setReturnData, returnData, setPagination)
        setIsSubmiting(true)
    }

    if (permission) {
        return (
            <div className="department-page container">
                <h2 className="page-title">Department</h2>
                <div className="layout-form">
                    <Formik
                        initialValues={initialValues}
                        validationSchema={DepartmentSchema}
                        onSubmit={(values, { setSubmitting }) => {
                            handleSubmit(values, setIsSubmiting);
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
                            <Form className="submit-form">
                                <div className="form-container">
                                    <div className="input-section label-mark">
                                        <TextField
                                            label={"Department Name"}
                                            name='department'
                                            type='text'
                                            placeholder='Type...'
                                        />
                                    </div>
                                </div>
                                <hr />
                                <div className="list-button">

                                    <button
                                        className={'btn btn-info'}
                                        type='reset'
                                    >
                                        Refresh
                                    </button>
                                    <button className={"btn btn-success"} type="submit">
                                        Save
                                    </button>
                                </div>
                            </Form>
                        )}
                    </Formik>
                </div>
                <div className="layout-table">
                    <EnhancedTable
                        columns={Columns}
                        rows={returnData}
                        hasEditedBtn={false}
                        hasDeletedBtn={false}
                        hasDisabledBtn={false}
                        totalPages={returnPagination.totalPages}
                    />
                </div>
            </div>
        );
    } else {
        return (
            <div>
                <p>You have no permission</p>
            </div>
        );
    }
}

export default Department;
