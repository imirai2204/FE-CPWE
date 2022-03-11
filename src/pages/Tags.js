import React, { useState } from "react";
import "../styles/style.scss";
import { ErrorMessage, Formik, Form } from "formik";
import { TextField } from "../components/UI/Form/TextField";
import { EnhancedTable } from "../components/UI/Table/Table";
import { TagSchema } from "../validation";
import axios from "axios";
import { TagsData, TableColumns, TopicOptions } from "./dummy-data/tags-page";
import Select from "react-select";
import { IdeaUrl, Authen } from "../api/EndPoint";
import { RequestHeader } from "../api/AxiosComponent";

const handleSubmit = async (values) => {
    var formData = new FormData();
    formData.append("tagName", values.tagName);
    formData.append("topicId", values.topicId);

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
    tagName: "",
    topicId: 0,
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

    if (permission) {
        return (
            <div className='department-page container'>
                <h2 className='page-title'>Tag</h2>
                <div className='layout-form'>
                    <Formik
                        initialValues={initialValues}
                        validationSchema={TagSchema}
                        onSubmit={(values, { setSubmitting }) => {
                            handleSubmit(values);
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
                                            name='tagName'
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
                                            options={TopicOptions}
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
                                    <button className='btn btn-warning' type='button'>
                                        Search
                                    </button>
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
                        rows={TagsData}
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
};

export default Tags;
