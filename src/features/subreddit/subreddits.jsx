import React, { useEffect } from "react";   
import { useDispatch, useSelector } from "react-redux";
import { selectSelectedSubreddit, setSelectedSubreddit } from "../../store/redditSlice";
import { fetchSubreddits, selectedSubreddits } from '../../store/subredditSlice';
import Card from '../card/card.jsx';
import './subreddit.css';
import { Audio } from "react-loading-icons";

// Declare a SubReddits function
const Subreddits = () => {
    const dispatch = useDispatch();
    const subreddits = useSelector(selectedSubreddits);
    const selectedSubreddit = useSelector(selectSelectedSubreddit);

// Fetch the subreddits and dispatch it
    useEffect(() => {
        dispatch(fetchSubreddits());
    }, [dispatch]);

    if(subreddits.isLoading) {
        return (
            <div className="status-container">
            <Audio className="loading-image" />
            <h4 className="loading-text">Loading</h4>
            </div>
        );
    }

    if(subreddits.error){
        return(
            <div className="status-container">
                <h3>There is an error with your search!</h3>
            </div>
        );
    }

// Return the subreddits in a list
    return (
        <Card className='subreddit-card'>
        <h2>Subreddits</h2>
        <ul className="subreddits-list">
            {subreddits.map((subreddit) => (
                <li
                    key={subreddit.id}
                    className={`${
                        selectedSubreddit === subreddit.url && `selected-subreddit`
                }`}
                >
                    <button
                    type="button"
                    onClick={() => dispatch(setSelectedSubreddit(subreddit.url))}
                    >
                    <img
                        src={
                        subreddit.icon_img ||
                        `https://api.adorable.io/avatars/25/${subreddit.display_name}`
                        }
                        alt={`${subreddit.display_name}`}
                        className="subreddit-icon"
                        style={{ border: `3px solid ${subreddit.primary_color}` }}
                    />
                    {subreddit.display_name}
                    </button>
                </li>
            ))}
        </ul>
        </Card>
    );
};

export default Subreddits;
