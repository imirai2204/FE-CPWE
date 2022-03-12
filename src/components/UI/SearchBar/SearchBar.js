import React, { Fragment } from "react";
import SearchIcon from "@mui/icons-material/Search";
import TextField from "@mui/material/TextField";

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
                    height: "60px",
                }}>
                <SearchIcon
                    color='red'
                    style={{
                        position: "absolute",
                        right: "26%",
                        top: 15,
                        width: 28,
                        height: 30,
                    }}
                />
                <TextField
                    name='title'
                    type='text'
                    placeholder='Search...'
                    sx={{ width: "50%" }}
                />
            </div>
        </Fragment>
    );
};

export default SearchBar;
