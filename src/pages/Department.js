import React, { useState } from "react";
import "../styles/style.scss";
import { Formik, Form } from "formik";
import { TextField } from "../components/UI/Form/TextField";
import { EnhancedTable } from "../components/UI/Table/Table";
import { DepartmentSchema } from "../validation";
import axios from "axios";
import { IdeaUrl, Authen } from "../api/EndPoint";
import { RequestHeader } from "../api/AxiosComponent";

const handleSubmit = async (values) => {
    var formData = new FormData();
    formData.append("departmentName", values.departmentName);

    const response = await axios
        .post(IdeaUrl.create, formData, { headers: RequestHeader.checkAuthHeaders })
        .then(() => {
            console.log("Create success")
        })
        .catch((error) => {
            if (error && error.response) {
                console.log("Error: ", error);
            }
        });
};

const initialValues = {
    departmentName: "",
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

export const columns = [
    { id: "id", label: "ID", width: "5%", align: "center", style: { left: "13px" } },
    { id: "department", label: "Department Name", width: "50%", align: "left" },
];

const data = [
    {
        id: 1,
        department: "Information Technology Department"
    },
    {
        id: 2,
        department: "Human Resources Department"
    },
    {
        id: 3,
        department: "Economics Department"
    },
    {
        id: 4,
        department: "English and Comparative Literature Department"
    },
    {
        id: 5,
        department: "Mechanical Engineering Department"
    },
    {
        id: 6,
        department: "History Department"
    },
    {
        id: 7,
        department: "Mathematics Department"
    },
    {
        id: 8,
        department: "English and Comparative Literature Department"
    },
    {
        id: 9,
        department: "Mechanical Engineering Department"
    },
    {
        id: 10,
        department: "History Department"
    },
    {
        id: 11,
        department: "Mathematics Department"
    },
];

function Department() {
    const [permission, setPermission] = useState(true);

    if (permission) {
        return (
            <div className="department-page container">
                <h2 className="page-title">Department</h2>
                <div className="layout-form">
                    <Formik
                        initialValues={initialValues}
                        validationSchema={DepartmentSchema}
                        onSubmit={(values, { setSubmitting }) => {
                            handleSubmit(values);
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
                                            name='departmentName'
                                            type='text'
                                            placeholder='Type...'
                                        />
                                    </div>
                                </div>
                                <hr />
                                <div className="list-button">
                                    <button className={"btn btn-warning"} type="button">
                                        Search
                                    </button>
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
                        columns={columns}
                        rows={data}
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
