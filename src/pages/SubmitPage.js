import React, { useState } from "react";
import "../styles/style.scss";
import { ErrorMessage, Formik, Form } from "formik";
import { TextField } from "../components/UI/Form/TextField";
import { TextArea } from "../components/UI/Form/TextArea";
import { IdeaSchema } from "../validation";
import axios from "axios";
import Select from "react-select";
import { Link } from "react-router-dom";
import {
    Departments,
    Topics,
    Tags,
    Contributor,
} from "../components/Navbar/dropdown/DropdownItems";
import { DropzoneArea } from "material-ui-dropzone";
import { IdeaUrl, Authen } from "../api/EndPoint";
import { RequestHeader } from "../api/AxiosComponent";

const handleSubmit = async (values) => {
    var formData = new FormData();
    formData.append("departmentId", values.departmentId);
    formData.append("topicId", values.topicId);
    formData.append("categoryId", values.categoryId);
    formData.append("title", values.title);
    formData.append("description", values.description);
    formData.append("contributor", values.contributor);

    if (values.files.length > 0) {
        for ( var i = 0; i < values.files.length; i++) {
            formData.append("files", values.files[i]);
        }
    }

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
    departmentId: 0,
    topicId: 0,
    categoryId: 0,
    title: "",
    description: "",
    contributor: false,
    files: []
};

const SubmitPage = (props) => {
    const [buttonShown, setButtonShown] = useState(false);
    const [permission, setPermission] = useState(true);

    // checkPermission(setPermission);

    const clickTerms = () => {
        setButtonShown(!buttonShown);
    };

    if (permission) {
        return (
            <div className='submit-panel'>
                <h2 className='submit-title'>Create idea</h2>
                <Formik
                    initialValues={initialValues}
                    validationSchema={IdeaSchema}
                    onSubmit={(values, { setSubmitting }) => {
                        handleSubmit(values);
                        console.log(values)
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
                                            name='department'
                                            id='department'
                                            options={Departments}
                                            placeholder={"Select depertment"}
                                            isDisabled={false}
                                            onChange={
                                                selectOption => {
                                                    setFieldValue("departmentId", selectOption.value)
                                                }
                                            }
                                            onBlur={() => {
                                                handleBlur({ target: { name: 'department' } });
                                            }}
                                        />
                                        <ErrorMessage component='div' name={'departmentId'} className='error' />
                                    </div>
                                    <div className='input-section label-mark'>
                                        <label className='label' htmlFor='topic'>
                                            Topic
                                        </label>
                                        <Select
                                            className='select'
                                            name='topic'
                                            id='topic'
                                            options={Topics}
                                            placeholder={"Select topic"}
                                            onChange={
                                                selectOption => {
                                                    setFieldValue("topicId", selectOption.value)
                                                }
                                            }
                                            onBlur={() => {
                                                handleBlur({ target: { name: 'topic' } });
                                            }}
                                        />
                                        <ErrorMessage component='div' name={'topicId'} className='error' />
                                    </div>
                                    <div className='input-section label-mark'>
                                        <label className='label' htmlFor='tag'>
                                            Tag
                                        </label>
                                        <Select
                                            className='select'
                                            name='tag'
                                            id='tag'
                                            options={Tags}
                                            placeholder={"Select tag"}
                                            onChange={
                                                selectOption => {
                                                    setFieldValue("categoryId", selectOption.value)
                                                }
                                            }
                                            onBlur={() => {
                                                handleBlur({ target: { name: 'tag' } });
                                            }}
                                        />
                                        <ErrorMessage component='div' name={'categoryId'} className='error' />
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
                                    type='text'
                                    placeholder='Title'
                                />
                            </div>
                            <div className='input-section'>
                                <TextArea
                                    label={"Description"}
                                    className='textarea'
                                    name='description'
                                    rows={8}
                                    style={{ width: "100%", resize: "none" }}></TextArea>
                            </div>
                            <div className='input-section contributor label-mark'>
                                <label className='label' htmlFor='contributor'>
                                    Contributor
                                </label>
                                <Select
                                    className='select'
                                    name='contributor'
                                    id="contributor"
                                    options={Contributor}
                                    placeholder={"Select contributor"}
                                    onChange={
                                        selectOption => {
                                            setFieldValue("contributor", selectOption.value)
                                        }
                                    }
                                    onBlur={() => {
                                        handleBlur({ target: { name: 'contributor' } });
                                    }}
                                />
                                <ErrorMessage component='div' name={'contributor'} className='error' />
                            </div>
                            <div className='input-section attachment'>
                                <label className='label' htmlFor='file'>
                                    Attachment
                                </label>
                                <DropzoneArea
                                    acceptedFiles={[
                                        ".xlsx,.xls,image/*,.doc, .docx,.ppt, .pptx,.txt,.pdf",
                                    ]}
                                    showPreviews={true}
                                    maxFileSize={10000000}
                                    fullWidth={true}
                                    dropzoneText='Drop files to attach or browse'
                                    filesLimit={5}
                                    showFileNamesInPreview={true}
                                    showPreviewsInDropzone={false}
                                    showAlerts={false}
                                    name='file'
                                    id="attachment"
                                    onDrop={dropFiles => {
                                        let event = {
                                            target: {
                                                name: 'files',
                                                value: dropFiles
                                            }
                                        }
                                        handleChange(event)
                                    }}
                                />
                            </div>
                            <div className='container--idea--submit check-submit'>
                                <label className='checkbox'>
                                    <input type='checkbox' onClick={clickTerms} />
                                    <span></span>
                                    <Link
                                        to='/terms-conditions'
                                        className='terms-link'
                                        target='_blank'>
                                        Terms & Conditions
                                    </Link>
                                </label>
                                <div></div>
                                <button
                                    className='btn btn--noline'
                                    type='button'
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
    } else {
        return (
            <div>
                <p>You have no permission</p>
            </div>
        );
    }
};

export default SubmitPage;
