import React, { useState, useEffect } from "react";

const UserCardContext = React.createContext({
    isCardOpen: false,
    userInfo: {
        fullName: "",
        userId: "",
        email: "",
        department: "",
        userRole: "",
    },
    getUserInfo: (values) => {},
    showUserCard: () => {},
    closeUserCard: () => {},
});

export const UserCardContextProvider = (props) => {
    const [isCardOpen, setIsCardOpen] = useState(null);
    const [userInfo, setUserInfo] = useState({
        fullName: "",
        userId: "",
        email: "",
        department: "",
        userRole: "",
    });

    useEffect(() => {
        const isMobileSize = window.innerWidth < 1100 ? true : false;
        if (isMobileSize) {
            setIsCardOpen(false);
        }
    }, []);

    const showUserCard = () => setIsCardOpen(true);
    const closeUserCard = () => setIsCardOpen(false);
    const getUserInfo = (values) => setUserInfo(values);

    return (
        <UserCardContext.Provider
            value={{
                isCardOpen,
                userInfo,
                getUserInfo,
                showUserCard,
                closeUserCard,
            }}>
            {props.children}
        </UserCardContext.Provider>
    );
};

export default UserCardContext;
