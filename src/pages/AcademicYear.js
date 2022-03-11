import React, { useContext } from "react";
import "../styles/style.scss";
import { Formik, Form } from "formik";
import { TextField } from "../components/UI/Form/TextField";
import { EnhancedTable } from "../components/UI/Table/Table";
import { AcademicYearSchema } from "../validation";
import axios from "axios";
import EditTableContext from "../store/edit-table-context";


function handleSubmit(values) {
    const body = {
        closureDate: values.closureDate,
        finalClosureDate: values.finalClosureDate,
        createDate: values.createDate,
        updateDate: values.updateDate,
    };

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

const initialValues = {
    id: 0,
    closureDate: "",
    finalClosureDate: "",
    createDate: new Date,
    updateDate: new Date,
    disable: false,
};

export const columns = [
    { id: "id", label: "ID", width: "5%", align: "center", style: { left: "13px" } },
    { id: "closureDate", label: "Closure Date", width: "35%", align: "left" },
    { id: "finalClosureDate", label: "Final closure Date", width: "35%", align: "left" },
    { id: "createDate", label: "Create Date", width: "10%", align: "left" },
    { id: "updateDate", label: "Update Date", width: "10%", align: "left" },
    { id: "disable", label: "Disable", width: "5%", align: "left" },
];

const data = [
    {
        id: 1,
        closureDate: "3/11/2022",
        finalClosureDate: "4/11/2022",
        createDate: "10/11/2022",
        updateDate: "22/11/2022",
        disable: false,
    },
    {
        id: 2,
        closureDate: "3/11/2022",
        finalClosureDate: "4/11/2022",
        createDate: "10/11/2022",
        updateDate: "22/11/2022",
        disable: false,
    },
    {
        id: 3,
        closureDate: "3/11/2022",
        finalClosureDate: "4/11/2022",
        createDate: "10/11/2022",
        updateDate: "22/11/2022",
        disable: false,
    },
    {
        id: 4,
        closureDate: "3/11/2022",
        finalClosureDate: "4/11/2022",
        createDate: "10/11/2022",
        updateDate: "22/11/2022",
        disable: false,
    },
    {
        id: 5,
        closureDate: "3/11/2022",
        finalClosureDate: "4/11/2022",
        createDate: "10/11/2022",
        updateDate: "22/11/2022",
        disable: false,
    },
    {
        id: 6,
        closureDate: "3/11/2022",
        finalClosureDate: "4/11/2022",
        createDate: "10/11/2022",
        updateDate: "22/11/2022",
        disable: false,
    },
    {
        id: 7,
        closureDate: "3/11/2022",
        finalClosureDate: "4/11/2022",
        createDate: "10/11/2022",
        updateDate: "22/11/2022",
        disable: false,
    },
    {
        id: 8,
        closureDate: "3/11/2022",
        finalClosureDate: "4/11/2022",
        createDate: "10/11/2022",
        updateDate: "22/11/2022",
        disable: false,
    },
    {
        id: 9,
        closureDate: "3/11/2022",
        finalClosureDate: "4/11/2022",
        createDate: "10/11/2022",
        updateDate: "22/11/2022",
        disable: false,
    },
    {
        id: 10,
        closureDate: "3/11/2022",
        finalClosureDate: "4/11/2022",
        createDate: "10/11/2022",
        updateDate: "22/11/2022",
        disable: false,
    },
    {
        id: 11,
        closureDate: "3/11/2022",
        finalClosureDate: "4/11/2022",
        createDate: "10/11/2022",
        updateDate: "22/11/2022",
        disable: false,
    },
];

function AcademicYear() {
    const editTableCtx = useContext(EditTableContext);

    return (<div className="academic-page container">
        <h2 className="page-title">Academic Year</h2>
        <div className="layout-form">
            <Formik
                initialValues={initialValues}
                validationSchema={AcademicYearSchema}
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
                                    label={"Year"}
                                    name='year'
                                    type='text'
                                    placeholder='Type...'
                                // value={editTableCtx.inputFieldValue}
                                // onChange={handleChange}
                                />
                            </div>
                            <div className="input-section">
                                <label className='label' htmlFor='closureDate'>
                                    Closure Date
                                </label>
                                <input type="date"
                                    id="start"
                                    name="closureDate"
                                />
                            </div>
                            <div className="input-section">
                                <label className='label' htmlFor='finalClosureDate'>
                                    Final closure date
                                </label>
                                <input
                                    name='finalClosureDate'
                                    id="end"
                                    type="date"
                                />
                            </div>
                        </div>
                        <hr />
                        <div className="list-button">
                            <button className={"btn btn-warning"} type="submit">
                                Search
                            </button>
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
                columns={columns}
                rows={data}
            />
        </div>
    </div>
    );
}

export default AcademicYear;
