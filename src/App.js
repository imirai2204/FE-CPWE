import React, { useState, Fragment, useContext, useEffect } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Routes, Route, Navigate, BrowserRouter } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import AcademicYear from "./pages/AcademicYear";
import Department from "./pages/Department";
import Dashboard from "./pages/Dashboard";
import ManageUser from "./pages/ManageUser";
import Tags from "./pages/Tags";
import Topic from "./pages/Topic";
import SubmitPage from "./pages/SubmitPage";
import AccountSetting from "./pages/AccountSetting";
import UserSettings from "./pages/UserSettings";
import SubmitIdea from "./components/CreateIdea/SubmitIdea";
import Terms from "./pages/Terms";
import { SideBarContextProvider } from "./store/side-bar-context";
import { UserCardContextProvider } from "./store/user-card-context";
import { EditTableContextProvider } from "./store/edit-table-context";
import AuthContext from "./store/auth-context";
import PageNotFound from "./404";

function GlobalRoute({ children, ...props }) {
    return (
        <BrowserRouter>
            <Routes>{children}</Routes>
        </BrowserRouter>
    );
}

function PrivateRoute({ children, ...props }) {
    return (
        <Fragment>
            <BrowserRouter>
                <SideBarContextProvider>
                    <UserCardContextProvider>
                        <EditTableContextProvider>
                            <Navbar onClickCreateBtn={props.openModalHandler} />
                            <Routes>{children}</Routes>
                            <SubmitIdea
                                isShowForm={props.isOpenModal}
                                closeModalHandler={props.openModalHandler}
                            />
                        </EditTableContextProvider>
                    </UserCardContextProvider>
                </SideBarContextProvider>
            </BrowserRouter>
        </Fragment>
    );
}

function App() {
    const [isOpenModal, setIsOpenModal] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const authCtx = useContext(AuthContext);

    useEffect(() => {
        if (authCtx.isLoggedIn == true) {
            setIsAuthenticated(true)
        } else {
            setIsAuthenticated(false)
        }
    }, []);

    const openModalHandler = () => {
        setIsOpenModal((prevIsOpenModal) => !prevIsOpenModal);
    };

    return (
        <Fragment>
            {console.log(authCtx.isLoggedIn)}
            {isAuthenticated == false ? (
                <PrivateRoute
                    openModalHandler={openModalHandler}
                    isOpenModal={isOpenModal}>
                    <Route path='/' exact element={<Home />} />
                    <Route path='/login' exact element={<Navigate to='/' />} />
                    <Route path='/dashboard' exact element={<Dashboard />} />
                    <Route path='/manage-user' exact element={<ManageUser />} />
                    <Route path='/category/academic-year' exact element={<AcademicYear />} />
                    <Route path='/category/department' exact element={<Department />} />
                    <Route path='/category/tags' exact element={<Tags />} />
                    <Route path='/category/topic' exact element={<Topic />} />
                    <Route path='/submit-page' exact element={<SubmitPage />} />
                    <Route path='/account-settings' exact element={<AccountSetting />} />
                    <Route path='/user/user-settings' exact element={<UserSettings />} />
                    <Route path='/terms-conditions' exact element={<Terms />} />
                    {/* <Route path="*" element={<Navigate to='/404' />} /> */}
                    {/* <Route path='/404' exact element={<PageNotFound />} /> */}
                </PrivateRoute>
            ) : (
                <GlobalRoute>
                    <Route path='/' exact element={<Navigate to='/login' />} />
                    <Route path='/login' exact element={<Login />} />
                    {/* <Route path="/*" element={<Navigate to='/404' />} />
                    <Route path='/404' exact element={<PageNotFound />} /> */}
                    {/* <Route path='/dashboard' exact element={<Navigate to='/login' />} />
                    <Route path='/manage-user' exact element={<Navigate to='/login' />} />
                    <Route path='/category/academic-year'exact element={<Navigate to='/login' />}/>
                    <Route path='/category/department' exact element={<Navigate to='/login' />} />
                    <Route path='/category/tags' exact element={<Navigate to='/login' />} />
                    <Route path='/category/topic' exact element={<Navigate to='/login' />} />
                    <Route path='/submit-page' exact element={<Navigate to='/login' />} />
                    <Route path='/account-settings' exact element={<Navigate to='/login' />} />
                    <Route path='/user/user-settings' exact element={<Navigate to='/login' />} />
                    <Route path='/terms-conditions' exact element={<Navigate to='/login' />} />
                    <Route path="*" element={<Navigate to='/404' />} />
                    <Route path='/404' exact element={<PageNotFound />} /> */}
                </GlobalRoute>
            )}
        </Fragment>
    );
}

export default App;
