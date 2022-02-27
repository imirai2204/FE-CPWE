import React from "react";

const SearchBar = ({ props, className, placeholder, data }) => {
    return (
        <div className={`search-bar ${className}`}>
            <div className='search-input'>
                <input type='text' placeholder={placeholder} />
                <div className='search--icon'></div>
            </div>
            <div className='data-result'></div>
        </div>
    );
};

export default SearchBar;
