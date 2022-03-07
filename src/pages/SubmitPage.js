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
import { Authen } from "../api/EndPoint";
import { RequestHeader } from "../api/AxiosComponent";

function handleSubmit(values) {
    const body = {
        departmentId: values.departmentId,
        topicId: values.topicId,
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
    topic: "",
    tag: "",
    title: "",
    description: "",
    contributor: "",
    files: []
};

const SubmitPage = (props) => {
    const [buttonShown, setButtonShown] = useState(false);
    const [permission, setPermission] = useState(true);
    const [files, setfiles] = useState([]);

    // checkPermission(setPermission);
    // console.log(files);

    const handleChangeFile = (files) => {
        setfiles(files);
    }

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
                                            // defaultValue={Departments[0]}
                                            value={values.department}
                                            isDisabled={false}
                                            isClearable={true}
                                            onChange={
                                                selectOption => {
                                                    let event = {
                                                        target: {
                                                            name: 'department',
                                                            value: selectOption
                                                        }
                                                    }
                                                    handleChange(event)
                                                }
                                            }
                                            onBlur={() => {
                                                handleBlur({ target: { name: 'department' } });
                                            }}
                                        />
                                        <ErrorMessage component='div' name={'department'} className='error' />
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
                                            value={values.topic}
                                            isClearable={true}
                                            onChange={
                                                selectOption => {
                                                    let event = {
                                                        target: {
                                                            name: 'topic',
                                                            value: selectOption
                                                        }
                                                    }
                                                    handleChange(event)
                                                }
                                            }
                                            onBlur={() => {
                                                handleBlur({ target: { name: 'topic' } });
                                            }}
                                        />
                                        <ErrorMessage component='div' name={'topic'} className='error' />
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
                                            value={values.tag}
                                            isClearable={true}
                                            onChange={
                                                selectOption => {
                                                    let event = {
                                                        target: {
                                                            name: 'tag',
                                                            value: selectOption
                                                        }
                                                    }
                                                    handleChange(event)
                                                }
                                            }
                                            onBlur={() => {
                                                handleBlur({ target: { name: 'tag' } });
                                            }}
                                        />
                                        <ErrorMessage component='div' name={'tag'} className='error' />
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
                                    // defaultValue={Contributor[0]}
                                    value={values.contributor}
                                    onChange={
                                        selectOption => {
                                            let event = {
                                                target: {
                                                    name: 'contributor',
                                                    value: selectOption
                                                }
                                            }
                                            handleChange(event)
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
                                                name: 'file',
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
