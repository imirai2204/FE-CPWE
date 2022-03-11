import React, { useState, useEffect } from "react";

const EditTableContext = React.createContext({
    inputFieldValue: "",
    getValue: () => {},
});

export const EditTableContextProvider = (props) => {
    const [inputFieldValue, setInputFieldValue] = useState("");

    const getValue = (values) => setInputFieldValue(values);

    return (
        <EditTableContext.Provider
            value={{
                inputFieldValue,
                getValue,
            }}>
            {props.children}
        </EditTableContext.Provider>
    );
};

export default EditTableContext;
