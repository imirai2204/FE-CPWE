import React, { Fragment } from "react";
import SearchIcon from "@mui/icons-material/Search";
import TextField from "@mui/material/TextField";

const searchIcon = () => {
    return <SearchIcon color='red' sx={{ width: "25px", height: "25px", mt: 2 }} />;
};

const SearchBar = () => {
    return (
        <Fragment>
            <div
                className='search--bar'
                style={{
                    position: "relative",
                    display: "flex",
                    width: "100%",
                    justifyContent: "center",
                    height: "50px",
                }}>
                <SearchIcon
                    color='red'
                    style={{
                        position: "absolute",
                        right: "25.5%",
                        top: 10,
                        width: 28,
                        height: 28,
                    }}
                />
                <TextField
                    name='title'
                    type='text'
                    placeholder='Search...'
                    sx={{ width: "50%" }}
                    style={{ fontSize: "16px" }}
                />
            </div>
        </Fragment>
    );
};

export default SearchBar;
