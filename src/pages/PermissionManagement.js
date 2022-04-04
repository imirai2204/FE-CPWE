import React, { useState } from "react";
import "../styles/style.scss";
import { Formik, Form } from "formik";
import { TextField } from "../components/UI/Form/TextField";
import { EnhancedTable } from "../components/UI/Table/Table";
import { PermissionSchema } from "../validation";
import axios from "axios";
import { IdeaUrl, Authen } from "../api/EndPoint";
import { RequestHeader } from "../api/AxiosComponent";
import { Columns, Data } from "./dummy-data/permission-page";

const handleSubmit = async (values) => {
  var formData = new FormData();
  formData.append("permissionName", values.permissionName);

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

const initialValues = {
  permissionName: "",
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

function PermissionManagement() {
  const [permission, setPermission] = useState(true);

  if (permission) {
    return (
      <div className="permission-page container">
        <h2 className="page-title">Department</h2>
        <div className="layout-form">
          <Formik
            initialValues={initialValues}
            validationSchema={PermissionSchema}
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
              <Form className="submit-form">
                <div className="form-container">
                  <div className="input-section label-mark">
                    <TextField
                      label={"Permission Name"}
                      name='permissionName'
                      type='text'
                      placeholder='Type...'
                    />
                  </div>
                  <div className="input-section label-mark">
                    <TextField
                      label={"URL Link"}
                      name='permissionURL'
                      type='text'
                      placeholder='Type...'
                    />
                  </div>
                </div>
                <hr />
                <div className="list-button">
                  {/* <button className={"btn btn-warning"} type="button">
                                    Search
                                </button> */}
                  <button
                    className={'btn btn-info'}
                    type='reset'
                  >
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
            rows={Data}
            hasEditedBtn={false}
            hasDeletedBtn={true}
            hasDisabledBtn={true}
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
