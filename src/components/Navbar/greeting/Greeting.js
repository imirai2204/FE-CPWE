import React, { Fragment } from "react";

const date = new Date();

const Greeting = (props) => {
    const greetingUser = props.data.trim().length === 0 ? "User" : props.data;
    let greetingMessage = "";
    let hour = date.getHours();

    if ((0 <= hour && hour < 6) || 19 < hour) {
        greetingMessage = "Good night";
    } else if (6 <= hour && hour < 12) {
        greetingMessage = "Good morning";
    } else if (hour < 15) {
        greetingMessage = "Good afternoon";
    } else if (hour <= 19) {
        greetingMessage = "Good evening";
    }

    return (
        <Fragment>
            <p className="greeting-message">
                {`${greetingMessage},`}
                <br />
                <span className="greeting-message">{greetingUser}</span>
            </p>
        </Fragment>
    );
};

export default Greeting;
