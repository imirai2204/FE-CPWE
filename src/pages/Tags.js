import React, { useState } from "react";
import "../styles/style.scss";
import { ErrorMessage, Formik, Form } from "formik";
import { TextField } from "../components/UI/Form/TextField";
import { EnhancedTable } from "../components/UI/Table/Table";
import { TagSchema } from "../validation";
import axios from "axios";
import { TagsData, TableColumns, TopicOptions } from "./dummy-data/tags-page";
import Select from "react-select";
import { CategoryUrl, Authen, TopicUrl } from "../api/EndPoint";
import { RequestHeader } from "../api/AxiosComponent";

const handleSubmit = async (values, setIsSubmiting) => {
    const response = await axios
        .post(CategoryUrl.create, values, { headers: RequestHeader.checkAuthHeaders })
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
    console.log(values)
    const paramsValue = {
        searchKey: values === null || values.searchKey === null ? null : values.searchKey,
        page: values === null || values.page === null ? 1 : values.page,
        limit: values === null || values.limit === null ? 5 : values.limit,
        sortBy: values === null || values.sortBy === null ? "id" : values.sortBy,
        sortType: values === null || values.sortType === null ? "ASC" : values.sortType,
    } 
    const response = await axios
        .get(CategoryUrl.get, {
            headers: RequestHeader.checkAuthHeaders,
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
                return {
                    id: content.id,
                    topicLabel: content.topic,
                    tagLabel: content.category
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

const getTopic = async (values, setTopicOption) => {
    const paramsValue = {
        searchKey: values === null || values.searchKey === null ? "" : values.searchKey,
        page: values === null || values.page === null ? 1 : values.page,
        limit: values === null || values.limit === null ? 5 : values.limit,
        sortBy: values === null || values.sortBy === null ? "id" : values.sortBy,
        sortType: values === null || values.sortType === null ? "ASC" : values.sortType,
    } 
    const response = await axios
        .get(TopicUrl.get, {
            headers: RequestHeader.checkAuthHeaders,
            params: paramsValue
        })
        .then((res) => {
            var topicOption = res.data.data.content.map((content) => {
                return {
                    value: content.id,
                    label: content.topic,
                    key: content.id,
                }
            })
            setTopicOption(topicOption)
        })
        .catch((error) => {
            if (error && error.response) {
                console.log("Error: ", error);
            }
        });
}

const initialValues = {
    topicId: 0,
    category: "",
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

const Tags = (props) => {
    const [permission, setPermission] = useState(true);
    const [returnData, setReturnData] = useState([]);
    const [returnPagination, setPagination] = useState({});
    const [isSubmiting, setIsSubmiting] = useState(false);
    const [topicOption, setTopicOption] = useState([]);

    if (isSubmiting === false) {
        handleGet(null, setReturnData, returnData, setPagination)
        getTopic(null, setTopicOption)
        setIsSubmiting(true)
    }

    if (permission) {
        return (
            <div className='department-page container'>
                <h2 className='page-title'>Tag</h2>
                <div className='layout-form'>
                    <Formik
                        initialValues={initialValues}
                        validationSchema={TagSchema}
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
                            <Form className='submit-form'>
                                <div className='form-container'>
                                    <div className='input-section label-mark'>
                                        <TextField
                                            label={"Tag"}
                                            name='category'
                                            type='text'
                                            placeholder='Tag name...'
                                        />
                                    </div>
                                    <div className='input-section label-mark'>
                                        <label className='label'>Topic</label>
                                        <Select
                                            className='select'
                                            name='topicId'
                                            id='topic'
                                            options={topicOption}
                                            placeholder={"Select topic"}
                                            onChange={(selectOption) => {
                                                setFieldValue("topicId", selectOption.value);
                                            }}
                                            onBlur={() => {
                                                handleBlur({ target: { name: "topic" } });
                                            }}
                                            menuPortalTarget={document.body}
                                            styles={{
                                                menuPortal: base => ({ ...base, zIndex: 9999 }),
                                                menu: base => ({ ...base, fontSize: '15px' })
                                            }}
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
                        columns={TableColumns}
                        rows={returnData}
                        hasEditedBtn={false}
                        hasDeletedBtn={true}
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
};

export default Tags;
