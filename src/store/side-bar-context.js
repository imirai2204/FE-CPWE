import React, { useState, useEffect } from "react";

const SideBarContext = React.createContext({
    isShown: null,
    onShow: () => {},
    onClose: () => {},
});

export const SideBarContextProvider = (props) => {
    const [isShown, setIsShown] = useState(null);

    useEffect(() => {
        const isMobileSize = window.innerWidth < 1100 ? true : false;
        if (isMobileSize) {
            setIsShown(false);
        }
    }, []);

    const ShowDropdown = () => setIsShown(true);
    const hideDropdown = () => setIsShown(false);

    return (
        <SideBarContext.Provider
            value={{
                isShown,
                onShow: ShowDropdown,
                onClose: hideDropdown,
            }}>
            {props.children}
        </SideBarContext.Provider>
    );
};

export default SideBarContext;
