import React from "react";
import '../styles/style.css';
import { Link } from 'react-router-dom';

function Navigation() {
    return (
        <div>
            <nav>
                <h3>Logo</h3>
                <ul className="nav-link">
                    <li><Link to='/'>Home</Link></li>
                    <li><Link to='/login'>Login</Link></li>
                    <li><Link to='/logout'>Logout</Link></li>
                </ul>
            </nav>
        </div>
    )
}

export default Navigation