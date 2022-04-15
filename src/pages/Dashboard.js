import React, { useState, useEffect } from "react";
import "../styles/style.scss";
import { Formik, Form } from "formik";
import Select from "react-select";
import { YearOptions } from "../components/Navbar/dropdown/DropdownItems";
import { DepartmentUrl, TopicUrl, AcademicUrl } from "../api/EndPoint";
import { AxiosInstance } from "../api/AxiosClient";
import { useSelector } from "react-redux";
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
import CommentsDisabledOutlinedIcon from '@mui/icons-material/CommentsDisabledOutlined';
import LightbulbOutlinedIcon from '@mui/icons-material/LightbulbOutlined';
import PersonOffOutlinedIcon from '@mui/icons-material/PersonOffOutlined';
import { Bar, Doughnut } from "react-chartjs-2";
import Chart from 'chart.js/auto';

const getSemester = async (values, setSemesterOption) => {
    const paramsValue = {
        year: values,
    };
    await AxiosInstance.get(AcademicUrl.getSemesterByYear, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        params: paramsValue,
    })
        .then((res) => {
            var semesterOption = res.data.data.map((data) => {
                return {
                    value: data.id,
                    label: data.semester,
                    key: data.id,
                };
            });
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
        sortBy: values === null || values.sortBy === null ? "id" : values.sortBy,
        sortType: values === null || values.sortType === null ? "ASC" : values.sortType,
    };
    await AxiosInstance.get(DepartmentUrl.get, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        params: paramsValue,
    })
        .then((res) => {
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

const getTopic = async (values, setTopicOption) => {
    const paramsValue = {
        searchKey: values === null || values.searchKey === null ? "" : values.searchKey,
        page: values === null || values.page === null ? 1 : values.page,
        limit: values === null || values.limit === null ? 5 : values.limit,
        sortBy: values === null || values.sortBy === null ? "id" : values.sortBy,
        sortType: values === null || values.sortType === null ? "ASC" : values.sortType,
    };
    await AxiosInstance.get(TopicUrl.get, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        params: paramsValue,
    })
        .then((res) => {
            var topicOption = res.data.data.content.map((content) => {
                return {
                    value: content.id,
                    label: content.topic,
                    key: content.id,
                };
            });
            setTopicOption(topicOption);
        })
        .catch((error) => {
            if (error && error.response) {
                console.log("Error: ", error);
            }
        });
};

const initialValues = {
    year: "",
    academicId: 0,
    departmentId: 0,
    topicId: 0,
};

function Dashboard() {
    const userInfo = useSelector((state) => state.user.userInfo)
    const [semesterOption, setSemesterOption] = useState([]);
    const [departmentOption, setDepartmentOption] = useState([]);
    const [topicOption, setTopicOption] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    var departmentData = {
        searchKey: userInfo.userRole === "ADMIN" ? null : userInfo.departmentName,
        limit: 5,
        page: 1,
        sortBy: null,
        sortType: null,
    }

    useEffect(() => {
        if (isLoading) {
            getSemester(null, setSemesterOption);
            getDepartment(departmentData, setDepartmentOption);
            getTopic(null, setTopicOption);
            setIsLoading(!isLoading);
        }
    }, [isLoading])

    return (
        <div className="dashboard-page container">
            <h2 className="page-title">Dashboard</h2>
            <div className="layout-export">
                <div className="layout-form">
                    <Formik
                        initialValues={initialValues}
                        onSubmit={(values) => {
                            // handleSubmit(values);
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
                                <div className="layout-flex">
                                    <div className='input-section'>
                                        <label className='label'>Year</label>
                                        <Select
                                            className='select'
                                            name='year'
                                            id='year'
                                            options={YearOptions}
                                            placeholder={"Select Year"}
                                            onChange={(selectOption) => {
                                                setFieldValue(
                                                    "year",
                                                    selectOption.value
                                                );
                                                getSemester(
                                                    selectOption.value,
                                                    setSemesterOption
                                                );
                                            }}
                                        />
                                    </div>
                                    <div className='input-section'>
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
                                        />
                                    </div>
                                    <div className='input-section'>
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
                                        />
                                    </div>
                                    <div className='input-section'>
                                        <label className='label'>Topic</label>
                                        <Select
                                            className='select'
                                            name='topicId'
                                            id='topic'
                                            options={topicOption}
                                            placeholder={"Select Topic"}
                                            onChange={(selectOption) => {
                                                setFieldValue(
                                                    "topicId",
                                                    selectOption.value
                                                );
                                            }}
                                        />
                                    </div>
                                </div>
                                <div className="list-button">
                                    {userInfo.userRole === "ADMIN" ?
                                        <button className={"btn btn-export"} type='submit'>
                                            <FileDownloadOutlinedIcon className="icon" /> Export CSV
                                        </button> : <></>
                                    }
                                </div>
                            </Form>
                        )}
                    </Formik>
                </div>
            </div>
            <div className="layout-data">
                <div className="data-left left">
                    <div className="data left">
                        <div className="data-header">
                            <label className="data-title">Total ideas</label>
                            <div className="data-icon">
                                <LightbulbOutlinedIcon className="icon" />
                            </div>
                        </div>
                        <p className="data-body">5,265</p>
                    </div>
                    <div className="data right">
                        <div className="data-header">
                            <label className="data-title">Total ideas without comment</label>
                            <div className="data-icon">
                                <CommentsDisabledOutlinedIcon className="icon" />
                            </div>
                        </div>
                        <p className="data-body">312</p>
                    </div>
                </div>
                <div className="data-right right">
                    <div className="data left">
                        <div className="data-header">
                            <label className="data-title">Total anonymous ideas</label>
                            <div className="data-icon">
                                <PersonOffOutlinedIcon className="icon" />
                            </div>
                        </div>
                        <p className="data-body">50</p>
                    </div>
                    <div className="data right">
                        <div className="data-header">
                            <label className="data-title">Total anonymous comment</label>
                            <div className="data-icon">
                                <PersonOffOutlinedIcon className="icon" />
                            </div>
                        </div>
                        <p className="data-body">260</p>
                    </div>
                </div>
            </div>
            <div className="layout-chart">
                <div className="chart">
                    <Bar
                        data={{
                            labels: ['Department 1', 'Department 2', 'Department 3', 'Department 4', 'Department 5', 'Department 6'],
                            datasets: [
                                {
                                    label: 'total ideas of department',
                                    data: [12, 19, 63, 5, 2, 3],
                                    backgroundColor: [
                                        '#0052CC',
                                    ],
                                    borderColor: [
                                        '#0052CC',
                                    ],
                                },
                                {
                                    label: 'total ideas of comment',
                                    data: [6, 3, 18, 6, 5, 93],
                                    backgroundColor: [
                                        '#f02c2c',
                                    ],
                                    borderColor: [
                                        '#f02c2c',
                                    ],
                                },
                            ]
                        }}
                        options={{
                            legend: { display: false },
                            title: {
                                display: true,
                                text: "Bar chart of total ideas in each department"
                            },
                            scales: {
                                y: {
                                    beginAtZero: true
                                }
                            }
                        }}
                    />
                    <label className="chart-title">Bar chart of total ideas in each department</label>
                </div>

                <div className="chart">
                    <Doughnut
                        data={{
                            labels: ['Department 1', 'Department 2', 'Department 3', 'Department 4', 'Department 5', 'Department 6'],
                            datasets: [
                                {
                                    label: 'percentage idea of department',
                                    data: [12, 19, 63, 5, 2, 3],
                                    backgroundColor: [
                                        '#0052CC', '#f02c2c', '#FFF000', '#4FA800', '#5036C4', '#FCD2DD6E',
                                    ],
                                    borderColor: [
                                        '#0052CC', '#f02c2c', '#FFF000', '#4FA800', '#5036C4', '#FCD2DD6E',
                                    ],
                                },
                            ]
                        }}
                        options={{
                            legend: { display: false },
                            title: {
                                display: true,
                                text: "Doughnut chart of percentage idea of each department"
                            },
                            aspectRatio: 3,
                        }}
                    />
                    <label className="chart-title">Doughnut chart of percentage idea of each department</label>
                </div>

                <div className="chart">
                    <Bar
                        data={{
                            labels: ['Department 1', 'Department 2', 'Department 3', 'Department 4', 'Department 5', 'Department 6'],
                            datasets: [
                                {
                                    label: 'total contributors of department',
                                    data: [12, 19, 63, 5, 2, 3],
                                    backgroundColor: [
                                        '#0052CC',
                                    ],
                                    borderColor: [
                                        '#0052CC',
                                    ],
                                },
                            ]
                        }}
                        options={{
                            legend: { display: false },
                            title: {
                                display: true,
                                text: "Bar chart of total contributors in each department"
                            },
                            scales: {
                                y: {
                                    beginAtZero: true
                                }
                            }
                        }}
                    />
                    <label className="chart-title">Bar chart of total contributors in each department</label>
                </div>
            </div>
        </div>
    )
}

export default Dashboard;
