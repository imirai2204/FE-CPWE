import React from 'react'
//import "./message.css";
import "../../../styles/style.scss";

function Message( {closebtn} ) {
  return (
    <div className="mess-background">
        <div className="overlay"></div>
        <div className="mess-container">
            <div className="titlecloseBtn">
            <button onClick={ () => closebtn(false)}> X </button>
            </div>
        <div className="mess-title">
            <h3>Warning Message!</h3>
        </div>
        <div className="mess-body">
            <p>The following account doesn't exist! Please try again!</p>
        </div>
        <div className="mess-footer">
            <button onClick={ () => closebtn(false)}> OK </button>
        </div>
        </div>
      
    </div>
  )
}

export default Message
