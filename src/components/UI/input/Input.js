import React from "react";

const Input = ({ props, ref, className, label }) => {
    return (
        <div className={className}>
            <label htmlFor={props.input.id}>{label}</label>
            <input ref={ref} {...props.input}></input>
        </div>
    );
};

export default Input;
