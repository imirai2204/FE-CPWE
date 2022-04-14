import React, { useState, useEffect } from "react";
import "../styles/style.scss";
import { EnhancedTable } from "../components/UI/Table/Table";
import { IdeaUrl, AcademicUrl, DepartmentUrl, TopicUrl, CategoryUrl } from "../api/EndPoint";
import { AxiosInstance } from "../api/AxiosClient";
import { useSelector } from "react-redux";
import { ColumnsIdea } from "../components/UI/Table/TableItems"
import Select from "react-select";
import { SortOptions } from "../components/Navbar/dropdown/DropdownItems";

import { Link } from "react-router-dom";

// const handleGet = async (setIdeaDetail, setListDocument, setListImage) => {
//     await AxiosInstance.get(IdeaUrl.get, {
//         headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
//     })
//         .then((res) => {
//             var data = res.data.data;
//             var createDate = getFormattedDate(convertDate(data.createdDate));
//             var listImage = data.listAttachment.filter((item) => {
//                 if (item.picture === 1) {
//                     return item
//                 }
//             })
//             var listDocument = data.listAttachment.filter((item) => {
//                 if (item.picture === 0) {
//                     return item
//                 }
//             })
//             var ideaDetail = {
//                 title: data.title,
//                 description: data.content,
//                 createDate: createDate,
//                 createdUser: data.createdUser,
//                 isAnonymous: data.isAnonymous,
//                 category: data.category,
//                 topic: data.topic,
//             }
//             setIdeaDetail(ideaDetail)
//             setListDocument(listDocument)
//             setListImage(listImage)
//         })
//         .catch((error) => {
//             if (error && error.response) {
//                 console.log("Error: ", error);
//             }
//         });
// };

const getSemester = async (values, setSemesterOption) => {
    const paramsValue = {
        searchKey: values === null || values.searchKey === null ? null : values.searchKey,
        page: values === null || values.page === null ? 1 : values.page,
        limit: values === null || values.limit === null ? 5 : values.limit,
        sortBy: values === null || values.sortBy === null ? "id" : values.sortBy,
        sortType: values === null || values.sortType === null ? "ASC" : values.sortType,
    };
    await AxiosInstance.get(AcademicUrl.get, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        params: paramsValue,
    })
        .then((res) => {
            console.log(res);
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
        limit: values === null || values.limit === null ? 5 : values.limit,
        sortBy: values === null || values.sortBy === null ? "id" : values.sortBy,
        sortType: values === null || values.sortType === null ? "ASC" : values.sortType,
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

const getCategory = async (values, setCategoryOption) => {
    const paramsValue = {
        searchKey: values === null || values.searchKey === null ? null : values.searchKey,
        page: values === null || values.page === null ? 1 : values.page,
        limit: values === null || values.limit === null ? 5 : values.limit,
        sortBy: values === null || values.sortBy === null ? "id" : values.sortBy,
        sortType: values === null || values.sortType === null ? "ASC" : values.sortType,
    };
    await AxiosInstance.get(CategoryUrl.get, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        params: paramsValue,
    })
        .then((res) => {
            var categoryOption = res.data.data.content.map((content) => {
                return {
                    value: content.id,
                    label: content.topic,
                    key: content.category,
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

const handleChangeSort = (value, setSortBy, setSortType) => {
    switch (value) {
        case "mostlike":
            setSortBy("like")
            setSortType("desc")
            break;
        case "mostdislike":
            setSortBy("dislike")
            setSortType("desc")
            break;
        case "mostview":
            setSortBy("view")
            setSortType("desc")
            break;
        case "lastidea":
            setSortBy("createDate")
            setSortType("desc")
            break;
        case "lastcomment":
            setSortBy("createDate")
            setSortType("desc")
            break;
        default:
            console.log("No Value")
            break;
    }
}

function handleChangeFilter(value, setFilterBy) {
    setFilterBy(value);
}

function Home() {
    const [permission, setPermission] = useState(true)
    const [returnData, setReturnData] = useState([]);
    const [returnPagination, setPagination] = useState({});
    const currentPage = useSelector((state) => state.table.page);
    const currentLimit = useSelector((state) => state.table.rowsPerPage);
    const [semesterOption, setSemesterOption] = useState([]);
    const [departmentOption, setDepartmentOption] = useState([]);
    const [topicOption, setTopicOption] = useState([]);
    const [categoryOption, setCategoryOption] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [sortBy, setSortBy] = useState(null);
    const [sortType, setSortType] = useState(null);
    const [filterBy, setFilterBy] = useState(null);

    useEffect(() => {
        if (isLoading) {

            getSemester(null, setSemesterOption);
            getDepartment(null, setDepartmentOption);
            getTopic(null, setTopicOption);
            getCategory(null, setCategoryOption);
            setIsLoading(!isLoading);
        }
    }, [isLoading])

    const tableDatas = {
        searchKey: null,
        limit: currentLimit,
        page: currentPage,
        sortBy: sortBy,
        sortType: sortType,
    };

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
                {permission &&
                    <>
                        <Select
                            className='select'
                            name='academicId'
                            id='academicId'
                            options={semesterOption}
                            placeholder={"Semester"}
                            onChange={(selectOption) => {
                                handleChangeFilter(selectOption.value, setFilterBy)
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
                        <Select
                            className='select'
                            name='departmentId'
                            id='departmentId'
                            options={departmentOption}
                            placeholder={"Department"}
                            onChange={(selectOption) => {
                                handleChangeFilter(selectOption.value, setFilterBy)
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
                    </>
                }
                <Select
                    className='select'
                    name='topicId'
                    id='topic'
                    options={topicOption}
                    placeholder={"Topic"}
                    onChange={(selectOption) => {
                        handleChangeFilter(selectOption.value, setFilterBy)
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
                <Select
                    className='select'
                    name='tag'
                    id='tag'
                    options={categoryOption}
                    placeholder={"Tag"}
                    onChange={(selectOption) => {
                        handleChangeFilter(selectOption.value, setFilterBy)
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
                <Select
                    className='select select-sort'
                    name='sortType'
                    id='sortType'
                    options={SortOptions}
                    placeholder={"Sort"}
                    onChange={(selectOption) => {
                        handleChangeSort(selectOption.value, setSortBy, setSortType)
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