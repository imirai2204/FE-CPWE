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
import Category from "./pages/Category";
import CreateIdea from "./pages/CreateIdea";
import AccountSetting from "./pages/AccountSetting";
import Profile from "./pages/Profile";
import SubmitIdea from "./components/CreateIdea/SubmitIdea";

function App() {
    const [isOpenModal, setIsOpenModal] = useState(false);
    const openModalHandler = () => setIsOpenModal(true);
    const closeModalHandler = () => setIsOpenModal(false);
    return (
        <>
            <Navbar onClickCreateBtn={openModalHandler} />
            <Routes>
                <Route path='/' exact element={<Home />} />
                <Route path='/login' exact element={<Login />} />
                <Route path='/dashboard' exact element={<Dashboard />} />
                <Route path='/manage-user' exact element={<ManageUser />} />
                <Route path='/category' exact element={<Category />} />
                <Route path='/category/academic-year' exact element={<AcademicYear />} />
                <Route path='/category/department' exact element={<Department />} />
                <Route path='/category/tags' exact element={<Tags />} />
                <Route path='/category/topic' exact element={<Topic />} />
                <Route path='/create-idea' exact element={<CreateIdea />} />
                <Route path='/account-settings' exact element={<AccountSetting />} />
                <Route path='/profile' exact element={<Profile />} />
            </Routes>
            {isOpenModal && <SubmitIdea closeModalHandler={closeModalHandler} />}
        </>
    );
}

export default App;
