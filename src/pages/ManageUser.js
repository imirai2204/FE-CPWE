import React, { useState, useEffect } from "react";
import "../styles/style.scss";
import { ErrorMessage, Formik, Form } from "formik";
import { TextField } from "../components/UI/Form/TextField";
import { EnhancedTable } from "../components/UI/Table/Table";
import { UserSchema } from "../validation";
import Select from "react-select";
import { ColumnsUser } from "../components/UI/Table/TableItems";
import { Gender } from "../components/Navbar/dropdown/DropdownItems";
import { UserUrl, DepartmentUrl, RoleUrl, Flag, Warn } from "../api/EndPoint";
import { AxiosInstance } from "../api/AxiosClient";
import { useSelector, useDispatch } from "react-redux";
import { pageActions } from "../redux-store/table/table.slice"
import ErrorMessagePopUp from "../components/UI/Modal/ErrorMessage";
import AuthorizationAPI from "../api/AuthorizationAPI";
import PageNotFound from "../404";

const handleSubmit = async (values, setIsSubmiting, setErrorData) => {
    await AxiosInstance.post(UserUrl.create, values, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    })
        .then((res) => {
            var errorData = {
                code: res.data.code,
                message: res.data.message,
            }
            setErrorData(errorData);
            console.log("Create success");
            setIsSubmiting(false);
        })
        .catch((error) => {
            if (error && error.response) {
                console.log("Error: ", error);
            }
        });
};

const handelUpdate = async (values, setIsSubmiting, setErrorData) => {
    await AxiosInstance.post(UserUrl.update + values.userId, values, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    })
        .then((res) => {
            var errorData = {
                code: res.data.code,
                message: res.data.message,
            }
            setErrorData(errorData);
            console.log("Update success");
            setIsSubmiting(false);
        })
        .catch((error) => {
            if (error && error.response) {
                console.log("Error: ", error);
            }
        });
};

