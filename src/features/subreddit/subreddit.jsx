import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectSelectedSubReddit, selectSubReddit } from "../../store/redditSlice";
import { getSubReddits } from '../../api/api';
import Card from '../card/card';
import './subreddit.css';


// Declare a SubReddits function
const Subreddits = () => {
    const dispatch = useDispatch();
    const subreddits = useSelector(selectSubReddit);
    const selectedSubReddit = useSelector(selectSelectedSubReddit);

// Fetch the subreddits and dispatch it
    useEffect(() => {
        dispatch(getSubReddits());
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
                    selectedSubReddit === subreddit.url && `selected-subreddit`
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