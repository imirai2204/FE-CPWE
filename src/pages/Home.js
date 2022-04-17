import React, { useState, useEffect } from "react";
import "../styles/style.scss";
import { EnhancedTable } from "../components/UI/Table/Table";
import { IdeaUrl, AcademicUrl, DepartmentUrl, TopicUrl, CategoryUrl } from "../api/EndPoint";
import { AxiosInstance } from "../api/AxiosClient";
import { useSelector } from "react-redux";
import { ColumnsIdea } from "../components/UI/Table/TableItems"
import Select from "react-select";
import { SortOptions } from "../components/Navbar/dropdown/DropdownItems";

const handleGet = async (values, setReturnData, setPagination) => {
    var paramsValue = {
        searchKey: values === null || values.searchKey === null ? null : values.searchKey,
        departmentId: values === null || values.departmentId === null ? null : values.departmentId,
        academicId: values === null || values.academicId === null ? null : values.academicId,
        topicId: values === null || values.topicId === null ? null : values.topicId,
        categoryId: values === null || values.categoryId === null ? null : values.categoryId,
        page: values === null || values.page === null ? 1 : values.page,
        limit: values === null || values.limit === null ? 5 : values.limit,
        sort: values === null || values.sort === null ? 1 : values.sort,
    }
    await AxiosInstance.get(IdeaUrl.getList, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        params: paramsValue
    })
        .then((res) => {
            // console.log(res)
            var pagination = {
                page: res.data.data.page,
                size: res.data.data.size,
                totalPages: res.data.data.totalPages,
            };
            var tableData = res.data.data.content.map((item) => {
                return{
                    topic: item.topic,
                    category: item.category,
                    title: item.ideaTitle,
                    author: item.createdUser,
                    url: "/idea-detail/" + item.id,
                }           
            })
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
        searchKey: values === null || values.searchKey === null ? null : values.searchKey,
        page: values === null || values.page === null ? 1 : values.page,
        limit: values === null || values.limit === null ? 100 : values.limit,
        sortBy: values === null || values.sortBy === null ? "createdDate" : values.sortBy,
        sortType: values === null || values.sortType === null ? "DESC" : values.sortType,
    };
    await AxiosInstance.get(AcademicUrl.get, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        params: paramsValue,
    })
        .then((res) => {
            // console.log(res);
            var semesterOption = res.data.data.content.map((data) => {
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
        limit: values === null || values.limit === null ? 100 : values.limit,
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

const getTopic = async (values, setTopicOption) => {
    const paramsValue = {
        searchKey: values === null || values.searchKey === null ? "" : values.searchKey,
        page: values === null || values.page === null ? 1 : values.page,
        limit: values === null || values.limit === null ? 100 : values.limit,
        sortBy: values === null || values.sortBy === null ? "createdDate" : values.sortBy,
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

const getCategory = async (values, setCategoryOption) => {
    const paramsValue = {
        searchKey: values === null || values.searchKey === null ? null : values.searchKey,
        page: values === null || values.page === null ? 1 : values.page,
        limit: values === null || values.limit === null ? 5 : values.limit,
        sortBy: values === null || values.sortBy === null ? "createdDate" : values.sortBy,
        sortType: values === null || values.sortType === null ? "DESC" : values.sortType,
        topicId: values === null || values.topicId === null ? null : values.topicId,
    };
    await AxiosInstance.get(CategoryUrl.get, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        params: paramsValue,
    })
        .then((res) => {
            var categoryOption = res.data.data.content.map((content) => {
                return {
                    value: content.id,
                    label: content.category,
                    key: content.id,
                };
            });
            setCategoryOption(categoryOption);
        })
        .catch((error) => {
            if (error && error.response) {
                console.log("Error: ", error);
            }
        });
};

function Home() {
    const userInfo = useSelector((state) => state.user.userInfo)
    const [returnData, setReturnData] = useState([]);
    const [returnPagination, setPagination] = useState({});
    const currentPage = useSelector((state) => state.table.page);
    const currentLimit = useSelector((state) => state.table.rowsPerPage);
    const [isLoading, setIsLoading] = useState(true);
    const [semesterOption, setSemesterOption] = useState([]);
    const [departmentOption, setDepartmentOption] = useState([]);
    const [topicOption, setTopicOption] = useState([]);
    const [categoryOption, setCategoryOption] = useState([]);
    const [semesterFilter, setSemesterFilter] = useState(null);
    const [departmentFilter, setDepartmentFilter] = useState(null);
    const [topicFilter, setTopicFilter] = useState(null);
    const [categoryFilter, setCategoryFilter] = useState(null);
    const [sortTable, setSortTable] = useState(1);

    var tableDatas = {
        searchKey: null,
        departmentId: departmentFilter,
        academicId: semesterFilter,
        topicId: topicFilter,
        categoryId: categoryFilter,
        page: currentPage,
        limit: currentLimit,
        sort: sortTable,
    }

    useEffect(() => {
        if (isLoading) {
            handleGet(null, setReturnData, setPagination);
            getSemester(null, setSemesterOption);
            getDepartment(null, setDepartmentOption);
            getTopic(null, setTopicOption);
            getCategory(null, setCategoryOption);
            setIsLoading(!isLoading);
        }
    }, [isLoading])

    useEffect(() => {
        console.log("re render get home")
        handleGet(tableDatas, setReturnData, setPagination);
    }, [departmentFilter, 
        semesterFilter, 
        topicFilter, 
        categoryFilter, 
        currentPage, 
        currentLimit, 
        sortTable])

    return (
        <div className='home-page container'>
            <div>
                <img
                    className="banner-img"
                    src="https://login.gre.ac.uk/adfs/portal/illustration/illustration.jpg?id=E59222772F7DA10A27598E8B24D23319BF6C4E5B715402648EA5FFA75EE1C337"
                    alt="banner"
                />
            </div>
            <h2 className='page-title'>Idea List</h2>
            <div className="sort-list">
                {userInfo.userRole === "ADMIN" &&
                    <>
                        <Select
                            className='select'
                            name='academicId'
                            id='academicId'
                            options={semesterOption}
                            placeholder={"Semester"}
                            onChange={(selectOption) => {
                                setSemesterFilter(selectOption.value)
                            }}
                            menuPortalTarget={document.body}
                            styles={{
                                menuPortal: (base) => ({
                                    ...base,
                                    zIndex: 9999,
                                }),
                                menu: (base) => ({
                                    ...base,
                                    fontSize: "15px",
                                    color: "#707070",
                                }),
                            }}
                            maxMenuHeight={200}
                        />
                        <Select
                            className='select'
                            name='departmentId'
                            id='departmentId'
                            options={departmentOption}
                            placeholder={"Department"}
                            onChange={(selectOption) => {
                                setDepartmentFilter(selectOption.value)
                            }}
                            menuPortalTarget={document.body}
                            styles={{
                                menuPortal: (base) => ({
                                    ...base,
                                    zIndex: 9999,
                                }),
                                menu: (base) => ({
                                    ...base,
                                    fontSize: "15px",
                                    color: "#707070",
                                }),
                            }}
                            maxMenuHeight={200}
                        />
                    </>
                }
                <Select
                    className='select'
                    name='topicId'
                    id='topic'
                    options={topicOption}
                    placeholder={"Topic"}
                    onChange={(selectOption) => {
                        setTopicFilter(selectOption.value)
                    }}
                    menuPortalTarget={document.body}
                    styles={{
                        menuPortal: (base) => ({
                            ...base,
                            zIndex: 9999,
                        }),
                        menu: (base) => ({
                            ...base,
                            fontSize: "15px",
                            color: "#707070",
                        }),
                    }}
                    maxMenuHeight={200}
                />
                <Select
                    className='select'
                    name='tag'
                    id='tag'
                    options={categoryOption}
                    placeholder={"Tag"}
                    onChange={(selectOption) => {
                        setCategoryFilter(selectOption.value)
                    }}
                    menuPortalTarget={document.body}
                    styles={{
                        menuPortal: (base) => ({
                            ...base,
                            zIndex: 9999,
                        }),
                        menu: (base) => ({
                            ...base,
                            fontSize: "15px",
                            color: "#707070",
                        }),
                    }}
                    maxMenuHeight={200}
                />
                <Select
                    className='select select-sort'
                    name='sortType'
                    id='sortType'
                    options={SortOptions}
                    defaultValue={SortOptions[0]}
                    placeholder={"Sort"}
                    onChange={(selectOption) => {
                        setSortTable(selectOption.value)
                    }}
                    menuPortalTarget={document.body}
                    styles={{
                        menuPortal: (base) => ({
                            ...base,
                            zIndex: 9999,
                        }),
                        menu: (base) => ({
                            ...base,
                            fontSize: "15px",
                            color: "#707070",
                        }),
                    }}
                />
            </div>
            <div className='layout-table'>
                <EnhancedTable
                    columns={ColumnsIdea}
                    rows={returnData}
                    totalPages={returnPagination.totalPages}
                />
            </div>
        </div>
    )
}

export default Home