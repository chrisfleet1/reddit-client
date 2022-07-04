import React from "react";
// import { BsSearch } from "react-icons/bs";
import './search.css';
import { useState } from "react";
import { getSubRedditPosts } from "../../api/api";

export const Search =() => {
    const [searchValue, setSearchValue] = useState('');

    const handleChange = (e) => {
        e.preventDefault();
        setSearchValue(e.target.value);
    };

    console.log(setSearchValue);

    //onSubmit function to search for the subreddits from the Reddit API
    const onSubmit = (setSearchValue) => {
        searchValue.preventDefault();
        getSubRedditPosts(setSearchValue);
    }

    return (
        <form className="search" onSubmit={onSubmit}>
                <input className="search-bar"
                    type="text"
                    placeholder="Search"
                    onChange={handleChange}
                    value={searchValue}
                    aria-label="Search Posts"
                />
        </form>
    )
};