import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectSelectedSubreddit, selectSubreddit } from "../../store/redditSlice";
import { fetchSubreddits, selectedSubreddits } from '../../store/subredditSlice.js';
import Card from '../card/card.jsx';
import './subreddit.css';

// Declare a SubReddits function
const Subreddits = () => {
    const dispatch = useDispatch();
    const subreddits = useSelector(selectedSubreddits);
    const selectedSubreddit = useSelector(selectSelectedSubreddit);

// Fetch the subreddits and dispatch it
    useEffect(() => {
        dispatch(fetchSubreddits());
    }, [dispatch]);

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
                    onClick={() => dispatch(selectSubreddit(subreddit.url))}
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
