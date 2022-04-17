import React, { useState, useEffect, Fragment } from "react";
import "../styles/style.scss";
import { ErrorMessage, Formik, Form } from "formik";
import Select from "react-select";
import { DashboardSchema } from "../validation";
import { YearOptions } from "../components/Navbar/dropdown/DropdownItems";
import { DepartmentUrl, TopicUrl, AcademicUrl, IdeaUrl } from "../api/EndPoint";
import { AxiosInstance } from "../api/AxiosClient";
import { useSelector } from "react-redux";
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";
import CommentsDisabledOutlinedIcon from "@mui/icons-material/CommentsDisabledOutlined";
import LightbulbOutlinedIcon from "@mui/icons-material/LightbulbOutlined";
import PersonOffOutlinedIcon from "@mui/icons-material/PersonOffOutlined";
import { Bar, Doughnut } from "react-chartjs-2";
import Chart from "chart.js/auto";
import Moment from "react-moment";
import moment from "moment";
import randomColor from "randomcolor";

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
        sortType: values === null || values.sortType === null ? "DESC" : values.sortType,
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
        sortType: values === null || values.sortType === null ? "DESC" : values.sortType,
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

const handleFilter = async (values, setValueData) => {
    var paramsValue = {
        year: values.year,
        semester: values === null || values.academicId === 0 ? null : values.academicId,
        department: values === null || values.departmentId === 0 ? null : values.departmentId,
        topic: values === null || values.topicId === 0 ? null : values.topicId,
    };
    await AxiosInstance.get(IdeaUrl.dashboard, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        params: paramsValue,
    })
        .then((res) => {
            const responseData = res.data.data;
            const valueData = {
                anonymousComment: responseData.anonymousComment,
                anonymousIdea: responseData.anonymousIdea,
                ideaNoComment: responseData.ideaNoComment,
                totalIdea: responseData.totalIdea,
                firstBarChart: responseData.firstBarChart,
                pieChart: responseData.pieChart,
                secondBarChart: responseData.secondBarChart,
            };
            setValueData(valueData);
        })
        .catch((error) => {
            if (error && error.response) {
                console.log("Error: ", error);
            }
        });
};

