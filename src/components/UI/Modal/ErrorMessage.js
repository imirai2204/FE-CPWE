import React from "react";
import "../../../styles/style.scss";
import CloseIcon from '@mui/icons-material/Close';

function ErrorMessagePopUp({closebtn, errorMess}) {
    var errorData = {
        code: 1,
        message: "ok",
    }
    return (
        <div className='mess-background'>
            <div className='overlay'></div>
            <div className='mess-container'>
                <div className='titlecloseBtn'>
                    <CloseIcon
                        onClick={() => closebtn(errorData)}
                        style={{
                            fontSize: "25px",
                            cursor: "pointer",
                        }}
                    />
                </div>
                <div className='mess-title'>
                    <h3>Error Message!</h3>
                </div>
                <div className='mess-body'>
                    <p>{errorMess}</p>
                </div>
                <div className='mess-footer'>
                    <button onClick={() => closebtn(errorData)}> OK </button>
                </div>
            </div>
        </div>
    );
}

export default ErrorMessagePopUp;
