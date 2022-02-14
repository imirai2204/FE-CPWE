import React from "react";
import '../styles/style.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Formik, Form } from 'formik';
import { TextField } from "../components/TextField";
import { SignInSchema } from "../validation";
import axios from 'axios';

function handleSubmit(values) {
    const body = {
        email: values.email,
        password: values.password,
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

function Login() {
    const style = {
        display: "block",
        marginLeft: "auto",
        marginTop: "45px"
    }
    return (
        <div className="login-layout">
            <div className="login-background"></div>
            <div className="login-panel">
                <div className="login-panel_header">
                    <img
                        src="https://login.gre.ac.uk/adfs/portal/logo/logo.png?…538EB3FABAABC3793D0C5F3536FC0544363DE7FA844246655"
                        className="logoImage"
                        alt="University of Greenwich"
                    />
                </div>
                <h1 className="login-title">Sign in</h1>
                <Formik
                    initialValues={{
                        email: "",
                        password: ""
                    }}
                    validationSchema={SignInSchema}
                    onSubmit={(values, { setSubmitting }) => handleSubmit(values)}
                >
                    {({
                        isSubmiting,
                        handleChange,
                        handleBlur,
                        handleSubmit,
                        values,
                        errors,
                        touched,
                    }) => (
                        <Form className="login-form">
                            <div className="input-section">
                                <TextField lable="Email" name="email" type="email" placeholder="Username@gre.ac.uk" />
                            </div>
                            <div className="input-section">
                                <TextField lable="Password" name="password" type="password" placeholder="Password" />
                            </div>
                            <div className="text-right">
                                <button 
                                    className="btn btn__blue-B8" 
                                    type="submit"
                                    style={style}
                                >Sign in</button>
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    )
}

export default Login