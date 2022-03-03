import React from "react";
import "../styles/style.scss";
import { Formik, Form } from "formik";
import { TextField } from "../components/UI/Form/TextField";
import { StickyHeadTable } from "../components/UI/Table/Table"
// import { SignInSchema } from "../validation";

// function handleSubmit(values) {
//     const body = {
//         email: values.email,
//         password: values.password,
//     };

//     axios
//         .post(`http://localhost:3000/login`, body)
//         .then((res) => {
//             console.log(res);
//             console.log(res.data);
//             setTimeout(() => {
//                 alert("Login success");
//             }, 400);
//         })
//         .catch((error) => {
//             console.log(error);
//             setTimeout(() => {
//                 alert(error);
//             }, 400);
//         });
// }

export const columns = [
    { id: 'department', label: 'Department', minWidth: 170 },
]

const data = [
    {
        department: "Infomation Technology Department",
    },
    {
        department: "Human Resources Department",
    },
    {
        department: "Economics Department",
    },
    {
        department: "English and Comparative Literature Department",
    },
    {
        department: "Mechanical Engineering Department",
    },
    {
        department: "History Department",
    },
    {
        department: "Mathematics Department",
    }
]

function Department() {
    return (
        <div className="department-page">
            <h2 className='page-title'>Department</h2>
            <div className="layout-form">
                <Formik
                // initialValues={initialValues}
                // //validationSchema={SignInSchema}
                // onSubmit={(values, { setSubmitting }) => {
                //     handleSubmit(values);
                // }}
                >
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
                            <div className='input-section'>
                                <TextField
                                    label={"Title"}
                                    name='title'
                                    type='title'
                                    multiple
                                    placeholder='Title'
                                />
                            </div>
                            <div className='list-button'>
                                <button
                                    className='btn btn--noline'
                                    type='submit'>
                                    Cancel
                                </button>
                                <button
                                    className={'btn btn--medium'}
                                    type='submit'>
                                    Refresh
                                </button>
                                <button
                                    className={'btn btn--medium'}
                                    type='submit'>
                                    Save
                                </button>
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>
            <div className="layout-table">
                <StickyHeadTable
                    columns={columns}
                    rows={data}
                    keys="Home"
                />
            </div>
        </div>
    );
}

export default Department;
