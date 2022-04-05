import React, { useState, useEffect } from "react";
import "../styles/style.scss";
import { ErrorMessage, Formik, Form } from "formik";
import { TextField } from "../components/UI/Form/TextField"
import { UserSchema, PasswordSchema } from "../validation";
import Select from "react-select";
import { DropzoneArea } from "material-ui-dropzone";
import { Gender } from "../components/Navbar/dropdown/DropdownItems";
import { AxiosInstance } from "../api/AxiosClient";
import { UserUrl, Authen, DepartmentUrl, RoleUrl } from "../api/EndPoint";
import { useSelector } from "react-redux";
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';

const handelUpdate = async (values) => {
    await AxiosInstance.post(UserUrl.update + values.userId, values, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    })
        .then(() => {
            console.log("Update success");
        })
        .catch((error) => {
            if (error && error.response) {
                console.log("Error: ", error);
            }
        });
};

const handelUpdatePassword = async (values) => {
    await AxiosInstance.post(UserUrl.update + values.userId, values, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    })
        .then(() => {
            console.log("Update success");
        })
        .catch((error) => {
            if (error && error.response) {
                console.log("Error: ", error);
            }
        });
};

const handleGet = async (values, setUserData) => {
    const paramsValue = {
        searchKey: values === null || values.searchKey === null ? null : values.searchKey,
        page: values === null || values.page === null ? 1 : values.page,
        limit: values === null || values.limit === null ? 5 : values.limit,
        sortBy: values === null || values.sortBy === null ? "userId" : values.sortBy,
        sortType: values === null || values.sortType === null ? "ASC" : values.sortType,
    };
    await AxiosInstance.get(UserUrl.get, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        params: paramsValue,
    })
        .then((res) => {
            // console.log(res);
            const userData = {
                userId: res.data.data.content[0].userId,
                firstname: res.data.data.content[0].firstname,
                lastname: res.data.data.content[0].lastname,
                email: res.data.data.content[0].email,
                departmentId: res.data.data.content[0].departmentId,
                roleId: res.data.data.content[0].roleId,
                phone: res.data.data.content[0].phone,
                address: res.data.data.content[0].address,
                sex: res.data.data.content[0].sex,
            };
            setUserData(userData);
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
        limit: values === null || values.limit === null ? 1 : values.limit,
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

const getRole = async (values, setRoleOption) => {
    const paramsValue = {
        searchKey: values === null || values.searchKey === null ? null : values.searchKey,
        page: values === null || values.page === null ? 1 : values.page,
        limit: values === null || values.limit === null ? 1 : values.limit,
        sortBy: values === null || values.sortBy === null ? "id" : values.sortBy,
        sortType: values === null || values.sortType === null ? "ASC" : values.sortType,
    };
    await AxiosInstance.get(RoleUrl.get, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        params: paramsValue,
    })
        .then((res) => {
            // console.log(res)
            var roleOption = res.data.data.map((content) => {
                return {
                    value: content.id,
                    label: content.name,
                    key: content.id,
                };
            });
            setRoleOption(roleOption);
        })
        .catch((error) => {
            if (error && error.response) {
                console.log("Error: ", error);
            }
        });
};

const checkPermission = async (setPermission) => {
    await AxiosInstance.post(Authen.checkPermission, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    })
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

// const initialValue = {
//     firstname: "",
//     lastname: "",
//     address: "",
//     sex: "",
//     email: "",
//     phone: "",
//     departmentId: 0,
//     roleId: 0,
//     userId: "",
// }

const initialPassword = {
    oldPassword: "",
    newPassword: "",
};

function UserDetails() {
    const [permission, setPermission] = useState(true);
    const [departmentOption, setDepartmentOption] = useState([]);
    const [roleOption, setRoleOption] = useState([]);
    const [userData, setUserData] = useState({});
    const userInfo = useSelector((state) => state.user.userInfo)
    const [value, setValue] = React.useState("info");
    const [passwordShown, setPasswordShown] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false);

    const togglePassword = () => {
        setPasswordShown(!passwordShown);
    };

    const initialValue = {
        firstname: userData.firstname,
        lastname: userData.lastname,
        address: userData.address,
        sex: userData.sex,
        email: userData.email,
        phone: userData.phone,
        departmentId: userData.departmentId,
        roleId: userData.roleId,
        userId: userData.userId,
    }

    const data = {
        userEmail: userInfo.email,
    }

    const dataEmail = {
        searchKey: data.userEmail,
        limit: 1,
        page: 1,
        sortBy: null,
        sortType: null,
    };

    const dataDepartment = {
        searchKey: initialValue.departmentId,
        limit: 1,
        page: 1,
        sortBy: null,
        sortType: null,
    };

    const dataRole = {
        searchKey: initialValue.roleId,
        limit: 1,
        page: 1,
        sortBy: null,
        sortType: null,
    };

    useEffect(() => {
        handleGet(dataEmail, setUserData);
        getDepartment(dataDepartment, setDepartmentOption);
        getRole(dataRole, setRoleOption);
        setIsLoaded(true)
    }, [userInfo]);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    if (permission) {
        return (
            <div className='manageUser-page container'>
                <h2 className='page-title'>User Detail</h2>
                <TabContext value={value}>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider', marginTop: '2rem' }}>
                        <TabList onChange={handleChange}
                            aria-label="Tab user setting"
                            centered
                        >
                            <Tab label="Change user info" value="info" sx={{ fontSize: '15px', fontWeight: '600' }} />
                            <Tab label="Change password" value="password" sx={{ fontSize: '15px', fontWeight: '600' }} />
                        </TabList>
                    </Box>
                    <TabPanel value="info">
                        <div className='layout-form'>
                            <Formik
                                enableReinitialize
                                initialValues={initialValue}
                                validationSchema={UserSchema}
                                onSubmit={(values, { setSubmitting }) => {
                                    handelUpdate(values);
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
                                            <div className='user-form'>
                                                <div className='layout-left'>
                                                    <div className='input-section label-mark'>
                                                        <TextField
                                                            label={"First Name"}
                                                            name='firstname'
                                                            type='text'
                                                            placeholder='First Name...'
                                                        />
                                                    </div>
                                                    <div className='input-section'>
                                                        <TextField
                                                            label={"Address"}
                                                            name='address'
                                                            type='text'
                                                            placeholder='Address...'
                                                        />
                                                    </div>
                                                    <div className='input-section label-mark'>
                                                        <TextField
                                                            label={"Email"}
                                                            name='email'
                                                            type='email'
                                                            placeholder='Email...'
                                                            readOnly
                                                            value={values.email}
                                                        />
                                                    </div>
                                                </div>
                                                <div className='layout-right'>
                                                    <div className='input-section label-mark'>
                                                        <TextField
                                                            label={"Last Name"}
                                                            name='lastname'
                                                            type='text'
                                                            placeholder='Last Name...'
                                                        />
                                                    </div>
                                                    <div className='input-section'>
                                                        <label className='label'>Gender</label>
                                                        <Select
                                                            className='select'
                                                            name='sex'
                                                            id='sex'
                                                            options={Gender}
                                                            placeholder={"Select Gender"}
                                                            onChange={(selectOption) => {
                                                                setFieldValue(
                                                                    "sex",
                                                                    selectOption.value
                                                                );
                                                            }}
                                                            onBlur={() => {
                                                                handleBlur({
                                                                    target: { name: "sex" },
                                                                });
                                                            }}
                                                            value={
                                                                Gender.filter(option => {
                                                                    return option.value === values.sex
                                                                })
                                                            }
                                                            maxMenuHeight={200}
                                                        />
                                                        <ErrorMessage
                                                            component='div'
                                                            name={"sex"}
                                                            className='error'
                                                        />
                                                    </div>
                                                    <div className='input-section'>
                                                        <TextField
                                                            label={"Phone"}
                                                            name='phone'
                                                            type='text'
                                                            placeholder='Phone...'
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            <hr />
                                            <div className='user-form'>
                                                <div className='layout-left'>
                                                    <div className='input-section'>
                                                        <TextField
                                                            label={"User ID"}
                                                            name='userId'
                                                            type='text'
                                                            placeholder='userId...'
                                                            readOnly
                                                            // onChange={}
                                                            value={values.userId}
                                                        />
                                                    </div>
                                                    <div className='input-section label-mark'>
                                                        <label className='label'>
                                                            Department
                                                        </label>
                                                        <Select
                                                            className='select'
                                                            name='departmentId'
                                                            id='department'
                                                            options={departmentOption}
                                                            placeholder={"Select Department"}
                                                            isDisabled={true}
                                                            onChange={(selectOption) => {
                                                                setFieldValue(
                                                                    "departmentId",
                                                                    selectOption.value
                                                                );
                                                            }}
                                                            onBlur={() => {
                                                                handleBlur({
                                                                    target: {
                                                                        name: "department",
                                                                    },
                                                                });
                                                            }}
                                                            value={
                                                                departmentOption.filter(option => {
                                                                    return option.value === values.departmentId
                                                                })
                                                            }
                                                            defaultValue={departmentOption[0]}
                                                            maxMenuHeight={200}
                                                        />
                                                        <ErrorMessage
                                                            component='div'
                                                            name={"departmentId"}
                                                            className='error'
                                                        />
                                                    </div>
                                                    <div className='input-section label-mark'>
                                                        <label className='label'>User Role</label>
                                                        <Select
                                                            className='select'
                                                            name='roleId'
                                                            id='roleId'
                                                            options={roleOption}
                                                            placeholder={"Select User Role"}
                                                            isDisabled={true}
                                                            onChange={(selectOption) => {
                                                                setFieldValue(
                                                                    "roleId",
                                                                    selectOption.value
                                                                );
                                                            }}
                                                            onBlur={() => {
                                                                handleBlur({
                                                                    target: { name: "roleId" },
                                                                });
                                                            }}
                                                            value={
                                                                roleOption.filter(option => {
                                                                    return option.value === values.roleId
                                                                })
                                                            }
                                                            defaultValue={roleOption[0]}
                                                            maxMenuHeight={200}
                                                        />
                                                        <ErrorMessage
                                                            component='div'
                                                            name={"roleId"}
                                                            className='error'
                                                        />
                                                    </div>
                                                </div>
                                                <div className='layout-right'>
                                                    <div className='input-section attachment'>
                                                        <label className='label' htmlFor='file'>
                                                            Avatar
                                                        </label>
                                                        <DropzoneArea
                                                            acceptedFiles={[
                                                                "image/*",
                                                            ]}
                                                            showPreviews={true}
                                                            maxFileSize={10000000}
                                                            fullWidth={true}
                                                            dropzoneText='Drop files to attach or browse'
                                                            filesLimit={1}
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
                                                </div>
                                            </div>
                                        </div>
                                        <hr />
                                        <div className='list-button'>
                                            <button className={"btn btn-info"} type='reset'>
                                                Refresh
                                            </button>
                                            <button className={"btn btn-success"} type='submit'>
                                                Update
                                            </button>
                                        </div>
                                    </Form>
                                )}
                            </Formik>
                        </div>
                    </TabPanel>
                    <TabPanel value="password">
                        <div className='layout-form'>
                            <Formik
                                enableReinitialize
                                initialValues={initialPassword}
                                validationSchema={PasswordSchema}
                                onSubmit={(values, { setSubmitting }) => {
                                    handelUpdatePassword(values);
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
                                                    label={"Old Password"}
                                                    name='oldPassword'
                                                    type={passwordShown ? "text" : "password"}
                                                    placeholder='Old Password...'
                                                    style={{ paddingRight: "30px" }}
                                                />
                                                <i
                                                    className={`fa ${passwordShown ? "fa-eye-slash" : "fa-eye"
                                                        } fa-lg password-icon`}
                                                    onClick={togglePassword}
                                                />
                                            </div>
                                            <div className='input-section label-mark'>
                                                <TextField
                                                    label={"New Password"}
                                                    name='newPassword'
                                                    type={passwordShown ? "text" : "password"}
                                                    placeholder='New Password...'
                                                    style={{ paddingRight: "30px" }}
                                                />
                                                <i
                                                    className={`fa ${passwordShown ? "fa-eye-slash" : "fa-eye"
                                                        } fa-lg password-icon`}
                                                    onClick={togglePassword}
                                                />
                                            </div>
                                            <div className='input-section label-mark'>
                                                <TextField
                                                    label={"Confirm Password"}
                                                    name='confirmPassword'
                                                    type={passwordShown ? "text" : "password"}
                                                    placeholder='Confirm Password...'
                                                    style={{ paddingRight: "30px" }}
                                                />
                                                <i
                                                    className={`fa ${passwordShown ? "fa-eye-slash" : "fa-eye"
                                                        } fa-lg password-icon`}
                                                    onClick={togglePassword}
                                                />
                                            </div>
                                        </div>
                                        <hr />
                                        <div className='list-button'>
                                            <button className={"btn btn-info"} type='reset'>
                                                Refresh
                                            </button>
                                            <button className={"btn btn-success"} type='submit'>
                                                Update
                                            </button>
                                        </div>
                                    </Form>
                                )}
                            </Formik>
                        </div>
                    </TabPanel>
                </TabContext>
            </div >
        );
    } else {
        return (
            <div>
                <p>You have no permission</p>
            </div>
        );
    }
};

export default UserDetails;
