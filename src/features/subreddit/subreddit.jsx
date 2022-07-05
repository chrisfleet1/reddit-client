import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectSelectedSubreddit, selectSubreddit } from "../../store/redditSlice";
import { getSubreddits } from '../../api/api';
import Card from '../card/card';
import './subreddit.css';


// Declare a SubReddits function
const Subreddits = () => {
    const dispatch = useDispatch();
    const subreddits = useSelector(selectSubreddit);
    const selectedSubreddit = useSelector(selectSelectedSubreddit);

// Fetch the subreddits and dispatch it
    useEffect(() => {
        dispatch(getSubreddits());
    }, [dispatch]);

// Return the subreddits in a list
    return (
        <Card>
        <h2>SubReddits</h2>
        <ul>
            {subreddits.map((subreddit) => (
                <li
                key={subreddit.id}
                className={`${
                    selectedSubreddit === subreddit.url && `selected-subreddit`
                }`}
                >
                {/* Think about improvements - images, buttons */}
                </li>
            ))}
        </ul>
        </Card>
    )
}

export default Subreddits;