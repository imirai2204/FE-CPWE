import React, { useState } from "react";
import "../styles/style.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import { Formik, Form } from "formik";
import { TextField } from "../components/UI/Form/TextField";
import { SignInSchema } from "../validation";
import axios from "axios";

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
        marginRight: "auto",
        marginTop: "45px",
    };

    const [passwordShown, setPasswordShown] = useState(false);

    const togglePassword = () => {
        setPasswordShown(!passwordShown);
    };

    const handleCheckBox = () => {
        console.log("test");
    };

    return (
        <div className='login-layout'>
            <div className='login-panel'>
                <div className='login-panel_header'></div>
                <h2 className='login-title'>Login</h2>
                <Formik
                    initialValues={{
                        email: "",
                        password: "",
                    }}
                    validationSchema={SignInSchema}
                    onSubmit={(values, { setSubmitting }) => handleSubmit(values)}>
                    {({
                        isSubmiting,
                        handleChange,
                        handleBlur,
                        handleSubmit,
                        values,
                        errors,
                        touched,
                    }) => (
                        <Form className='login-form'>
                            <div className='input-section'>
                                <TextField
                                    name='mail'
                                    type='email'
                                    placeholder='Email'
                                />
                            </div>
                            <div className='input-section'>
                                <TextField
                                    name='password'
                                    type={passwordShown ? "text" : "password"}
                                    placeholder='Password'
                                />
                                <i
                                    className={`fa ${
                                        passwordShown ? "fa-eye-slash" : "fa-eye"
                                    } fa-lg password-icon`}
                                    onClick={togglePassword}
                                />
                            </div>
                            <label className='checkbox'>
                                <input type='checkbox' onChange={handleCheckBox} />
                                <span></span>
                                Remember login
                            </label>
                            <div className='text-right'>
                                <button
                                    className='btn btn--linear'
                                    type='submit'
                                    style={style}>
                                    LOGIN
                                </button>
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>
            <div className='login-background'></div>
        </div>
    );
}

export default Login;
