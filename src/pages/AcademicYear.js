import React, { useState } from "react";
import "../styles/style.scss";
import { ErrorMessage, Formik, Form } from "formik";
import { TextField } from "../components/UI/Form/TextField";
import { EnhancedTable } from "../components/UI/Table/Table";
import { AcademicYearSchema } from "../validation";
import axios from "axios";
import Select from "react-select";
import { YearOptions, Columns, Data } from "./dummy-data/years-page";
import { IdeaUrl, Authen } from "../api/EndPoint";
import { RequestHeader } from "../api/AxiosComponent";

const handleSubmit = async (values) => {
    var formData = new FormData();
    formData.append("yearId", values.yearId);
    formData.append("semester", values.semester);
    formData.append("startDate", values.startDate);
    formData.append("endDate", values.endDate);

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
    semester: "",
    startDate: "",
    endDate: "",
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
            <h2 className="page-title">Academic Year</h2>
            <div className="layout-form">
                <Formik
                    initialValues={initialValues}
                    validationSchema={AcademicYearSchema}
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
                                <div className="input-section label-mark">
                                    <TextField
                                        label={"Semester Name"}
                                        name='semester'
                                        type='text'
                                        placeholder='Semester Name...'
                                    />
                                </div>
                                <div className="layout-date">
                                    <div className="input-section label-mark time first">
                                        <TextField
                                            label={"Start Date"}
                                            name='startDate'
                                            type='date'
                                        />
                                    </div>
                                    <div className="input-section label-mark time second">
                                        <TextField
                                            label={"End Date"}
                                            name='endDate'
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
