import React, { useState, useEffect } from "react";

const UserCardContext = React.createContext({
    isCardOpen: false,
    userInfo: {
        fullName: "",
        userId: "",
        email: "",
        department: "",
        userRole: "",
        avatar: "",
    },
    getUserInfo: (values) => {},
    showUserCard: () => {},
    closeUserCard: () => {},
});

export const UserCardContextProvider = (props) => {
    const [isCardOpen, setIsCardOpen] = useState(null);
    const [userInfo, setUserInfo] = useState({
        fullName: "User Test",
        userId: "ID-001",
        email: "Email@email.com",
        department: "Testing",
        userRole: "User Test",
        avatar: "/default-avatar.png",
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
