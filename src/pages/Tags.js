import React, { useState, useEffect } from "react";
import "../styles/style.scss";
import { ErrorMessage, Formik, Form } from "formik";
import { TextField } from "../components/UI/Form/TextField";
import { EnhancedTable } from "../components/UI/Table/Table";
import { TagSchema } from "../validation";
import { ColumnsCategory } from "../components/UI/Table/TableItems";
import Select from "react-select";
import { CategoryUrl, TopicUrl, Flag, Warn } from "../api/EndPoint";
import { AxiosInstance } from "../api/AxiosClient";
import { useSelector } from "react-redux";
import ErrorMessagePopUp from "../components/UI/Modal/ErrorMessage";
import AuthorizationAPI from "../api/AuthorizationAPI";
import PageNotFound from "../404";

const errorMessage = (error) => {
    if (error && error.response) {
        console.log("Error: ", error);
    }
};

const handleSubmit = async (values, setIsSubmiting, setErrorData) => {
    await AxiosInstance.post(CategoryUrl.create, values, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    })
        .then((res) => {
            var errorData = {
                code: res.data.code,
                message: res.data.message,
            };
            setErrorData(errorData);
            console.log("Create success");
            setIsSubmiting(false);
        })
        .catch((error) => {
            errorMessage(error);
        });
};

const handleGet = async (values, setReturnData, setPagination) => {
    console.log(values);
    const paramsValue = {
        searchKey: values === null || values.searchKey === null ? null : values.searchKey,
        page: values === null || values.page === null ? 1 : values.page,
        limit: values === null || values.limit === null ? 5 : values.limit,
        sortBy: values === null || values.sortBy === null ? "createdDate" : values.sortBy,
        sortType: values === null || values.sortType === null ? "DESC" : values.sortType,
    };
    await AxiosInstance.get(CategoryUrl.get, {
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
                return {
                    id: content.id,
                    topicLabel: content.topic,
                    tagLabel: content.category,
                };
            });
            setReturnData(tableData);
            setPagination(pagination);
        })
        .catch((error) => {
            errorMessage(error);
        });
};

const getTopic = async (values, setTopicOption) => {
    const paramsValue = {
        searchKey: values === null || values.searchKey === null ? "" : values.searchKey,
        page: values === null || values.page === null ? 1 : values.page,
        limit: values === null || values.limit === null ? 100 : values.limit,
        sortBy: values === null || values.sortBy === null ? "createdDate" : values.sortBy,
        sortType: values === null || values.sortType === null ? "Desc" : values.sortType,
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
            errorMessage(error);
        });
};

const deleteTopic = async (categoryId, setErrorData) => {
    await AxiosInstance.delete(CategoryUrl.delete + categoryId, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    })
        .then((res) => {
            setErrorData({
                code: res.data.code,
                message: res.data.message,
            });
        })
        .catch((error) => {
            errorMessage(error);
        });
};

const initialValues = {
    topicId: 0,
    category: "",
};

const Tags = (props) => {
    const [permission, setPermission] = useState(true);
    const [returnData, setReturnData] = useState([]);
    const [returnPagination, setPagination] = useState({});
    const [isSubmiting, setIsSubmiting] = useState(false);
    const [errorData, setErrorData] = useState({
        code: 1,
        message: "",
    });
    const [topicOption, setTopicOption] = useState([]);
    const [deleteCategoryId, setDeleteCategoryId] = useState(null);
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
        AuthorizationAPI(Flag.manageSemester, setPermission);
    }, [permission]);

    useEffect(() => {
        if (permission === true) {
            handleGet(tableDatas, setReturnData, setPagination);
        }
    }, [permission, currentPage, currentLimit]);

    if (isSubmiting === false) {
        handleGet(null, setReturnData, setPagination);
        getTopic(null, setTopicOption);
        setIsSubmiting(true);
    }

    const handleDeleteTag = () => {
        deleteTopic(deleteCategoryId, setErrorData).then(() => {
            handleGet(null, setReturnData, setPagination);
        });
    };

    if (permission) {
        return (
            <div className='department-page container'>
                <h2 className='page-title'>Tag</h2>
                <div className='layout-form'>
                    <Formik
                        initialValues={initialValues}
                        validationSchema={TagSchema}
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
                                    <div className='input-section label-mark'>
                                        <TextField
                                            label={"Tag"}
                                            name='category'
                                            type='text'
                                            placeholder='Tag Name...'
                                        />
                                    </div>
                                    <div className='input-section label-mark'>
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
                                            onBlur={() => {
                                                handleBlur({ target: { name: "topic" } });
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
                                        <ErrorMessage
                                            component='div'
                                            name={"topicId"}
                                            className='error'
                                        />
                                    </div>
                                </div>
                                <hr />
                                <div className='list-button'>
                                    <button className='btn btn-info' type='reset'>
                                        Refresh
                                    </button>
                                    <button className='btn btn-success' type='submit'>
                                        Save
                                    </button>
                                </div>
                            </Form>
                        )}
                    </Formik>
                </div>
                <div className='layout-table'>
                    <EnhancedTable
                        columns={ColumnsCategory}
                        rows={returnData}
                        hasDeletedBtn={true}
                        totalPages={returnPagination.totalPages}
                        deleteTag={handleDeleteTag}
                        setDeleteCategoryId={setDeleteCategoryId}
                    />
                </div>
                {errorData.code !== 1 ? (
                    <ErrorMessagePopUp closebtn={setErrorData} errorMess={errorData.message} />
                ) : (
                    <></>
                )}
            </div>
        );
    } else {
        return <PageNotFound warn={Warn.noPermission} />;
    }
};

export default Tags;
