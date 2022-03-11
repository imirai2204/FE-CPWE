import React, { useState, useEffect } from "react";

const SideBarContext = React.createContext({
    isCategoryShown: null,
    isAccountShown: null,
    onShowCategory: () => {},
    onCloseCategory: () => {},
    onShowAccount: () => {},
    onCloseAccount: () => {},
});

export const SideBarContextProvider = (props) => {
    const [isCategoryShown, setIsCategoryShown] = useState(null);
    const [isAccountShown, setIsAccountShown] = useState(null);

    useEffect(() => {
        const isMobileSize = window.innerWidth < 1100 ? true : false;
        if (isMobileSize) {
            setIsCategoryShown(false);
        }
    }, []);

    const showDropdown = () => setIsCategoryShown(true);
    const hideDropdown = () => setIsCategoryShown(false);
    const showAccount = () => setIsAccountShown(true);
    const hideAccount = () => setIsAccountShown(false);

    return (
        <SideBarContext.Provider
            value={{
                isCategoryShown,
                isAccountShown,
                onShowCategory: showDropdown,
                onCloseCategory: hideDropdown,
                onShowAccount: showAccount,
                onCloseAccount: hideAccount,
            }}>
            {props.children}
        </SideBarContext.Provider>
    );
};

export default SideBarContext;
