import React, { useState, useContext } from "react";
import "../styles/style.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import { Formik, Form } from "formik";
import { TextField } from "../components/UI/Form/TextField";
import { SignInSchema } from "../validation";
import axios from "axios";
import ErrorMessage from "../components/UI/Modal/ErrorMessage";
import { Authen } from "../api/EndPoint";
import { RequestHeader } from "../api/AxiosComponent";
import UserCardContext from "../store/user-card-context";
import AuthContext from "../store/auth-context";

const style = {
    display: "block",
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: "45px",
};

const initialValues = {
    email: "",
    password: "",
};

const Login = () => {
    const [passwordShown, setPasswordShown] = useState(false);
    const [hasError, setHasError] = useState(false);
    const [isSuccessLogin, setIsSuccessLogin] = useState(false);
    const userCardCtx = useContext(UserCardContext);
    const authCtx = useContext(AuthContext);

    const togglePassword = () => {
        setPasswordShown(!passwordShown);
    };

    const handleCheckBox = () => {
        console.log("test");
    };

    if (hasError) {
        document.body.classList.add("active-modal");
    } else {
        document.body.classList.remove("active-modal");
    }

    const clickLoginButtonHandler = () => {
        setHasError(true);
    };

    const handleSubmit = async (values) => {
        authCtx.onLogIn(values);
        // const { ...data } = values;

        // const response = await axios
        //     .post(Authen.login, data, RequestHeader.loginHeader)
        //     .then((res) => {
        //         console.log(res.data);
        //         setIsSuccessLogin(true);
        //         localStorage.setItem("token", res.data.data.token);
        //         localStorage.setItem("isLogin", isSuccessLogin);
        //         userCardCtx.getUserInfo(res.data.data.user);
        //     })
        //     .catch((error) => {
        //         if (error && error.response) {
        //             console.log("Error: ", error);
        //             setHasError(true);
        //         }
        //     });

        // if (response && response.data) {
        //     setIsSuccessLogin(true);
        //     console.log(response.data.data);
        // }
    };

    return (
        <div className='login-layout'>
            <div className='login-panel'>
                <div className='login-panel_header'></div>
                <h2 className='login-title'>Login</h2>
                <Formik
                    initialValues={initialValues}
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
                                    name='email'
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
                                    style={style}
                                    onClick={clickLoginButtonHandler}>
                                    LOGIN
                                </button>
                            </div>
                            {authCtx.isLoggedIn && <p>Login Success!</p>}
                        </Form>
                    )}
                </Formik>
            </div>
            <div className='login-background'></div>
            {authCtx.hasError && <ErrorMessage closebtn={setHasError} />}
        </div>
    );
};

export default Login;
