import React, { useState } from "react";
import "../styles/style.scss";
import { Formik, Form } from "formik";
import { TextField } from "../components/UI/Form/TextField";
import { SignInSchema } from "../validation";
import axios from "axios";
import Select from "react-select";
import { Link } from "react-router-dom";
import {
    Departments,
    Topics,
    Tags,
    Contributor,
} from "../components/Navbar/dropdown/DropdownItems";
import { DropzoneArea } from 'material-ui-dropzone';

function handleSubmit(values) {
    const body = {
        email: values.email,
        password: values.password,
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

const SubmitPage = (props) => {
    const [buttonShown, setButtonShown] = useState(false);

    const clickTerms = () => {
        setButtonShown(!buttonShown);
    };

    const initialValues = {
        email: "",
        password: "",
        files: null,
    };

    return (
        <div className='submit-panel'>
            <h2 className='submit-title'>Create idea</h2>
            <Formik
                initialValues={initialValues}
                validationSchema={SignInSchema}
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
                        <div className='layout-1'>
                            <div className='layout-1--left'>
                                <div className='input-section label-mark'>
                                    <label className='label' htmlFor='department'>
                                        Department
                                    </label>
                                    <Select
                                        className='select'
                                        options={Departments}
                                        isClearable={true}
                                        defaultValue={Departments[0]}
                                        placeholder={"Select depertment"}
                                        isDisabled={true}
                                    />
                                </div>
                                <div className='input-section label-mark'>
                                    <label className='label' htmlFor='topic'>
                                        Topic
                                    </label>
                                    <Select
                                        className='select'
                                        options={Topics}
                                        isClearable={true}
                                        placeholder={"Select topic"}
                                    />
                                </div>
                                <div className='input-section label-mark'>
                                    <label className='label' htmlFor='tag'>
                                        Tag
                                    </label>
                                    <Select
                                        className='select'
                                        options={Tags}
                                        isClearable={true}
                                        placeholder={"Select tag"}
                                    />
                                </div>
                            </div>
                            <div className='layout-1--right'>
                                <div className='time'>
                                    <label>Start date: </label>
                                    <p>01/03/2022</p>
                                </div>
                                <div className='time'>
                                    <label>End date: </label>
                                    <p>31/03/2022</p>
                                </div>
                            </div>
                        </div>
                        <hr />
                        <div className='input-section label-mark'>
                            <TextField
                                label={"Title"}
                                name='title'
                                type='title'
                                multiple
                                placeholder='Title'
                            />
                        </div>
                        <div className='input-section'>
                            <label htmlFor='description'>Description</label>
                            <textarea
                                className='textarea'
                                name='description'
                                rows={8}
                                style={{ width: "100%", resize: "none" }}></textarea>
                        </div>
                        <div className='input-section contributor label-mark'>
                            <label className='label' htmlFor='contributor'>
                                Contributor
                            </label>
                            <Select
                                className='select'
                                options={Contributor}
                                defaultValue={Contributor[0]}
                            />
                        </div>
                        <div className='input-section attachment'>
                            <DropzoneArea
                                acceptedFiles={['.xlsx,.xls,image/*,.doc, .docx,.ppt, .pptx,.txt,.pdf']}
                                showPreviews={true}
                                maxFileSize={5000000}
                                fullWidth={true}
                                dropzoneText="Drop files to attach or browse"
                                filesLimit={6}
                                showFileNamesInPreview={true}
                                showPreviewsInDropzone={false}
                            />
                        </div>
                        <div className='container--idea--submit check-submit'>
                            <label className='checkbox'>
                                <input type='checkbox' onClick={clickTerms} />
                                <span></span>
                                <Link to='/terms-conditions' target='_blank'>
                                    Terms & Conditions
                                </Link>
                            </label>
                            <div></div>
                            <button
                                className='btn btn--noline'
                                type='submit'
                                onClick={props.onClose}>
                                Cancel
                            </button>
                            <button
                                className={`btn btn--medium ${buttonShown ? "" : "disabled"
                                    }`}
                                type='submit'>
                                Submit
                            </button>
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default SubmitPage;
