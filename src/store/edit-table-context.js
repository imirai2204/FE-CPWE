import React, { useState, useEffect } from "react";

const EditTableContext = React.createContext({
    searchFieldValue: "Type...123",
    getValue: () => {},
});

export const EditTableContextProvider = (props) => {
    const [searchFieldValue, setSearchFieldValue] = useState("Type...123");

    const getValue = (values) => setSearchFieldValue(values);

    return (
        <EditTableContext.Provider
            value={{
                searchFieldValue,
                getValue,
            }}>
            {props.children}
        </EditTableContext.Provider>
    );
};

export default EditTableContext;
