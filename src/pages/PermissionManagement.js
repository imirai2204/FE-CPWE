import React, { useState, useEffect } from "react";
import "../styles/style.scss";
import { Formik, Form } from "formik";
import { TextField } from "../components/UI/Form/TextField";
import { EnhancedTable } from "../components/UI/Table/Table";
import { PermissionSchema } from "../validation";
import { PermissionUrl, Flag, Warn  } from "../api/EndPoint";
import { ColumnsPermission } from "../components/UI/Table/TableItems";
import { AxiosInstance } from "../api/AxiosClient";
import { useSelector, useDispatch } from "react-redux";
import ErrorMessagePopUp from "../components/UI/Modal/ErrorMessage";
import AuthorizationAPI from "../api/AuthorizationAPI";
import PageNotFound from "../404";

const handleSubmit = async (values, setIsSubmiting, setErrorData) => {
	await AxiosInstance.post(PermissionUrl.create, values, {
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

const handleGet = async (values, setReturnData, setPagination) => {
	const paramsValue = {
		searchKey: values === null || values.searchKey === null ? null : values.searchKey,
		page: values === null || values.page === null ? 1 : values.page,
		limit: values === null || values.limit === null ? 5 : values.limit,
		sortBy: values === null || values.sortBy === null ? "createdDate" : values.sortBy,
		sortType: values === null || values.sortType === null ? "DESC" : values.sortType,
	};
	await AxiosInstance.get(PermissionUrl.get, {
		headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
		params: paramsValue,
	})
		.then((res) => {
			console.log(res);
			var pagination = {
				page: res.data.data.page,
				size: res.data.data.size,
				totalPages: res.data.data.totalPages,
			};
			var tableData = res.data.data.content.map((content) => {
				return {
					permissionName: content.permissionName,
					permissionURL: content.permissionURL,
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

const initialValues = {
	permissionName: "",
	permissionURL: "",
};

function PermissionManagement() {
	const [permission, setPermission] = useState(true);
	const [returnData, setReturnData] = useState([]);
	const [returnPagination, setPagination] = useState({});
	const [isSubmiting, setIsSubmiting] = useState(false);
	const [errorData, setErrorData] = useState({
        code: 1,
        message: "ok"
    });
	const currentPage = useSelector((state) => state.table.page);
	const currentLimit = useSelector((state) => state.table.rowsPerPage);

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

	if (isSubmiting === false) {
		handleGet(null, setReturnData, setPagination);
		setIsSubmiting(true);
	}

	if (permission) {
		return (
			<div className="manageUser-page container">
				<h2 className="page-title">Permission</h2>
				<div className="layout-form">
					<Formik
						initialValues={initialValues}
						validationSchema={PermissionSchema}
						onSubmit={(values, { setSubmitting }) => {
							handleSubmit(values, setIsSubmiting, setErrorData);
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
							<Form className="submit-form">
								<div className="form-container">
									<div className='user-form'>
										<div className='layout-left'>
											<div className="input-section label-mark">
												<TextField
													label={"Permission Name"}
													name='permissionName'
													type='text'
													placeholder='Permission Name...'
												/>
											</div>
										</div>
										<div className='layout-right'>
											<div className="input-section label-mark">
												<TextField
													label={"Screen URL"}
													name='permissionURL'
													type='text'
													placeholder='Screen URL...'
												/>
											</div>
										</div>
									</div>
								</div>
								<hr />
								<div className="list-button">
									<button className={'btn btn-info'} type='reset'>
										Refresh
									</button>
									<button className={"btn btn-success"} type="submit">
										Save
									</button>
								</div>
							</Form>
						)}
					</Formik>
				</div>
				<div className="layout-table">
					<EnhancedTable
						columns={ColumnsPermission}
						hasDeletedBtn={true}
						rows={returnData}
						totalPages={returnPagination.totalPages}
					/>
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

export default PermissionManagement
