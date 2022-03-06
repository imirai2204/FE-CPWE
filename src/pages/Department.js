import React, { useContext } from "react";
import "../styles/style.scss";
import { Formik, Form } from "formik";
import { TextField } from "../components/UI/Form/TextField";
import { StickyHeadTable } from "../components/UI/Table/Table";
import { DepartmentSchema } from "../validation";
import axios from "axios";
import EditTableContext from "../store/edit-table-context";

function handleSubmit(values) {
    const body = {
        departmentName: values.departmentName,
    };

    axios
        .post(`http://localhost:3000/login`, body)
        .then((res) => {
            console.log(res);
            console.log(res.data);
            setTimeout(() => {
                alert("Login success");
            }, 400);
        })
        .catch((error) => {
            console.log(error);
            setTimeout(() => {
                alert(error);
            }, 400);
        });
}

const initialValues = {
    departmentName: "",
};

export const columns = [{ id: "department", label: "Department", minWidth: 170 }];

const data = [
    {
        department: "Infomation Technology Department",
    },
    {
        department: "Human Resources Department",
    },
    {
        department: "Economics Department",
    },
    {
        department: "English and Comparative Literature Department",
    },
    {
        department: "Mechanical Engineering Department",
    },
    {
        department: "History Department",
    },
    {
        department: "Mathematics Department",
    },
];

function Department() {
    const editTableCtx = useContext(EditTableContext);

    console.log(editTableCtx.searchFieldValue);

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
                                        value={localStorage.getItem("department")}
                                        //placeholder={editTableCtx.searchFieldValue}
                                    />
                                </div>
                            </div>
                            <hr />
                            <div className="list-button">
                                <button className={"btn btn-warning"} type="submit">
                                    Search
                                </button>
                                <button
                                    className={'btn btn-info'}
                                    type='reset'
                                    onClick={() => localStorage.removeItem("department")}
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
                <StickyHeadTable
                    columns={columns}
                    rows={data}
                    keys="Department"
                />
            </div>
        </div>
    );
}

export default Department;
