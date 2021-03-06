import React, {useEffect} from "react";
import { useDispatch, useSelector } from 'react-redux';
import { fetchComments, selectFilteredPosts, fetchPosts, setSearchTerm } from "../../store/redditSlice";
import { Audio } from 'react-loading-icons';
import Post from '../post/post.jsx';
import './home.css';
import {BsFillHandThumbsDownFill} from 'react-icons/bs';

const Home = () => {
    const reddit = useSelector((state) => state.reddit);
    const {isLoading, error, searchTerm, selectedSubreddit} = reddit;
    const posts = useSelector(selectFilteredPosts);
    const dispatch = useDispatch();

    //DISPATCH THE FETCH TO GET SELECTED SUB REDDITS
    // This will dispath the fetchPosts request and use the selected subreddit
    useEffect(() => {
        dispatch(fetchPosts(selectedSubreddit));
    }, [selectedSubreddit]);
    

    //TOGGLE COMMENTS
    // Need to fetch the comments using the fetch comments function, and use the variables declared in the function
    const toggleComments = (index) => {
        const getComments = (permalink) => {
            dispatch(fetchComments(index, permalink));
        };

        return getComments;
    };

    //HANDLE THE ISLOADING AND ERROR 
    // If the comments are pending, show a message to say "posts are loading", if an error then show an error message
    if(isLoading) {
        return (
            <div className="status-container">
            <Audio className="loading-image" />
            <h4 className="loading-text">Loading</h4>
            </div>
        );
    }

    if(error){
        return(
            <div className="status-container">
                <h3>There is an error with your search!</h3>
                <button
                    type='button'
                    onClick={() => dispatch(fetchPosts(selectedSubreddit))}
                >
                    Try again
                </button>
            </div>
        );
    }

    //CHECK IF THERE ARE ANY POSTS, IF THERE ARE THEN THE POSTS NEED TO BE MAPPED, IF NOT THEN DISPLAY A MESSAGE
    // If there are no posts, show a message, and if there are posts then map through the array to pull through each post individually
    if(posts.length === 0) {
        return (
        <div className="status-container">
            <h3 className="post-error">There are no posts to display for {searchTerm}!</h3>
            <BsFillHandThumbsDownFill className="thumbs-down"/>
            <br></br>            
            <button type="button" onClick={() => dispatch(setSearchTerm(''))}>Go Home</button> 
        </div>
        );
    }

    return (
        <>
        {posts.map((post, index) => (
            <Post
                key={post.id}
                post={post}
                toggleComments={toggleComments(index)}
            />
        ))}
        </>
    );
};

export default Home;   