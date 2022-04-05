import React, { useState, useEffect } from "react";
import "../styles/style.scss";
import { Formik, Form } from "formik";
import { TextField } from "../components/UI/Form/TextField";
import { EnhancedTable } from "../components/UI/Table/Table";
import { PermissionSchema } from "../validation";
import { PermissionUrl, Authen } from "../api/EndPoint";
import { Columns, Data } from "./dummy-data/permission-page";
import { AxiosInstance } from "../api/AxiosClient";
import { useSelector, useDispatch } from "react-redux";

const handleSubmit = async (values, setIsSubmiting) => {
	await AxiosInstance.post(PermissionUrl.create, values, {
		headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
	})
		.then(() => {
			console.log("Create success");
			setIsSubmiting(false);
		})
		.catch((error) => {
			if (error && error.response) {
				console.log("Error: ", error);
			}
		});
};

const handleGet = async (values, setReturnData, returnData, setPagination) => {
    const paramsValue = {
        searchKey: values === null || values.searchKey === null ? null : values.searchKey,
        page: values === null || values.page === null ? 1 : values.page,
        limit: values === null || values.limit === null ? 5 : values.limit,
        sortBy: values === null || values.sortBy === null ? "userId" : values.sortBy,
        sortType: values === null || values.sortType === null ? "ASC" : values.sortType,
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

const initialValues = {
	permissionName: "",
	permissionURL: "",
};

function PermissionManagement() {
	const [permission, setPermission] = useState(true);
	const [returnData, setReturnData] = useState([]);
	const [returnPagination, setPagination] = useState({});
	const [isSubmiting, setIsSubmiting] = useState(false);
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
        handleGet(tableDatas, setReturnData, returnData, setPagination);
    }, [currentPage, currentLimit]);

	if (isSubmiting === false) {
        handleGet(null, setReturnData, returnData, setPagination);
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
							handleSubmit(values, setIsSubmiting);
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
						columns={Columns}
						hasDeletedBtn={true}
						rows={returnData}
						totalPages={returnPagination.totalPages}
					/>
				</div>
			</div>
		);
	} else {
		return (
			<div>
				<p>You have no permission</p>
			</div>
		);
	}
}

export default PermissionManagement
