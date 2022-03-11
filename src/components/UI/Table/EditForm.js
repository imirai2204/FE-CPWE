import React, { useState } from "react";
import "../../../styles/style.scss"
import { ErrorMessage, Formik, Form } from "formik";
import { TextField } from "../Form/TextField";
import { IdeaSchema } from "../../../validation";
import axios from "axios";
import { Link } from "react-router-dom";
import { Authen } from "../../../api/EndPoint";
import { RequestHeader } from "../../../api/AxiosComponent"

function handleSubmit(values) {
    const body = {
        departmentId: values.departmentId,
    };

    console.log("Submit!!!");

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

const initialValues = {
    department: "",
}

const EditForm = (props) => {
    const [buttonShown, setButtonShown] = useState(false);
    const [permission, setPermission] = useState(true);
    const [values, setValues] = useState(initialValues);

    // checkPermission(setPermission);
    // console.log(files);

    const handleInputChange = e => {
        const { name, value } = e.target
        setValues({
            ...values,
            [name]: value
        })
    }

    const clickTerms = () => {
        setButtonShown(!buttonShown);
    };

    // State to store value from the input field
    const [inputValue, setInputValue] = useState("");

    // Input Field handler
    const handleUserInput = (e) => {
        setInputValue(e.target.value);
    };

    // Reset Input Field handler
    const resetInputField = () => {
        setInputValue("");
    };

    if (permission) {
        return (
            <div className="submit-panel">
                <Formik
                    initialValues={initialValues}
                    validationSchema={IdeaSchema}
                    onSubmit={(values, { setSubmitting }) => {
                        handleSubmit(values);
                        console.log(values)
                    }}>
                    {({
                        values,
                    }) => (
                        <Form className='submit-form'>
                            <div className='layout-1'>
                                <div className='layout-1--left'>
                                    <div className='input-section label-mark'>
                                        <label className='label' htmlFor='department'>
                                            Department
                                        </label>
                                        <input
                                        type="text" 
                                        value={inputValue} 
                                        onChange={handleUserInput} 
                                        class="form-control" 
                                        placeholder="Department name"
                                        />
                                        <ErrorMessage component='div' name={'department'} className='error' />
                                    </div>
                                </div>
                            </div>
                            <div className='container--idea--submit check-submit'>
                                <div></div>
                                <button
                                    className='btn btn--noline'
                                    type='button'
                                    onClick={resetInputField}
                                >
                                    Reset
                                </button>
                                <button
                                    className={`btn btn--medium`}
                                    type='submit'>
                                    Save changes
                                </button>
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>
        );
    } else {
        return (
            <div>
                <p>You have no permission</p>
            </div>
        );
    }
};

export default EditForm;
