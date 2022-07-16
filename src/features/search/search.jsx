import React, { useState, useEffect } from "react";
import './search.css';
import { useSelector, useDispatch } from 'react-redux';
import { setSearchTerm } from '../../store/redditSlice.js';

const Search =() => {
    const [searchValue, setSearchValue] = useState('');
    const searchTerm = useSelector((state) => state.reddit.searchTerm);
    const dispatch = useDispatch();

    const handleChange = (e) => {
        setSearchValue(e.target.value);
    }; 

    useEffect(() => {
        setSearchValue(searchTerm);
    }, [searchTerm]);

    //onSubmit function to search for the subreddits from the Reddit API
    const onSubmit = (e) => {
        e.preventDefault(); 
        dispatch(setSearchTerm(searchValue));
    };

    return (
        <form className="search" onSubmit={onSubmit} >
                <input className="search-bar"
                    type="text"
                    placeholder="Search"
                    onChange={handleChange}
                    value={searchValue}
                    aria-label="Search Posts"
                />
        </form>
    );
};

export default Search;