import React, { useState, useEffect } from "react";
import axios from "axios";
import { Authen } from "../api/EndPoint";
import { RequestHeader } from "../api/AxiosComponent";

const AuthContext = React.createContext({
    isLoggedIn: false,
    hasError: false,
    onLogout: () => {},
    onLogIn: (values) => {},
});

export const AuthContextProvider = (props) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [hasError, setHasError] = useState(false);

    useEffect(() => {
        const isUserLoggedIn = localStorage.getItem("token");
        if (isUserLoggedIn !== null && isUserLoggedIn.length > 0) {
            setIsLoggedIn(true);
        }
    }, []);

    const logoutHandler = () => {
        localStorage.removeItem("token");
        setIsLoggedIn(false);
    };

    const loginHandler = async (values) => {
        const { ...data } = values;

        console.log("submit from auth-context!!!");

        const response = await axios
            .post(Authen.login, data, RequestHeader.loginHeader)
            .then((res) => {
                console.log(res.data);
                setIsLoggedIn(true);
                localStorage.setItem("token", res.data.data.token);
                localStorage.setItem("isLoggedIn", isLoggedIn);
            })
            .catch((error) => {
                if (error && error.response) {
                    console.log("Error: ", error);
                    setHasError(true);
                }
            });

        if (response && response.data) {
            setIsLoggedIn(true);
            console.log(response.data.data);
        }
    };

    return (
        <AuthContext.Provider
            value={{
                isLoggedIn,
                hasError,
                onLogout: logoutHandler,
                onLogIn: loginHandler,
            }}>
            {props.children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
