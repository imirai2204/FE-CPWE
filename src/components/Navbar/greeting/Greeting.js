import React from "react";

const date = new Date();

const Greeting = (props) => {
    let greetingMessage = "";
    let hour = date.getHours();

    if ((0 <= hour && hour < 6) || 19 < hour) {
        greetingMessage = "Good night";
    } else if (6 <= hour && hour < 12) {
        greetingMessage = "Good morning";
    } else if (hour < 15) {
        greetingMessage = "Good afternoon";
    } else if (hour < 19) {
        greetingMessage = "Good evening";
    }

    return (
        <>
            <p className='greeting-message'>
                {`${greetingMessage} ${props.data}!`}
                <br />
                <span className='greeting-message'>Nice to see you back</span>
            </p>
        </>
    );
};

export default Greeting;
