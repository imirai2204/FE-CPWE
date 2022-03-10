import React, { useContext } from "react";
import "../styles/style.scss";
import { ErrorMessage, Formik, Form } from "formik";
import { TextField } from "../components/UI/Form/TextField";
import { EnhancedTable } from "../components/UI/Table/Table";
import { DepartmentSchema } from "../validation";
import axios from "axios";
import { TagsData, TableColumns, TopicOptions } from "./dummy-data/tags-page";
import Select from "react-select";

function handleSubmit(values) {
    const body = {
        departmentName: values.departmentName,
    };

    axios
        .post(`http://localhost:3000/login`, body)
        .then((res) => {
            console.log(res);
            console.log(res.data);
            setTimeout(() => {
                alert("Login success");
            }, 400);
        })
        .catch((error) => {
            console.log(error);
            setTimeout(() => {
                alert(error);
            }, 400);
        });
}

const initialValues = {
    departmentName: "",
};

const Tags = (props) => {
    return (
        <div className='department-page container'>
            <h2 className='page-title'>Tag</h2>
            <div className='layout-form'>
                <Formik
                    initialValues={initialValues}
                    validationSchema={DepartmentSchema}
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
                                        name='tag'
                                        type='text'
                                        placeholder='Tag name...'
                                        // value={editTableCtx.inputFieldValue}
                                        // onChange={handleChange}
                                    />
                                </div>
                                <div className='input-section label-mark'>
                                    <label className='label'>Topic</label>
                                    <Select
                                        className='select'
                                        name='topic'
                                        id='topic'
                                        options={TopicOptions}
                                        placeholder={"Select topic"}
                                        onChange={(selectOption) => {
                                            setFieldValue("topicId", selectOption.value);
                                        }}
                                        onBlur={() => {
                                            handleBlur({ target: { name: "topic" } });
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
                                <button className='btn btn-warning' type='submit'>
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
                <EnhancedTable columns={TableColumns} rows={TagsData} />
            </div>
        </div>
    );
};

export default Tags;
