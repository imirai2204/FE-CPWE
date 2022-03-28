import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userLogin } from "../redux-store/auth/auth.actions";
import "../styles/style.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import { Formik, Form } from "formik";
import { TextField } from "../components/UI/Form/TextField";
import { SignInSchema } from "../validation";
import ErrorMessage from "../components/UI/Modal/ErrorMessage";

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
    const dispatch = useDispatch();
    const auth = useSelector((state) => state.auth);
    const [loginData, setLoginData] = useState(null);
    const [passwordShown, setPasswordShown] = useState(false);
    const [hasError, setHasError] = useState(false);

    useEffect(() => {
        if (loginData === null) {
            return;
        }
        dispatch(userLogin(loginData));
        setLoginData(null);
    }, [loginData, auth, dispatch]);

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
        setLoginData(values);
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
                                    style={{paddingRight: "30px"}}
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
                            {auth.isLoggedIn && <p>Login Success!</p>}
                        </Form>
                    )}
                </Formik>
            </div>
            <div className='login-background'></div>
            {auth.hasError && <ErrorMessage closebtn={setHasError} />}
        </div>
    );
};

export default Login;
