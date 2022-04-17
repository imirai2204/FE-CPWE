import React, { useState, useEffect } from "react";
import "../../../styles/style.scss";
import CloseIcon from '@mui/icons-material/Close';
import { authActions } from "../../../redux-store/auth/auth.slice";
import { useDispatch, useSelector } from "react-redux";

function ErrorMessagePopUp({ closebtn, errorMess }) {
    const dispatch = useDispatch();
    const [closePopUp, setClosePopUp] = useState(false);

    var errorData = {
        code: 0,
        message: "ok",
    }

    useEffect(() => {
        if (closePopUp === false) {
            return;
        }
        dispatch(
            authActions.failLogin({
                errorCode: 0,
                errorMessage: ""
            })
        );
        setClosePopUp(false);
    }, [closePopUp]);

    return (
        <div className='mess-background'>
            <div className='overlay'></div>
            <div className='mess-container'>
                <div className='titlecloseBtn'>
                    <CloseIcon
                        onClick={() => {
                            closebtn(errorData);
                            setClosePopUp(true);
                        }}
                        style={{
                            fontSize: "25px",
                            cursor: "pointer",
                        }}
                    />
                </div>
                <div className='mess-title'>
                    <h3>Message!</h3>
                </div>
                <div className='mess-body'>
                    <p>{errorMess}</p>
                </div>
                <div className='mess-footer'>
                    <button onClick={() => {
                        closebtn(errorData);
                        setClosePopUp(true);
                    }}> OK </button>
                </div>
            </div>
        </div>
    );
}

export default ErrorMessagePopUp;
