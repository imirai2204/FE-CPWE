import React, { useState } from "react";
import "../styles/style.scss";
import { ErrorMessage, Formik, Form } from "formik";
import { TextField } from "../components/UI/Form/TextField";
import { EnhancedTable } from "../components/UI/Table/Table";
import { UserSchema } from "../validation";
import axios from "axios";
import Select from "react-select";
import { Columns, Data } from "./dummy-data/topic-page";
import { Departments, UserRole, Gender } from "../components/Navbar/dropdown/DropdownItems";
import { IdeaUrl, Authen } from "../api/EndPoint";
import { RequestHeader } from "../api/AxiosComponent";

const handleSubmit = async (values) => {
    var formData = new FormData();
    formData.append("firstname", values.firstname);
    formData.append("lastname", values.lastname);
    formData.append("address", values.address);
    formData.append("gender", values.gender);
    formData.append("email", values.email);
    formData.append("phone", values.phone);
    formData.append("departmentId", values.departmentId);
    formData.append("userRole", values.userRole);

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
    firstname: "",
    lastname: "",
    address: "",
    gender: 0,
    email: "",
    phone: "",
    departmentId: 0,
    userRole: 0,
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

function ManageUser() {
    const [permission, setPermission] = useState(true);

    if (permission) {
        return (<div className="manageUser-page container">
            <h2 className="page-title">Manage User</h2>
            <div className="layout-form">
                <Formik
                    initialValues={initialValues}
                    validationSchema={UserSchema}
                    onSubmit={(values, { setSubmitting }) => {
                        handleSubmit(values);
                        console.log(values);
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
                                <div className="user-form">
                                    <div className="layout-left">
                                        <div className="input-section label-mark">
                                            <TextField
                                                label={"First Name"}
                                                name='firstname'
                                                type='text'
                                                placeholder='First Name...'
                                            />
                                        </div>
                                        <div className="input-section">
                                            <TextField
                                                label={"Address"}
                                                name='address'
                                                type='text'
                                                placeholder='Address...'
                                            />
                                        </div>
                                        <div className="input-section label-mark">
                                            <TextField
                                                label={"Email"}
                                                name='email'
                                                type='email'
                                                placeholder='Email...'
                                            />
                                        </div>
                                        <div className="input-section">
                                            <TextField
                                                label={"Phone"}
                                                name='phone'
                                                type='text'
                                                placeholder='Phone...'
                                            />
                                        </div>
                                    </div>
                                    <div className="layout-right">
                                        <div className="input-section label-mark">
                                            <TextField
                                                label={"Last Name"}
                                                name='lastname'
                                                type='text'
                                                placeholder='Last Name...'
                                            />
                                        </div>
                                        <div className='input-section'>
                                            <label className='label'>Gender</label>
                                            <Select
                                                className='select'
                                                name='gender'
                                                id='gender'
                                                options={Gender}
                                                placeholder={"Select Gender"}
                                                onChange={(selectOption) => {
                                                    setFieldValue("gender", selectOption.value);
                                                }}
                                                onBlur={() => {
                                                    handleBlur({ target: { name: "gender" } });
                                                }}
                                            />
                                            <ErrorMessage component='div' name={"gender"} className='error' />
                                        </div>
                                    </div>
                                </div>
                                <hr />
                                <div className="user-form">
                                    <div className="layout-left">
                                        <div className='input-section label-mark'>
                                            <label className='label'>Department</label>
                                            <Select
                                                className='select'
                                                name='departmentId'
                                                id='department'
                                                options={Departments}
                                                placeholder={"Select Department"}
                                                onChange={(selectOption) => {
                                                    setFieldValue("departmentId", selectOption.value);
                                                }}
                                                onBlur={() => {
                                                    handleBlur({ target: { name: "department" } });
                                                }}
                                            />
                                            <ErrorMessage component='div' name={"departmentId"} className='error' />
                                        </div>
                                    </div>
                                    <div className="layout-right">
                                        <div className='input-section label-mark'>
                                            <label className='label'>User Role</label>
                                            <Select
                                                className='select'
                                                name='userRole'
                                                id='userRole'
                                                options={UserRole}
                                                placeholder={"Select User Role"}
                                                onChange={(selectOption) => {
                                                    setFieldValue("userRole", selectOption.value);
                                                }}
                                                onBlur={() => {
                                                    handleBlur({ target: { name: "userRole" } });
                                                }}
                                            />
                                            <ErrorMessage component='div' name={"userRole"} className='error' />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <hr />
                            <div className="list-button">
                                {/* <button className={"btn btn-warning"} type="submit">
                                Search
                            </button> */}
                                <button className={'btn btn-info'} type='reset'>
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
                    rows={Data}
                    hasEditedBtn={false}
                    hasDeletedBtn={true}
                    hasDisabledBtn={true}
                />
            </div>
        </div>
        )
    } else {
        return (
            <div>
                <p>You have no permission</p>
            </div>
        );
    }
}

export default ManageUser;
