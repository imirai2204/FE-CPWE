import React, { useState, useEffect } from "react";
import "../styles/style.scss";
import { ErrorMessage, Formik, Form } from "formik";
import { TextField } from "../components/UI/Form/TextField";
import { EnhancedTable } from "../components/UI/Table/Table";
import { TopicSchema } from "../validation";
import Select from "react-select";
import { YearOptions } from "./dummy-data/years-page";
import { Columns } from "./dummy-data/topic-page";
import { TopicUrl, Authen, AcademicUrl, DepartmentUrl } from "../api/EndPoint";
import { convertDate, getFormattedDate } from "../function/library";
import { AxiosInstance, requestHeader } from "../api/AxiosClient";
import { useSelector } from "react-redux";

const handleSubmit = async (values, setIsSubmiting) => {
    await AxiosInstance
        .post(TopicUrl.create, values, { headers: requestHeader.checkAuth })
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
    const paramsValue = {
        searchKey: values === null || values.searchKey === null ? null : values.searchKey,
        page: values === null || values.page === null ? 1 : values.page,
        limit: values === null || values.limit === null ? 5 : values.limit,
        sortBy: values === null || values.sortBy === null ? "id" : values.sortBy,
        sortType: values === null || values.sortType === null ? "ASC" : values.sortType,
    }
    await AxiosInstance
        .get(TopicUrl.get, {
            headers: requestHeader.checkAuth,
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
                var startDate = getFormattedDate(convertDate(content.startDate))
                var closureDate = getFormattedDate(convertDate(content.closureDate))
                var finalDate = getFormattedDate(convertDate(content.finalDate))
                return {
                    id: content.id,
                    year: content.year,
                    semester: content.semester,
                    department: content.department,
                    topic: content.topic,
                    startDate: startDate,
                    closureDate: closureDate,
                    finalDate: finalDate
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

const getSemester = async (values, setSemesterOption) => {
    const paramsValue = {
        year: values,
    }
    await AxiosInstance
        .get(AcademicUrl.getSemesterByYear, {
            headers: requestHeader.checkAuth,
            params: paramsValue
        })
        .then((res) => {
            console.log(res)
            var semesterOption = res.data.data.map((data) => {
                return {
                    value: data.id,
                    label: data.semester,
                    key: data.id,
                }
            })
            // console.log(semesterOption)
            setSemesterOption(semesterOption)
        })
        .catch((error) => {
            if (error && error.response) {
                console.log("Error: ", error);
            }
        });
}

const getDepartment = async (values, setDepartmenOption) => {
    const paramsValue = {
        searchKey: values === null || values.searchKey === null ? null : values.searchKey,
        page: values === null || values.page === null ? 1 : values.page,
        limit: values === null || values.limit === null ? 5 : values.limit,
        sortBy: values === null || values.sortBy === null ? "id" : values.sortBy,
        sortType: values === null || values.sortType === null ? "ASC" : values.sortType,
    } 
    await AxiosInstance
        .get(DepartmentUrl.get, {
            headers: requestHeader.checkAuth,
            params: paramsValue
        })
        .then((res) => {
            // console.log(res)
            var departmentOption = res.data.data.content.map((content) => {
                return {
                    value: content.id,
                    label: content.department,
                    key: content.id,
                }
            })
            setDepartmenOption(departmentOption)
        })
        .catch((error) => {
            if (error && error.response) {
                console.log("Error: ", error);
            }
        });
}

const initialValues = {
    // year: 0,
    academicId: 0,
    departmentId: 0,
    topic: "",
    endDate: "",
    finalEndDate: "",
};

const checkPermission = async (setPermission) => {
    await AxiosInstance
        .post(Authen.checkPermission, requestHeader.checkAuth)
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

function Topic() {
    const [permission, setPermission] = useState(true);
    const [returnData, setReturnData] = useState([]);
    const [returnPagination, setPagination] = useState({});
    const [isSubmiting, setIsSubmiting] = useState(false);
    const [semesterOption, setSemesterOption] = useState([]);
    const [departmentOption, setDepartmentOption] = useState([]);
    const tableAttr = useSelector((state) => state.table);

    const tableDatas = {
        searchKey: tableAttr.searchText,
        limit: tableAttr.rowsPerPage,
        page: tableAttr.page,
        sortBy: null,
        sortType: null,
    };

    useEffect(() => {
        handleGet(tableDatas, setReturnData, returnData, setPagination);
    }, [tableDatas]);

    if (isSubmiting === false) {
        handleGet(null, setReturnData, returnData, setPagination)
        getDepartment(null, setDepartmentOption)
        setIsSubmiting(true)
    }

    if (permission) {
        return (<div className="department-page container">
            <h2 className="page-title">Topic</h2>
            <div className="layout-form">
                <Formik
                    initialValues={initialValues}
                    validationSchema={TopicSchema}
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
                                        name='yearId'
                                        id='year'
                                        options={YearOptions}
                                        placeholder={"Select Year"}
                                        onChange={(selectOption) => {
                                            setFieldValue("yearId", selectOption.value);
                                            getSemester(selectOption.value, setSemesterOption);
                                            // setIsTest(selectOption.value);
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
                                        name='academicId'
                                        id='academicId'
                                        options={semesterOption}
                                        placeholder={"Select Semester"}
                                        onChange={(selectOption) => {
                                            setFieldValue("academicId", selectOption.value);
                                        }}
                                        onBlur={() => {
                                            handleBlur({ target: { name: "academicId" } });
                                        }}
                                    />
                                    <ErrorMessage component='div' name={"academicId"} className='error' />
                                </div>
                                <div className='input-section label-mark'>
                                    <label className='label'>Department</label>
                                    <Select
                                        className='select'
                                        name='departmentId'
                                        id='departmentId'
                                        options={departmentOption}
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
                                            name='endDate'
                                            type='date'
                                        />
                                    </div>
                                    <div className="input-section label-mark time second">
                                        <TextField
                                            label={"Final Closure Date"}
                                            name='finalEndDate'
                                            type='date'
                                        />
                                    </div>
                                </div>
                            </div>
                            <hr />
                            <div className="list-button">
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
                    totalPages={returnPagination.totalPages}
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

export default Topic;