const handleGet = async (values, setReturnData, setPagination) => {
    const paramsValue = {
        searchKey: values === null || values.searchKey === null ? null : values.searchKey,
        page: values === null || values.page === null ? 1 : values.page,
        limit: values === null || values.limit === null ? 5 : values.limit,
        sortBy: values === null || values.sortBy === null ? "createdDate" : values.sortBy,
        sortType: values === null || values.sortType === null ? "DESC" : values.sortType,
    };
    await AxiosInstance.get(UserUrl.get, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        params: paramsValue,
    })
        .then((res) => {
            var pagination = {
                page: res.data.data.page,
                size: res.data.data.size,
                totalPages: res.data.data.totalPages,
            };
            var tableData = res.data.data.content.map((content) => {
                var firstname = content.firstname;
                var lastname = content.lastname;
                return {
                    id: content.userId,
                    firstname: firstname,
                    lastname: lastname,
                    fullname: firstname + " " + lastname,
                    email: content.email,
                    department: content.department,
                    departmentId: content.departmentId,
                    role: content.role,
                    roleId: content.roleId,
                    phone: content.phone,
                    address: content.address,
                    sex: content.sex,
                };
            });
            setReturnData(tableData);
            setPagination(pagination);
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
        limit: values === null || values.limit === null ? 100 : values.limit,
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
        limit: values === null || values.limit === null ? 100 : values.limit,
        sortBy: values === null || values.sortBy === null ? "id" : values.sortBy,
        sortType: values === null || values.sortType === null ? "ASC" : values.sortType,
        selectBox: true,
    };
    await AxiosInstance.get(RoleUrl.get, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        params: paramsValue,
    })
        .then((res) => {
            // console.log(res)
            var roleOption = res.data.data.content.map((content) => {
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

const initialValue = {
    firstname: "",
    lastname: "",
    address: "",
    sex: "",
    email: "",
    phone: "",
    departmentId: 0,
    roleId: 0,
    userId: "",
};

function ManageUser() {
    const dispatch = useDispatch();
    const [permission, setPermission] = useState(true);
    const [returnData, setReturnData] = useState([]);
    const [returnPagination, setPagination] = useState({});
    const [isSubmiting, setIsSubmiting] = useState(false);
    const [errorData, setErrorData] = useState({
        code: 1,
        message: "ok"
    });
    const [departmentOption, setDepartmentOption] = useState([]);
    const [roleOption, setRoleOption] = useState([]);
    const currentPage = useSelector((state) => state.table.page);
    const currentLimit = useSelector((state) => state.table.rowsPerPage);
    const itemIndex = useSelector((state) => state.table.itemIndex);
    const [isResetting, setIsResetting] = useState(false);

    const tableDatas = {
        searchKey: null,
        limit: currentLimit,
        page: currentPage,
        sortBy: null,
        sortType: null,
    };

    useEffect(() => {
        AuthorizationAPI(Flag.manageSemester, setPermission)
    }, [permission])

    useEffect(() => {
        if (permission === true) {
            handleGet(tableDatas, setReturnData, setPagination);
        }
    }, [permission, currentPage, currentLimit]);


    if (isResetting === true) {
        dispatch(
            pageActions.updateItemIndex({
                itemIndex: null,
            })
        );
        setIsResetting(false);
    }

    if (isSubmiting === false) {
        handleGet(null, setReturnData, setPagination);
        getDepartment(null, setDepartmentOption);
        getRole(null, setRoleOption);
        setIsSubmiting(true);
    }

    if (permission) {
        return (
            <div className='manageUser-page container'>
                <h2 className='page-title'>Manage User</h2>
                <div className='layout-form'>
                    <Formik
                        enableReinitialize
                        initialValues={initialValue}
                        validationSchema={UserSchema}
                        onSubmit={(values, { setSubmitting }) => {
                            handleSubmit(values, setIsSubmiting, setErrorData);
                            // console.log(values)
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
                            isValid,
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
                                                    value={values.firstname}
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
                                                    value={values.lastname}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className='user-form'>
                                        <div className='layout-left'>
                                            <div className='input-section label-mark'>
                                                <TextField
                                                    label={"Email"}
                                                    name='email'
                                                    type='email'
                                                    placeholder='Email...'
                                                    disabled={itemIndex === null ? false : true}
                                                />
                                            </div>
                                        </div>
                                        <div className='layout-right'>
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
                                    <div className='user-form'>
                                        <div className='layout-left'>
                                            <div className='input-section'>
                                                <TextField
                                                    label={"Address"}
                                                    name='address'
                                                    type='text'
                                                    placeholder='Address...'
                                                    value={values.address}
                                                />
                                            </div>
                                        </div>
                                        <div className='layout-right'>
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
                                                    defaultValue={Gender[0]}
                                                    maxMenuHeight={200}
                                                />
                                                <ErrorMessage
                                                    component='div'
                                                    name={"sex"}
                                                    className='error'
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <hr />
                                    <div
                                        className='input-section'
                                        style={{ width: "45%" }}>
                                        <TextField
                                            label={"User ID"}
                                            name='userId'
                                            type='text'
                                            placeholder='userId...'
                                            readOnly
                                            value={values.userId}
                                        />
                                    </div>
                                    <div className='user-form'>
                                        <div className='layout-left'>
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
                                                    onChange={(selectOption) => {
                                                        setFieldValue(
                                                            "departmentId",
                                                            selectOption.value
                                                        );
                                                    }}
                                                    onBlur={() => {
                                                        handleBlur({
                                                            target: {
                                                                name: "departmentId",
                                                            },
                                                        });
                                                    }}
                                                    value={
                                                        departmentOption.filter(option => {
                                                            return option.value === values.departmentId
                                                        })
                                                    }
                                                    maxMenuHeight={200}
                                                />
                                                <ErrorMessage
                                                    component='div'
                                                    name={"departmentId"}
                                                    className='error'
                                                />
                                            </div>
                                        </div>
                                        <div className='layout-right'>
                                            <div className='input-section label-mark'>
                                                <label className='label'>User Role</label>
                                                <Select
                                                    className='select'
                                                    name='roleId'
                                                    id='roleId'
                                                    options={roleOption}
                                                    placeholder={"Select User Role"}
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
                                                    maxMenuHeight={200}
                                                />
                                                <ErrorMessage
                                                    component='div'
                                                    name={"roleId"}
                                                    className='error'
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <hr />
                                <div className='list-button'>
                                    <button
                                        className={"btn btn-warning"}
                                        type='button'
                                        disabled={values.userId === "" || values.userId === null ? true : false}
                                        onClick={
                                            () => isValid === true ?
                                                handelUpdate(values, setIsSubmiting) :
                                                console.log("update fail")
                                        }
                                    >
                                        Update
                                    </button>
                                    <button
                                        className={"btn btn-info"}
                                        type='reset'
                                        onClick={() => setIsResetting(true)}
                                    >
                                        Refresh
                                    </button>
                                    <button
                                        className={"btn btn-success"}
                                        type='submit'
                                        disabled={values.userId === "" || values.userId === null ? false : true}
                                    >
                                        Create
                                    </button>
                                </div>
                                <div className='layout-table'
                                    style={{ marginTop: "5rem" }}
                                >
                                    <EnhancedTable
                                        columns={ColumnsUser}
                                        rows={returnData}
                                        hasEditedBtn={true}
                                        totalPages={returnPagination.totalPages}
                                        setFieldValue={setFieldValue}
                                        formikValue={values}
                                        type={"user"}
                                    />
                                </div>
                            </Form>
                        )
                        }
                    </Formik >
                </div >
                {
                    errorData.code !== 1 ?
                        <ErrorMessagePopUp closebtn={setErrorData} errorMess={errorData.message} /> :
                        <></>
                }
            </div >
        );
    } else {
        return (
            <PageNotFound warn={Warn.noPermission} />
        );
    }
}

export default ManageUser;
