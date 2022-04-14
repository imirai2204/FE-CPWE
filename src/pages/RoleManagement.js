import React, { useState, useEffect } from "react";
import "../styles/style.scss";
import { ErrorMessage, Formik, Form } from "formik";
import { TextField } from "../components/UI/Form/TextField";
import { EnhancedTable } from "../components/UI/Table/Table";
import { RoleSchema } from "../validation";
import { ColumnsRole } from "../components/UI/Table/TableItems";
import Select from "react-select";
import { RoleUrl, PermissionUrl, Flag, Warn } from "../api/EndPoint";
import { AxiosInstance } from "../api/AxiosClient";
import { useSelector, useDispatch } from "react-redux";
import ErrorMessagePopUp from "../components/UI/Modal/ErrorMessage";
import { pageActions } from "../redux-store/table/table.slice"
import AuthorizationAPI from "../api/AuthorizationAPI";
import PageNotFound from "../404";

const handleSubmit = async (values, optionValues, setIsSubmiting, setErrorData) => {
    let optionItem = optionValues.map((option) => {
        return option.value
    });

    const body = {
        name: values.roleName,
        permission: optionItem
    }

    await AxiosInstance.post(RoleUrl.create, body, {
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

const handelUpdate = async (values, optionValues, setIsSubmiting, setErrorData) => {
    let optionItem = optionValues.map((option) => {
        return option.value
    });

    const body = {
        name: values.roleName,
        permission: optionItem
    }

    await AxiosInstance.post(RoleUrl.update + values.id, body, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    })
        .then((res) => {
            var errorData = {
                code: res.data.code,
                message: res.data.message,
            }
            setErrorData(errorData);
            console.log("update success");
            setIsSubmiting(false);
        })
        .catch((error) => {
            if (error && error.response) {
                console.log("Error: ", error);
            }
        });
};

const handleGet = async (values, setReturnData, setPagination) => {
    // console.log(values);
    const paramsValue = {
        searchKey: values === null || values.searchKey === null ? null : values.searchKey,
        page: values === null || values.page === null ? 1 : values.page,
        limit: values === null || values.limit === null ? 5 : values.limit,
        sortBy: values === null || values.sortBy === null ? "id" : values.sortBy,
        sortType: values === null || values.sortType === null ? "ASC" : values.sortType,
    };
    await AxiosInstance.get(RoleUrl.get, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        params: paramsValue,
    })
        .then((res) => {
            // console.log(res);
            var pagination = {
                page: res.data.data.page,
                size: res.data.data.size,
                totalPages: res.data.data.totalPages,
            };
            var tableData = res.data.data.content.map((content) => {
                return {
                    id: content.id,
                    roleName: content.name,
                    key: content.id,
                    permission: content.count,
                    listItem: content.listPermission.map((item) => {
                        return {
                            permissionId: item.id,
                            permissionName: item.name,
                        }
                    })
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

const getPermission = async (values, setPermissionOption) => {
    const paramsValue = {
        searchKey: values === null || values.searchKey === null ? null : values.searchKey,
        page: values === null || values.page === null ? 1 : values.page,
        limit: values === null || values.limit === null ? 100 : values.limit,
        sortBy: values === null || values.sortBy === null ? "id" : values.sortBy,
        sortType: values === null || values.sortType === null ? "ASC" : values.sortType,
    };
    await AxiosInstance.get(PermissionUrl.get, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        params: paramsValue,
    })
        .then((res) => {
            // console.log(res)
            var permissionOption = res.data.data.map((content) => {
                return {
                    value: content.id,
                    label: content.name,
                    key: content.id,
                };
            });
            setPermissionOption(permissionOption);
        })
        .catch((error) => {
            if (error && error.response) {
                console.log("Error: ", error);
            }
        });
};

const initialValues = {
    roleName: "",
    id: ""
};

function RoleManagement() {
    const dispatch = useDispatch();
    const [permission, setPermission] = useState(true);
    const [returnData, setReturnData] = useState([]);
    const [returnPagination, setPagination] = useState({});
    const [isSubmiting, setIsSubmiting] = useState(false);
    const [errorData, setErrorData] = useState({
        code: 1,
        message: "ok"
    });
    const [permissionOption, setPermissionOption] = useState([]);
    const currentPage = useSelector((state) => state.table.page);
    const currentLimit = useSelector((state) => state.table.rowsPerPage);
    const [isChecked, setIsChecked] = useState(false);
    const [optionValues, setOptionValues] = useState([]);
    const itemIndex = useSelector((state) => state.table.itemIndex);
    const [isResetting, setIsResetting] = useState(false);

    if (isResetting === true) {
        dispatch(
            pageActions.updateItemIndex({
                itemIndex: null,
            })
        );
        setIsResetting(false);
    }

    const tableDatas = {
        searchKey: null,
        limit: currentLimit,
        page: currentPage,
        sortBy: null,
        sortType: null,
    };

    const onChangeCheckbox = () => {
        setIsChecked(!isChecked)
        setOptionValues(!isChecked ? permissionOption : optionValues)
    }

    const handleChangeOption = (option) => {
        const allOptionsSelected = option.length === permissionOption.length;
        setIsChecked(allOptionsSelected ? true : false)
        setOptionValues(option)
    }

    useEffect(() => {
        AuthorizationAPI(Flag.manageSemester, setPermission)
    }, [permission])

    useEffect(() => {
        if (permission === true) {
            handleGet(tableDatas, setReturnData, setPagination);
        }
    }, [permission, currentPage, currentLimit]);

    if (isSubmiting === false) {
        handleGet(null, setReturnData, setPagination);
        getPermission(null, setPermissionOption);
        setIsSubmiting(true);
    }

    if (permission) {
        return (
            <div className='department-page container'>
                <h2 className='page-title'>Role Management</h2>
                <div className='layout-form'>
                    <Formik
                        initialValues={initialValues}
                        validationSchema={RoleSchema}
                        onSubmit={(values, { setSubmitting }) => {
                            handleSubmit(values, optionValues, setIsSubmiting, setErrorData);
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
                                    <div className='input-section label-mark'>
                                        <TextField
                                            label={"Role Name"}
                                            name='roleName'
                                            type='text'
                                            placeholder='Role Name...'
                                        />
                                    </div>
                                    <div className='input-section label-mark'>
                                        <label className='label'>Permission</label>
                                        <Select
                                            className='select'
                                            name='permission'
                                            id='permission'
                                            isMulti
                                            options={permissionOption}
                                            placeholder={"Select Permission"}
                                            onChange={(selectOption) => {
                                                setFieldValue(
                                                    "permission",
                                                    selectOption.value
                                                );
                                                handleChangeOption(selectOption);
                                            }}
                                            onBlur={() => {
                                                handleBlur({
                                                    target: { name: "permission" },
                                                });
                                            }}
                                            // components={{ Option }}
                                            closeMenuOnSelect={false}
                                            hideSelectedOptions={false}
                                            maxMenuHeight={200}
                                            menuPortalTarget={document.body}
                                            styles={{
                                                menuPortal: (base) => ({
                                                    ...base,
                                                    zIndex: 9999,
                                                }),
                                                menu: (base) => ({
                                                    ...base,
                                                    fontSize: "15px",
                                                    color: "#707070",
                                                }),
                                            }}
                                            value={optionValues}
                                        />
                                        <label className='checkbox'>
                                            <input
                                                type='checkbox'
                                                onChange={() => onChangeCheckbox()}
                                                checked={isChecked}
                                            />
                                            <span></span>
                                            Select all
                                        </label>
                                        <ErrorMessage
                                            component='div'
                                            name={"permission"}
                                            className='error'
                                        />
                                    </div>
                                </div>
                                <hr />
                                <div className='list-button'>
                                    <button
                                        className={"btn btn-warning"}
                                        type='button'
                                        disabled={itemIndex === null ? true : false}
                                        onClick={
                                            () => isValid === true ?
                                                handelUpdate(values, optionValues, setIsSubmiting, setErrorData) :
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
                                        disabled={itemIndex === null ? false : true}
                                    >
                                        Create
                                    </button>
                                </div>
                                <div className='layout-table'
                                    style={{ marginTop: "5rem" }}
                                >
                                    <EnhancedTable
                                        columns={ColumnsRole}
                                        rows={returnData}
                                        hasViewedBtn={true}
                                        hasEditedBtn={true}
                                        totalPages={returnPagination.totalPages}
                                        setFieldValue={setFieldValue}
                                        formikValue={values}
                                        setOptionValues={setOptionValues}
                                        type={"role"}
                                    />
                                </div>
                            </Form>
                        )}
                    </Formik>
                </div>
                {errorData.code !== 1 ?
                    <ErrorMessagePopUp closebtn={setErrorData} errorMess={errorData.message} /> :
                    <></>
                }
            </div>
        );
    } else {
        return (
            <PageNotFound warn={Warn.noPermission} />
        );
    }
}

export default RoleManagement;
