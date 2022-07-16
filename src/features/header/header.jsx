import React from "react";
import {FaReddit} from "react-icons/fa";
import './header.css';

const Header = () => {
    return (
        <div className="header">
            <FaReddit className="header-logo"/>
            <div className="app-name">
                React<span className="app-name-color-two">Minimal</span>
            </div>
        </div>
    )
};

export default Header;