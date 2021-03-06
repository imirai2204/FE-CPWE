import React, { useState, useEffect } from "react";
import "../styles/style.scss";
import { ErrorMessage, Formik, Form } from "formik";
import { TextField } from "../components/UI/Form/TextField";
import { TextArea } from "../components/UI/Form/TextArea";
import { IdeaSchema } from "../validation";
import Select from "react-select";
import { Link } from "react-router-dom";
import { Contributor } from "../components/Navbar/dropdown/DropdownItems";
import { DropzoneArea } from "material-ui-dropzone";
import { IdeaUrl, DepartmentUrl, TopicUrl, CategoryUrl } from "../api/EndPoint";
import { AxiosInstance } from "../api/AxiosClient";
import ErrorMessagePopUp from "../components/UI/Modal/ErrorMessage";
import { useSelector } from "react-redux";
import { storage } from "../firebase/firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { convertDate, getFormattedDate } from "../function/library";

const errorMessage = (error) => {
    if (error && error.response) {
        console.log("Error: ", error.message);
    }
};

const updateIdeaAttachDownloadUrl = async (ideaId, body, clickSubmitHandler) => {
    await AxiosInstance.post(IdeaUrl.update + ideaId, body, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    })
        .then((res) => {
            console.log(res.data);
            clickSubmitHandler(res.data.code);
        })
        .catch((error) => {
            errorMessage(error);
        });
};

const handleSubmit = async (values, setErrorData, setIdeaId) => {
    const body = {
        departmentId: values.departmentId,
        topicId: values.topic,
        categoryId: values.categoryId,
        title: values.title,
        description: values.description,
        contributor: values.contributor,
    };
    await AxiosInstance.post(IdeaUrl.create, body, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    })
        .then((res) => {
            if (res.data.data !== null) {
                setIdeaId(res.data.data);
            }
            var errorData = {
                code: res.data.code,
                message: res.data.message,
            };
            setErrorData(errorData);
            console.log("Create success");
        })
        .catch((error) => {
            setErrorData({
                code: error.status,
                message: error.message,
            });
            errorMessage(error);
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
            errorMessage(error);
        });
};

const getTopic = async (values, setTopicOption) => {
    const paramsValue = {
        searchKey: values === null || values.searchKey === null ? "" : values.searchKey,
        page: values === null || values.page === null ? 1 : values.page,
        limit: values === null || values.limit === null ? 100 : values.limit,
        sortBy: values === null || values.sortBy === null ? "createdDate" : values.sortBy,
        sortType: values === null || values.sortType === null ? "DESC" : values.sortType,
        departmentId: values === null || values.departmentId === null ? null : values.departmentId,
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
                    startDate: content.startDate,
                    closureDate: content.closureDate,
                    finalDate: content.finalDate,
                };
            });
            setTopicOption(topicOption);
        })
        .catch((error) => {
            errorMessage(error);
        });
};

const getCategory = async (values, setCategoryOption) => {
    const paramsValue = {
        searchKey: values === null || values.searchKey === null ? null : values.searchKey,
        page: values === null || values.page === null ? 1 : values.page,
        limit: values === null || values.limit === null ? 100 : values.limit,
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
            errorMessage(error);
        });
};

const initialValues = {
    departmentId: 0,
    topic: 0,
    categoryId: 0,
    title: "",
    description: "",
    contributor: false,
    files: [{}],
};

