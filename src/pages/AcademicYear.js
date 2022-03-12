import React, { useState, useEffect } from "react";
import "../styles/style.scss";
import { ErrorMessage, Formik, Form } from "formik";
import { TextField } from "../components/UI/Form/TextField";
import { EnhancedTable } from "../components/UI/Table/Table";
import { AcademicYearSchema } from "../validation";
import axios from "axios";
import Select from "react-select";
import { YearOptions, Columns, Data } from "./dummy-data/years-page";
import { AcademicUrl, Authen, BASE_URL } from "../api/EndPoint";
import { RequestHeader } from "../api/AxiosComponent";

const handleSubmit = async (values, setIsSubmiting) => {
    const response = await axios
        .post(AcademicUrl.create, values, { headers: RequestHeader.checkAuthHeaders })
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

const handleGet = async (values, setReturnData, returnData) => {
    const response = await axios
        .get(AcademicUrl.get, { 
            headers: RequestHeader.checkAuthHeaders,
            params: {
                searchKey: null,
                page: 1,
                limit: 15,
                sortBy: "id",
                sortType: "ASC",
            }
         })
        .then((res) => {
            var data = res.data.data.content.map((content) => {
                return {
                    id: content.id,
                    year: content.year,
                    semester: content.semester,
                    startDate: content.startDate,
                    endDate: content.endDate
                }
            } )
            setReturnData(data)
        })
        .catch((error) => {
            if (error && error.response) {
                console.log("Error: ", error);
            }
        });
};

const initialValues = {
    year: "",
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
    const [returnData, setReturnData] = useState([]);
    const [isSubmiting, setIsSubmiting] = useState(false)

    if (isSubmiting == false) {
        handleGet(null, setReturnData, returnData)
        setIsSubmiting(true)
    }
    // useEffect(()=>{handleGet(null, setReturnData, returnData)},[handleGet, isSubmiting])

    // handleGet(null, setReturnData, returnData)
    // console.log(returnData)

    // const {id, year, semester, startDate, endDate, ...response} = handleGet();

    // useEffect(()=>{
    //     setTableData(id, year, semester, startDate, endDate)
    // }, [handleGet])

    // console.log(tableData)

    if (permission) {
        return (<div className="department-page container">
            <h2 className="page-title">Academic Year</h2>
            <div className="layout-form">
                <Formik
                    initialValues={initialValues}
                    validationSchema={AcademicYearSchema}
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
                                <div
                                    className='input-section label-mark'
                                    style={{ width: "45%" }}
                                >
                                    <label className='label'>Year</label>
                                    <Select
                                        className='select'
                                        name='year'
                                        id='year'
                                        options={YearOptions}
                                        placeholder={"Select Year"}
                                        onChange={(selectOption) => {
                                            setFieldValue("year", selectOption.value);
                                        }}
                                        onBlur={() => {
                                            handleBlur({ target: { name: "year" } });
                                        }}
                                    />
                                    <ErrorMessage component='div' name={"year"} className='error' />
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
                    rows={returnData}
                    hasEditedBtn={false}
                    hasDeletedBtn={false}
                    hasDisabledBtn={false}
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
