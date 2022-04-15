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
import { IdeaUrl, Authen, DepartmentUrl, TopicUrl, CategoryUrl } from "../api/EndPoint";
import { AxiosInstance } from "../api/AxiosClient";
import ErrorMessagePopUp from "../components/UI/Modal/ErrorMessage";
import { useSelector } from "react-redux";
import { storage } from "../firebase/firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { convertDate, getFormattedDate } from "../function/library";

const handleSubmit = async (values, setErrorData, imageUpload) => {
    const body = {
        departmentId: values.departmentId,
        topicId: values.topicId,
        categoryId: values.categoryId,
        title: values.title,
        description: values.description,
        contributor: values.contributor,
        files: imageUpload
        // files: values.files.map((item, index) => {
        //     return item[index]
        // })
    }
    // if (values.files.length > 0) {
    //     for (var i = 0; i < values.files.length; i++) {
    //         formData.append("files", values.files[i]);
    //     }
    // }
    await AxiosInstance.post(IdeaUrl.create, body, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    })
        .then((res) => {
            var errorData = {
                code: res.data.code,
                message: res.data.message,
            }
            setErrorData(errorData);
            console.log("Create success");
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
                    label: content.category,
                    key: content.id,
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

const initialValues = {
    departmentId: 0,
    topicId: 0,
    categoryId: 0,
    title: "",
    description: "",
    contributor: false,
    files: [],
};

const SubmitPage = (props) => {
    const [buttonShown, setButtonShown] = useState(false);
    const [isClickSubmit, setIsClickSubmit] = useState(false);
    const [imageUpload, setImageUpload] = useState([]);
    const [imgDownloadUrl, setImgDownloadUrl] = useState([]);
    // const [permission, setPermission] = useState(true);
    const [topicName, setTopicName] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [finalDate, setFinalDate] = useState("");
    const [departmentOption, setDepartmentOption] = useState([]);
    const [topicOption, setTopicOption] = useState([]);
    const [categoryOption, setCategoryOption] = useState([]);
    const [errorData, setErrorData] = useState({
        code: 1,
        message: "ok"
    });
    const userInfo = useSelector((state) => state.user.userInfo)

    function handleSetInfo(option) {
        var startDate = getFormattedDate(convertDate(option.startDate));
        var endDate = getFormattedDate(convertDate(option.endDate));
        var finalDate = getFormattedDate(convertDate(option.finalDate));
        setStartDate(startDate)
        setEndDate(endDate)
        setFinalDate(finalDate)
    }

    const dataDepartment = {
        searchKey: userInfo.userRole !== "ADMIN" ? userInfo.departmentName : null,
        limit: 5,
        page: 1,
        sortBy: null,
        sortType: null,
    };

    useEffect(() => {
        getDepartment(dataDepartment, setDepartmentOption);
        getTopic(null, setTopicOption);
        getCategory(null, setCategoryOption);
    }, [userInfo]);

    /**Handle upload image to firebase */
    useEffect(() => {
        if (imageUpload.length == 0) {
            return;
        }
        if (isClickSubmit) {
            let imageRef;
            imageUpload.forEach((image) => {
                imageRef = ref(storage, `idea-attachment/${userInfo.userId}/${image.fileName}`)
                uploadBytes(imageRef, image).then(() => {
                    alert("Image Upload");
                    setImgDownloadUrl([...imgDownloadUrl, getDownloadURL(imageRef)])
                })
            })
        }
        console.log(imageUpload)
        setIsClickSubmit(false)
    }, [isClickSubmit])

    const handleImageUpload = (event) => {
        setImageUpload(event.target.value);
    };

    const clickTerms = () => {
        setButtonShown(!buttonShown);
    };

    const clickSubmitHandler = () => {
        setIsClickSubmit(true);
    }

    return (
        <div className='submit-panel'>
            <h2 className='submit-title'>Create idea</h2>
            <Formik
                initialValues={initialValues}
                validationSchema={IdeaSchema}
                onSubmit={(values, { setSubmitting }) => {
                    handleSubmit(values, setErrorData, imageUpload);
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
                                        options={departmentOption}
                                        placeholder={"Select depertment"}
                                        isDisabled={userInfo.userRole === "ADMIN" ? false : true}
                                        defaultValue={departmentOption[0]}
                                        onChange={(selectOption) => {
                                            setFieldValue(
                                                "departmentId",
                                                selectOption.value
                                            );
                                        }}
                                        onBlur={() => {
                                            handleBlur({
                                                target: { name: "department" },
                                            });
                                        }}
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
                                            setFieldValue(
                                                "topicId",
                                                selectOption.value
                                            );
                                            setTopicName(selectOption.label);
                                            handleSetInfo(selectOption);
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
                                <div className='input-section label-mark'>
                                    <label className='label' htmlFor='tag'>
                                        Tag
                                    </label>
                                    <Select
                                        className='select'
                                        name='tag'
                                        id='tag'
                                        options={categoryOption}
                                        placeholder={"Select tag"}
                                        onChange={(selectOption) => {
                                            setFieldValue(
                                                "categoryId",
                                                selectOption.value
                                            );
                                        }}
                                        onBlur={() => {
                                            handleBlur({ target: { name: "tag" } });
                                        }}
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
                            <ErrorMessage
                                component='div'
                                name={"contributor"}
                                className='error'
                            />
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
                                onDrop={(dropFiles) => {
                                    let event = {
                                        target: {
                                            name: "files",
                                            value: dropFiles,
                                        },
                                    };
                                    handleChange(event);
                                }}
                            />
                        </div>
                        <div className='check-submit'>
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
                                type='submit'
                                onClick={clickSubmitHandler}>
                                Submit
                            </button>
                        </div>
                    </Form>
                )}
            </Formik>
            {errorData.code !== 1 ?
                <ErrorMessagePopUp closebtn={setErrorData} errorMess={errorData.message} /> :
                <></>
            }
        </div>
    );
};

export default SubmitPage;