const SubmitPage = (props) => {
    const [buttonShown, setButtonShown] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [fileUpload, setFileUpload] = useState([]);
    const [dataUpload, setDataUpload] = useState([]);
    const [topicName, setTopicName] = useState("");
    const [departmentOption, setDepartmentOption] = useState([]);
    const [topicOption, setTopicOption] = useState([]);
    const [categoryOption, setCategoryOption] = useState([]);
    const [errorData, setErrorData] = useState({
        code: 0,
        message: "ok",
    });
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [finalDate, setFinalDate] = useState("");
    const userInfo = useSelector((state) => state.user.userInfo);
    const [departmentaValue, setDepartmentValue] = useState(null);
    const [topicValue, setTopicValue] = useState(null);
    const [ideaId, setIdeaId] = useState(0);
    const [selectDepartment, setSelectDepartment] = useState(false);
    const [selectTopic, setSelectTopic] = useState(false);

    function handleSetInfo(option) {
        console.log(option);
        var startDate = getFormattedDate(convertDate(option.startDate));
        var endDate = getFormattedDate(convertDate(option.closureDate));
        var finalDate = getFormattedDate(convertDate(option.finalDate));
        setStartDate(startDate);
        setEndDate(endDate);
        setFinalDate(finalDate);
    }

    /** Fetch Department Data */
    let dataDepartment = {
        searchKey: userInfo.userRole !== "ADMIN" ? userInfo.departmentName : null,
        limit: 5,
        page: 1,
        sortBy: null,
        sortType: null,
    };
    useEffect(() => {
        getDepartment(dataDepartment, setDepartmentOption);
    }, [userInfo, setDepartmentOption]);

    /** Fetch Topic Data */
    let dataTopic = {
        searchKey: null,
        limit: 5,
        page: 1,
        sortBy: null,
        sortType: null,
        departmentId: departmentaValue,
    };
    useEffect(() => {
        if (departmentaValue === null || !selectDepartment) {
            return;
        } else {
            getTopic(dataTopic, setTopicOption);
        }
        setSelectDepartment(false);
    }, [departmentaValue, selectDepartment]);

    /** Fetch Category/Tag Data */
    let dataCategory = {
        searchKey: null,
        limit: 5,
        page: 1,
        sortBy: null,
        sortType: null,
        topicId: topicValue,
    };
    useEffect(() => {
        if (topicValue === null || !selectTopic) {
            return;
        } else {
            getCategory(dataCategory, setCategoryOption);
        }
        setSelectTopic(false);
    }, [topicValue, selectTopic]);

    const clickTerms = () => {
        setButtonShown(!buttonShown);
    };

    /** Handle upload image to firebase */
    useEffect(() => {
        if (dataUpload.length === 0) {
            return;
        }
        let upFiles = [];
        if (isSubmitting) {
            dataUpload.forEach((data) => {
                let fileName = `idea-attachment/${userInfo.userId}-${data.name}`;
                let imageRef = ref(storage, fileName);
                uploadBytes(imageRef, data).then(() => {
                    getDownloadURL(imageRef).then((url) => {
                        upFiles.push({
                            fileName: fileName.replace("idea-attachment/", ""),
                            downloadUrl: url,
                            fileType: data.type,
                            filePath: url
                                .replace(
                                    "https://firebasestorage.googleapis.com/v0/b/cpwe-storage.appspot.com/o",
                                    ""
                                )
                                .replace("%", ""),
                        });
                    });
                });
            });
            setFileUpload(upFiles);
        }
        setIsSubmitting(false);
    }, [isSubmitting, dataUpload]);

    useEffect(() => {
        const waitingFirebaseResponse = setTimeout(() => {
            updateIdeaAttachDownloadUrl(ideaId, fileUpload, clickSubmitHandler);
        }, 3500);
        if (ideaId === 0) {
            clearTimeout(waitingFirebaseResponse);
        }
        return () => {
            clearTimeout(waitingFirebaseResponse);
        };
    }, [ideaId]);
    /** Handle upload image to firebase */

    const handleFileUpload = (event) => {
        setDataUpload((prevState) => {
            setDataUpload([...prevState, event.target.value[0]]);
        });
    };

    const handleFileRemove = (file) => {
        setDataUpload((prevState) => {
            let currentData = prevState;
            currentData.forEach((data) => {
                if (data.path === file.path) {
                    let index = currentData.indexOf(data);
                    currentData.splice(index, 1);
                }
            });
            setDataUpload(currentData);
        });
    };

    const clickSubmitHandler = (responseCode) => {
        if (responseCode === 1) {
            props.onClose();
        }
    };

    return (
        <div className='submit-panel'>
            <h2 className='submit-title'>Create idea</h2>
            <Formik
                initialValues={initialValues}
                validationSchema={IdeaSchema}
                onSubmit={(values) => {
                    handleSubmit(values, setErrorData, setIdeaId);
                    setIsSubmitting(true);
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
                                    <label className='label' htmlFor='departmentId'>
                                        Department
                                    </label>
                                    <Select
                                        className='select'
                                        name='departmentId'
                                        id='departmentId'
                                        options={departmentOption}
                                        placeholder={"Select depertment"}
                                        isDisabled={false}
                                        defaultValue={departmentOption[0]}
                                        onChange={(selectOption) => {
                                            setFieldValue("departmentId", selectOption.value);
                                            setDepartmentValue(selectOption.value);
                                            setSelectDepartment(true);
                                        }}
                                        onBlur={() => {
                                            handleBlur({
                                                target: { name: "departmentId" },
                                            });
                                        }}
                                        maxMenuHeight={200}
                                    />
                                    <ErrorMessage
                                        component='div'
                                        name={"departmentId"}
                                        className='error'
                                    />
                                </div>
                                <div className='input-section label-mark'>
                                    <label className='label' htmlFor='topic'>
                                        Topic
                                    </label>
                                    <Select
                                        className='select'
                                        name='topic'
                                        id='topic'
                                        options={topicOption}
                                        placeholder={"Select topic"}
                                        onChange={(selectOption) => {
                                            setFieldValue("topic", selectOption.value);
                                            setTopicName(selectOption.label);
                                            handleSetInfo(selectOption);
                                            setTopicValue(selectOption.value);
                                            setSelectTopic(true);
                                        }}
                                        onBlur={() => {
                                            handleBlur({ target: { name: "topic" } });
                                        }}
                                        maxMenuHeight={200}
                                    />
                                    <ErrorMessage
                                        component='div'
                                        name={"topic"}
                                        className='error'
                                    />
                                </div>
                                <div className='input-section label-mark'>
                                    <label className='label' htmlFor='categoryId'>
                                        Tag
                                    </label>
                                    <Select
                                        className='select'
                                        name='categoryId'
                                        id='categoryId'
                                        options={categoryOption}
                                        placeholder={"Select tag"}
                                        onChange={(selectOption) => {
                                            setFieldValue("categoryId", selectOption.value);
                                        }}
                                        onBlur={() => {
                                            handleBlur({ target: { name: "categoryId" } });
                                        }}
                                        maxMenuHeight={200}
                                    />
                                    <ErrorMessage
                                        component='div'
                                        name={"categoryId"}
                                        className='error'
                                    />
                                </div>
                            </div>
                            <div className='layout-1--right'>
                                <div className='information-box'>
                                    <h2>Information</h2>
                                    <h4>of {topicName}</h4>
                                    <div className='info-content'>
                                        <div className='time'>
                                            <label>Start Date: </label>
                                            <p>{startDate}</p>
                                        </div>
                                        <div className='time'>
                                            <label>End Date: </label>
                                            <p>{endDate}</p>
                                        </div>
                                        <div className='time'>
                                            <label>Final End Date: </label>
                                            <p>{finalDate}</p>
                                        </div>
                                    </div>
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
                        <div className='input-section contributor'>
                            <label className='label' htmlFor='contributor'>
                                Post Status
                            </label>
                            <Select
                                className='select'
                                name='contributor'
                                id='contributor'
                                options={Contributor}
                                defaultValue={Contributor[0]}
                                placeholder={"Select state of the post"}
                                onChange={(selectOption) => {
                                    setFieldValue("contributor", selectOption.value);
                                }}
                                onBlur={() => {
                                    handleBlur({ target: { name: "contributor" } });
                                }}
                            />
                            <ErrorMessage component='div' name={"contributor"} className='error' />
                        </div>
                        <div className='input-section attachment'>
                            <label className='label' htmlFor='file'>
                                Attachment
                            </label>
                            <DropzoneArea
                                acceptedFiles={[
                                    ".png,.jpg,.jpeg,.xlsx,.xls,.doc,.docx,.ppt,.pptx,.txt,.pdf",
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
                                id='attachment'
                                onDelete={(file) => {
                                    handleFileRemove(file);
                                }}
                                onDrop={(dropFiles) => {
                                    let event = {
                                        target: {
                                            name: "files",
                                            value: dropFiles,
                                        },
                                    };
                                    handleChange(event);
                                    handleFileUpload(event);
                                }}
                            />
                        </div>
                        <div className='check-submit'>
                            <label className='checkbox'>
                                <input type='checkbox' onClick={clickTerms} />
                                <span></span>
                                <Link to='/terms-conditions' className='terms-link' target='_blank'>
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
                                className={`btn btn--medium ${buttonShown ? "" : "disabled"}`}
                                type='submit'>
                                Submit
                            </button>
                        </div>
                    </Form>
                )}
            </Formik>
            {errorData.code !== 0 && errorData.code !== 1 && (
                <ErrorMessagePopUp closebtn={setErrorData} errorMess={errorData.message} />
            )}
            {errorData.code === 1 && (
                <ErrorMessagePopUp closebtn={setErrorData} errorMess={errorData.message} />
            )}
        </div>
    );
};

export default SubmitPage;