const handleExport = async (values) => {
    var paramsValue = {
        year: values.year,
        semester: values === null || values.academicId === 0 ? null : values.academicId,
        department: values === null || values.departmentId === 0 ? null : values.departmentId,
        topic: values === null || values.topicId === 0 ? null : values.topicId,
    };
    await AxiosInstance.get(IdeaUrl.export, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}`, responseType: "blob" },
        params: paramsValue,
    })
        .then((res) => {
            var date = moment().format("DD_MM_YYYY_hh:mm:ss");
            var filename = "Report_" + date + ".csv";
            const url = window.URL.createObjectURL(new Blob([res.data]));
            const link = document.createElement("a");
            link.href = url;
            link.setAttribute("download", filename);
            document.body.appendChild(link);
            link.click();
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
    const userInfo = useSelector((state) => state.user.userInfo);
    const [semesterOption, setSemesterOption] = useState([]);
    const [departmentOption, setDepartmentOption] = useState([]);
    const [topicOption, setTopicOption] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isClickReport, setIsClickReport] = useState(false);
    const [barChartColor, setBarChartColor] = useState({
        firstBarChartColor: randomColor({
            luminosity: "light",
            hue: "random",
            alpha: 0.5,
        }),
        secondBarChartColor: randomColor({
            luminosity: "light",
            hue: "random",
            alpha: 0.5,
        }),
        pieChartColor: [
            randomColor({
                luminosity: "light",
                hue: "random",
                alpha: 0.5,
            }),
        ],
        contributorBarChartColor: randomColor({
            luminosity: "light",
            hue: "random",
            alpha: 0.5,
        }),
    });
    const [valueData, setValueData] = useState({
        anonymousComment: 0,
        anonymousIdea: 0,
        ideaNoComment: 0,
        totalIdea: 0,
        firstBarChart: {
            listComment: [0],
            listDept: ["N/A"],
            listIdea: [0],
        },
        pieChart: {
            listDept: ["N/A"],
            listValue: [100],
        },
        secondBarChart: {
            listDept: ["N/A"],
            userCount: [0],
        },
    });

    var departmentData = {
        searchKey: userInfo.userRole === "ADMIN" ? null : userInfo.departmentName,
        limit: 5,
        page: 1,
        sortBy: null,
        sortType: null,
    };

    useEffect(() => {
        if (isLoading) {
            getDepartment(departmentData, setDepartmentOption);
            getTopic(null, setTopicOption);
            setIsLoading(!isLoading);
        }
    }, [isLoading]);

    let pieColor = [];
    useEffect(() => {
        let index;
        if (valueData.pieChart.listDept.length > 1 && isClickReport) {
            for (index = 0; index < valueData.pieChart.listDept.length; index++) {
                var color = randomColor({
                    luminosity: "light",
                    hue: "random",
                    alpha: 0.5,
                });
                pieColor.push(color);
            }
            console.log(pieColor);
            setBarChartColor((prevState) => ({ ...prevState, pieChartColor: pieColor }));
            setIsClickReport(false);
        }
    }, [valueData.pieChart.listDept, isClickReport]);

    return (
        <div className='dashboard-page container'>
            <h2 className='page-title'>Dashboard</h2>
            <div className='layout-export'>
                <div className='layout-form'>
                    <Formik
                        initialValues={initialValues}
                        validationSchema={DashboardSchema}
                        onSubmit={(values) => {
                            handleFilter(values, setValueData);
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
                                <div className='layout-flex'>
                                    <div className='input-section'>
                                        <label className='label'>Year</label>
                                        <Select
                                            className='select'
                                            name='year'
                                            id='year'
                                            options={YearOptions}
                                            placeholder={"Select Year"}
                                            onChange={(selectOption) => {
                                                setFieldValue("year", selectOption.value);
                                                getSemester(selectOption.value, setSemesterOption);
                                            }}
                                        />
                                        <ErrorMessage
                                            component='div'
                                            name={"year"}
                                            className='error'
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
                                                setFieldValue("academicId", selectOption.value);
                                            }}
                                            maxMenuHeight={200}
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
                                                setFieldValue("departmentId", selectOption.value);
                                            }}
                                            maxMenuHeight={200}
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
                                                setFieldValue("topicId", selectOption.value);
                                            }}
                                            maxMenuHeight={200}
                                        />
                                    </div>
                                </div>
                                <div className='list-button'>
                                    {userInfo.userRole === "ADMIN" ? (
                                        <button
                                            className={"btn btn-export"}
                                            type='button'
                                            onClick={() => {
                                                handleExport(values);
                                            }}>
                                            <FileDownloadOutlinedIcon className='icon' /> Export CSV
                                        </button>
                                    ) : (
                                        <Fragment />
                                    )}
                                    <button
                                        className={"btn btn-success"}
                                        type='submit'
                                        onClick={() => {
                                            setIsClickReport(true);
                                            // handleClickReport();
                                        }}>
                                        Report
                                    </button>
                                </div>
                            </Form>
                        )}
                    </Formik>
                </div>
            </div>
            <div className='layout-data'>
                <div className='data-left left'>
                    <div className='data lt'>
                        <div className='data-header'>
                            <label className='data-title'>Total ideas</label>
                            <div className='data-icon' style={{backgroundColor: "#FFF9E5"}}>
                                <LightbulbOutlinedIcon style={{color: "#FFC20E"}} className='icon' />
                            </div>
                        </div>
                        <p className='data-body'>{valueData.totalIdea}</p>
                    </div>
                    <div className='data rt'>
                        <div className='data-header'>
                            <label className='data-title'>Total ideas without comment</label>
                            <div className='data-icon' style={{backgroundColor: "#E5F3FF"}}>
                                <CommentsDisabledOutlinedIcon style={{color: "#1890FF"}} className='icon' />
                            </div>
                        </div>
                        <p className='data-body'>{valueData.ideaNoComment}</p>
                    </div>
                </div>
                <div className='data-right right'>
                    <div className='data lt'>
                        <div className='data-header'>
                            <label className='data-title'>Total anonymous ideas</label>
                            <div className='data-icon' style={{backgroundColor: "#FDE8E8"}}>
                                <PersonOffOutlinedIcon style={{color: "#BE1128"}} className='icon' />
                            </div>
                        </div>
                        <p className='data-body'>{valueData.anonymousIdea}</p>
                    </div>
                    <div className='data rt'>
                        <div className='data-header'>
                            <label className='data-title'>Total anonymous comment</label>
                            <div className='data-icon' style={{backgroundColor: "#FFF0E5"}}>
                                <PersonOffOutlinedIcon style={{color: "#FF4500"}} className='icon' />
                            </div>
                        </div>
                        <p className='data-body'>{valueData.anonymousComment}</p>
                    </div>
                </div>
            </div>
            <div className='layout-chart'>
                <div className='chart'>
                    <Bar
                        data={{
                            labels: valueData.firstBarChart.listDept,
                            datasets: [
                                {
                                    label: "total ideas of department",
                                    data: valueData.firstBarChart.listIdea,
                                    backgroundColor: barChartColor.firstBarChartColor,
                                },
                                {
                                    label: "total comments of department",
                                    data: valueData.firstBarChart.listComment,
                                    backgroundColor: barChartColor.secondBarChartColor,
                                },
                            ],
                        }}
                        options={{
                            legend: { display: false },
                            title: {
                                display: true,
                                text: "Bar chart of total ideas in each department",
                            },
                            scales: {
                                y: {
                                    beginAtZero: true,
                                },
                            },
                        }}
                    />
                    <label className='chart-title'>
                        Bar chart of total ideas in each department
                    </label>
                </div>

                <div className='chart'>
                    <Doughnut
                        data={{
                            labels: valueData.pieChart.listDept,
                            datasets: [
                                {
                                    label: "percentage idea of department",
                                    data: valueData.pieChart.listValue,
                                    backgroundColor: barChartColor.pieChartColor,
                                },
                            ],
                        }}
                        options={{
                            legend: { display: false },
                            title: {
                                display: true,
                                text: "Doughnut chart of percentage idea of each department",
                            },
                            aspectRatio: 3,
                        }}
                    />
                    <label className='chart-title'>
                        Doughnut chart of percentage idea of each department
                    </label>
                </div>

                <div className='chart'>
                    <Bar
                        data={{
                            labels: valueData.secondBarChart.listDept,
                            datasets: [
                                {
                                    label: "total contributors of department",
                                    data: valueData.secondBarChart.userCount,
                                    backgroundColor: barChartColor.contributorBarChartColor,
                                },
                            ],
                        }}
                        options={{
                            legend: { display: false },
                            title: {
                                display: true,
                                text: "Bar chart of total contributors in each department",
                            },
                            scales: {
                                y: {
                                    beginAtZero: true,
                                },
                            },
                        }}
                    />
                    <label className='chart-title'>
                        Bar chart of total contributors in each department
                    </label>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;
