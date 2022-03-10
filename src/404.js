import React from 'react';
import "./styles/Pages/_404.scss";
import logo from './asset/logo.jpg'

const PageNotFound = () => (
    <div className='page-404'>
        <img src={logo} alt="logo image" />
        <h1>404 - Page Not Found!</h1>
        <h2>The requested page was not found</h2>
    </div>
);

export default PageNotFound;