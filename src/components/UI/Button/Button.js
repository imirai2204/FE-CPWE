import React from "react";

const STYLES = ["btn--primary", "btn--outline", "btn--modal"];

const SIZES = ["btn--medium", "btn--large"];

export const Button = ({ children, type, onClick, buttonStyle, buttonSize }) => {
    const checkButtonStyle = STYLES.includes(buttonStyle) ? buttonStyle : STYLES[0];
    const checkButtonSizes = STYLES.includes(buttonSize) ? buttonSize : SIZES[0];

    return (
        <button
            className={`btn ${checkButtonStyle} ${checkButtonSizes}`}
            onClick={onClick}
            type={type}>
            {children}
        </button>
    );
};
