import React, { useState } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Routes, Route } from "react-router-dom";
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

function App() {
    const [isOpenModal, setIsOpenModal] = useState(false);
    const openModalHandler = () => {
        setIsOpenModal((prevIsOpenModal) => !prevIsOpenModal);
    };

    return (
        <>
            <Navbar onClickCreateBtn={openModalHandler} />
            <Routes>
                <Route path='/' exact element={<Home />} />
                <Route path='/login' exact element={<Login />} />
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
            </Routes>
            <SubmitIdea isShowForm={isOpenModal} closeModalHandler={openModalHandler} />
        </>
    );
}

export default App;
