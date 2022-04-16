import React, { useState, useEffect } from "react";
import "../styles/style.scss";
import { ErrorMessage, Formik, Form } from "formik";
import { TextField } from "../components/UI/Form/TextField";
import { EnhancedTable } from "../components/UI/Table/Table";
import { TopicSchema } from "../validation";
import Select from "react-select";
import { YearOptions } from "../components/Navbar/dropdown/DropdownItems";
import { ColumnsTopic } from "../components/UI/Table/TableItems";
import { TopicUrl, AcademicUrl, DepartmentUrl, Flag, Warn } from "../api/EndPoint";
import { convertDate, getFormattedDate } from "../function/library";
import { AxiosInstance } from "../api/AxiosClient";
import { useSelector } from "react-redux";
import ErrorMessagePopUp from "../components/UI/Modal/ErrorMessage";
import AuthorizationAPI from "../api/AuthorizationAPI";
import PageNotFound from "../404";

const handleSubmit = async (values, setIsSubmiting, setErrorData) => {
    await AxiosInstance.post(TopicUrl.create, values, {
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
    await AxiosInstance.get(TopicUrl.get, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        params: paramsValue,
    })
        .then((res) => {
            console.log(res);
            var pagination = {
                page: res.data.data.page,
                size: res.data.data.size,
                totalPages: res.data.data.totalPages,
            };
            var tableData = res.data.data.content.map((content) => {
                var startDate = getFormattedDate(convertDate(content.startDate));
                var closureDate = getFormattedDate(convertDate(content.closureDate));
                var finalDate = getFormattedDate(convertDate(content.finalDate));
                return {
                    id: content.id,
                    year: content.year,
                    semester: content.semester,
                    department: content.department,
                    topic: content.topic,
                    startDate: startDate,
                    closureDate: closureDate,
                    finalDate: finalDate,
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

const getSemester = async (values, setSemesterOption) => {
    const paramsValue = {
        year: values,
    };
    await AxiosInstance.get(AcademicUrl.getSemesterByYear, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        params: paramsValue,
    })
        .then((res) => {
            console.log(res);
            var semesterOption = res.data.data.map((data) => {
                return {
                    value: data.id,
                    label: data.semester,
                    key: data.id,
                };
            });
            // console.log(semesterOption)
            setSemesterOption(semesterOption);
        })
        .catch((error) => {
            if (error && error.response) {
                console.log("Error: ", error);
            }
        });
};

const getDepartment = async (values, setDepartmenOption) => {
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
            var departmentOption = res.data.data.content.map((content) => {
                return {
                    value: content.id,
                    label: content.department,
                    key: content.id,
                };
            });
            setDepartmenOption(departmentOption);
        })
        .catch((error) => {
            if (error && error.response) {
                console.log("Error: ", error);
            }
        });
};

const initialValues = {
    // year: 0,
    academicId: 0,
    departmentId: 0,
    topic: "",
    endDate: "",
    finalEndDate: "",
};

function Topic() {
    const [permission, setPermission] = useState(true);
    const [returnData, setReturnData] = useState([]);
    const [returnPagination, setPagination] = useState({});
    const [isSubmiting, setIsSubmiting] = useState(false);
    const [errorData, setErrorData] = useState({
        code: 1,
        message: "ok"
    });
    const [semesterOption, setSemesterOption] = useState([]);
    const [departmentOption, setDepartmentOption] = useState([]);
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
        handleGet(null, setReturnData, setPagination);
        getDepartment(null, setDepartmentOption);
        setIsSubmiting(true);
    }

    if (permission) {
        return (
            <div className='department-page container'>
                <h2 className='page-title'>Topic</h2>
                <div className='layout-form'>
                    <Formik
                        initialValues={initialValues}
                        validationSchema={TopicSchema}
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
                                    <div
                                        className='input-section label-mark'
                                        style={{ width: "45%" }}>
                                        <label className='label'>Year</label>
                                        <Select
                                            className='select'
                                            name='yearId'
                                            id='year'
                                            options={YearOptions}
                                            placeholder={"Select Year"}
                                            onChange={(selectOption) => {
                                                setFieldValue(
                                                    "yearId",
                                                    selectOption.value
                                                );
                                                getSemester(
                                                    selectOption.value,
                                                    setSemesterOption
                                                );
                                                // setIsTest(selectOption.value);
                                            }}
                                            onBlur={() => {
                                                handleBlur({ target: { name: "year" } });
                                            }}
                                        />
                                        <ErrorMessage
                                            component='div'
                                            name={"yearId"}
                                            className='error'
                                        />
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
                                                setFieldValue(
                                                    "academicId",
                                                    selectOption.value
                                                );
                                            }}
                                            onBlur={() => {
                                                handleBlur({
                                                    target: { name: "academicId" },
                                                });
                                            }}
                                        />
                                        <ErrorMessage
                                            component='div'
                                            name={"academicId"}
                                            className='error'
                                        />
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
                                                setFieldValue(
                                                    "departmentId",
                                                    selectOption.value
                                                );
                                            }}
                                            onBlur={() => {
                                                handleBlur({
                                                    target: { name: "department" },
                                                });
                                            }}
                                        />
                                        <ErrorMessage
                                            component='div'
                                            name={"departmentId"}
                                            className='error'
                                        />
                                    </div>
                                    <div className='input-section label-mark'>
                                        <TextField
                                            label={"Topic Name"}
                                            name='topic'
                                            type='text'
                                            placeholder='Topic Name...'
                                        />
                                    </div>
                                    <div className='layout-date'>
                                        <div className='input-section label-mark time first'>
                                            <TextField
                                                label={"Closure Date"}
                                                name='endDate'
                                                type='date'
                                            />
                                        </div>
                                        <div className='input-section label-mark time second'>
                                            <TextField
                                                label={"Final Closure Date"}
                                                name='finalEndDate'
                                                type='date'
                                            />
                                        </div>
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
                        columns={ColumnsTopic}
                        rows={returnData}
                        hasEditedBtn={false}
                        hasDeletedBtn={false}
                        hasDisabledBtn={false}
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

export default Topic;
