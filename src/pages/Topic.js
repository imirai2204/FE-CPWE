import React, { useState } from "react";
import "../styles/style.scss";
import { ErrorMessage, Formik, Form } from "formik";
import { TextField } from "../components/UI/Form/TextField";
import { EnhancedTable } from "../components/UI/Table/Table";
import { TopicSchema } from "../validation";
import axios from "axios";
import Select from "react-select";
import { YearOptions } from "./dummy-data/years-page";
import { SemesterOptions, Columns, Data } from "./dummy-data/topic-page";
import { Departments } from "../components/Navbar/dropdown/DropdownItems";
import { IdeaUrl, Authen } from "../api/EndPoint";
import { RequestHeader } from "../api/AxiosComponent";

const handleSubmit = async (values) => {
    var formData = new FormData();
    formData.append("yearId", values.yearId);
    formData.append("semesterId", values.semesterId);
    formData.append("departmentId", values.departmentId);
    formData.append("topic", values.topic);
    formData.append("closureDate", values.closureDate);
    formData.append("finalDate", values.finalDate);

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
    yearId: 0,
    semesterId: 0,
    departmentId: 0,
    topic: "",
    closureDate: "",
    finalDate: "",
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

function AcademicYear() {
    const [permission, setPermission] = useState(true);

    if (permission) {
        return (<div className="department-page container">
            <h2 className="page-title">Topic</h2>
            <div className="layout-form">
                <Formik
                    initialValues={initialValues}
                    validationSchema={TopicSchema}
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
                                <div
                                    className='input-section label-mark'
                                    style={{ width: "45%" }}
                                >
                                    <label className='label'>Year</label>
                                    <Select
                                        className='select'
                                        name='yearId'
                                        id='year'
                                        options={YearOptions}
                                        placeholder={"Select Year"}
                                        onChange={(selectOption) => {
                                            setFieldValue("yearId", selectOption.value);
                                        }}
                                        onBlur={() => {
                                            handleBlur({ target: { name: "year" } });
                                        }}
                                    />
                                    <ErrorMessage component='div' name={"yearId"} className='error' />
                                </div>
                                <div className='input-section label-mark'>
                                    <label className='label'>Semester</label>
                                    <Select
                                        className='select'
                                        name='semesterId'
                                        id='semester'
                                        options={SemesterOptions}
                                        placeholder={"Select Semester"}
                                        onChange={(selectOption) => {
                                            setFieldValue("semesterId", selectOption.value);
                                        }}
                                        onBlur={() => {
                                            handleBlur({ target: { name: "semester" } });
                                        }}
                                    />
                                    <ErrorMessage component='div' name={"semesterId"} className='error' />
                                </div>
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
                                <div className="input-section label-mark">
                                    <TextField
                                        label={"Topic Name"}
                                        name='topic'
                                        type='text'
                                        placeholder='Topic Name...'
                                    />
                                </div>
                                <div className="layout-date">
                                    <div className="input-section label-mark time first">
                                        <TextField
                                            label={"Closure Date"}
                                            name='closureDate'
                                            type='date'
                                        />
                                    </div>
                                    <div className="input-section label-mark time second">
                                        <TextField
                                            label={"Final Closure Date"}
                                            name='finalDate'
                                            type='date'
                                        />
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

export default AcademicYear;
