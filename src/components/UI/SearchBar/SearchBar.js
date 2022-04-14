import React, { useState, Fragment, useEffect } from "react";
import SearchIcon from "@mui/icons-material/Search";
import TextField from "@mui/material/TextField";

const SearchBar = (props) => {
    const [searchData, setSearchData] = useState(null);

    useEffect(() => {
        if (searchData === null || searchData === "") return;

        const timer = setTimeout(() => {
            props.retrieveSearchKey(searchData);
        }, 1000);

        return () => {
            clearTimeout(timer);
        };
    }, [searchData]);

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
                    marginTop: "5px",
                    marginBottom: "5px",
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
                    // sx={{ width: "50%" }}
                    onChange={(event) => setSearchData(event.target.value)}
                />
            </div>
        </Fragment>
    );
};

export default SearchBar;
