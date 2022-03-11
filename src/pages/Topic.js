import React, { useContext } from "react";
import "../styles/style.scss";
import { Formik, Form } from "formik";
import { TextField } from "../components/UI/Form/TextField";
import { EnhancedTable } from "../components/UI/Table/Table";
import { TopicSchema } from "../validation";
import Select from "react-select";
import axios from "axios";
import EditTableContext from "../store/edit-table-context";
import {
    Departments,
    Topics,
} from "../components/Navbar/dropdown/DropdownItems";
import { ErrorMessage } from "formik";

function handleSubmit(values) {
    const body = {
        topicName: values.topicName,
        departmentName: values.departmentName,
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
    topicName: "",
    departmentName: "",
    closureDate: "",
    finalClosureDate: "",
    createDate: new Date,
    updateDate: new Date,
    disable: false,
};

export const columns = [
    { id: "id", label: "ID", width: "5%", align: "center", style: { left: "13px" } },
    { id: "department", label: "Department", width: "25%", align: "left" },
    { id: "closureDate", label: "Closure Date", width: "22.5%", align: "left" },
    { id: "finalClosureDate", label: "Final closure Date", width: "22.5%", align: "left" },
    { id: "createDate", label: "Create Date", width: "10%", align: "left" },
    { id: "updateDate", label: "Update Date", width: "10%", align: "left" },
    { id: "disable", label: "Disable", width: "5%", align: "left" },
];

const data = [
    {
        id: 1,
        department: "Information Technology Department",
        closureDate: "3/11/2022",
        finalClosureDate: "4/11/2022",
        createDate: "10/11/2022",
        updateDate: "22/11/2022",
        disable: false,
    },
    {
        id: 2,
        department: "Human Resources Department",
        closureDate: "3/11/2022",
        finalClosureDate: "4/11/2022",
        createDate: "10/11/2022",
        updateDate: "22/11/2022",
        disable: false,
    },
    {
        id: 3,
        department: "Economics Department",
        closureDate: "3/11/2022",
        finalClosureDate: "4/11/2022",
        createDate: "10/11/2022",
        updateDate: "22/11/2022",
        disable: false,
    },
    {
        id: 4,
        department: "English and Comparative Literature Department",
        closureDate: "3/11/2022",
        finalClosureDate: "4/11/2022",
        createDate: "10/11/2022",
        updateDate: "22/11/2022",
        disable: false,
    },
    {
        id: 5,
        department: "Mechanical Engineering Department",
        closureDate: "3/11/2022",
        finalClosureDate: "4/11/2022",
        createDate: "10/11/2022",
        updateDate: "22/11/2022",
        disable: false,
    },
    {
        id: 6,
        department: "History Department",
        closureDate: "3/11/2022",
        finalClosureDate: "4/11/2022",
        createDate: "10/11/2022",
        updateDate: "22/11/2022",
        disable: false,
    },
    {
        id: 7,
        department: "Mathematics Department",
        closureDate: "3/11/2022",
        finalClosureDate: "4/11/2022",
        createDate: "10/11/2022",
        updateDate: "22/11/2022",
        disable: false,
    },
    {
        id: 8,
        department: "English and Comparative Literature Department",
        closureDate: "3/11/2022",
        finalClosureDate: "4/11/2022",
        createDate: "10/11/2022",
        updateDate: "22/11/2022",
        disable: false,
    },
    {
        id: 9,
        department: "Mechanical Engineering Department",
        closureDate: "3/11/2022",
        finalClosureDate: "4/11/2022",
        createDate: "10/11/2022",
        updateDate: "22/11/2022",
        disable: false,
    },
    {
        id: 10,
        department: "History Department",
        closureDate: "3/11/2022",
        finalClosureDate: "4/11/2022",
        createDate: "10/11/2022",
        updateDate: "22/11/2022",
        disable: false,
    },
    {
        id: 11,
        department: "Mathematics Department",
        closureDate: "3/11/2022",
        finalClosureDate: "4/11/2022",
        createDate: "10/11/2022",
        updateDate: "22/11/2022",
        disable: false,
    },
];

function Topic() {
    const editTableCtx = useContext(EditTableContext);
    return (<div className="topic-page container">
        <h2 className="page-title">Topic</h2>
        <div className="layout-form">
            <Formik
                initialValues={initialValues}
                validationSchema={TopicSchema}
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
                                    label={"Topic name"}
                                    name='topic'
                                    type='text'
                                    placeholder='Type...'
                                // value={editTableCtx.inputFieldValue}
                                // onChange={handleChange}
                                />
                            </div>
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

export default Topic;
