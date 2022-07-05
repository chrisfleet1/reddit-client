import { createSelector, createSlice } from "@reduxjs/toolkit";
import { getComments, getSubredditPosts } from "../api/api";

// Declare the initial state, taking into account different states - is loading, error, search term, pulling through a selected sub reddit
const initialState = {
    posts: [],
    error: false,
    isLoading: false,
    searchTerm: '',
    selectedSubreddit: 'r/sportmemes/'
};

// Create a slice with reducers that handles the different states (pending, success and failed) for the posts and the comments

const redditSlice = createSlice({
    name: 'redditPosts',
    initialState: initialState,
    reducers: {
        setPost(state, action) {
            // Set default post
            state.posts = action.payload;
        },
        fetchPostPending(state) {
            // Fetch the post from the API - this handles the pending status
            state.isLoading = true;
            state.error = false;
        },
        fetchPostSuccessful(state, action) {
            // Fetch the post from the API - this handles the successful status
            state.isLoading = false;
            state.posts = action.payload;
        },
        fetchPostFailed(state) {
            // Fetch the post from the API - this handles the failed status)
            state.isLoading = false;
            state.error = true;
        },
        setSearchTerm(state, action) {
            // Set the default Sub Reddit
            state.searchTerm = action.payload;
        },
        selectSubReddit(state, action) {
            // Select the Sub Reddits)
            state.selectedSubreddit = action.payload;
            state.searchTerm = '';
        },
        showComments(state, action) {
            // Show the comments
            state.posts[action.payload].showingComments = !state.posts[action.payload]
            .showingComments;
        },
        fetchCommentsPending(state, action) {
            // Fetch the comments from the API - this handles the pending status
            state.posts[action.payload].showingComments = !state.posts[action.payload]
            .showingComments;
          if (!state.posts[action.payload].showingComments) {
            return;
          }
          state.posts[action.payload].loadingComments = true;
          state.posts[action.payload].error = false;
        },
        fetchCommentsSuccess(state, action) {
            // Fetch the comments from the API - this handles the success status
            state.posts[action.payload.index].loadingComments = false;
            state.posts[action.payload.index].comments = action.payload.comments;
        },
        fetchCommentsFailed(state, action) {
            // Fetch the comments from the API - this handles the failure status
            state.posts[action.payload].loadingComments = false;
            state.posts[action.payload].error = true;
        }
    }
});

// Create the action creators using the reducers created above

export const {
    setPost,
    fetchPostPending, 
    fetchPostSuccessful,
    fetchPostFailed,
    setSearchTerm,
    selectSubreddit,
    showComments,
    fetchCommentsPending,
    fetchCommentsSuccess,
    fetchCommentsFailed
} = redditSlice.actions;


// Create the reducer using the slice 
export default redditSlice.reducer;

// Thunk to fetch the posts, taking one argument. Handles error. Needs to be asyncronous.
// Create a Thunk to fetch the posts, taking one argument. This needs to be async. Needs to try fetching the posts. Needs to declare a function for the post comments.
// Dispatch the successful action, if error then dispatch failed action.
export const fetchPosts = (subreddit) => async(dispatch) => {
    try {
        //1. dispatch the process to start fetching the posts
        dispatch(fetchPostPending())
        //2. declare a variable that handles the process to get the data from the API - needs to be async await
        // declared a variable to get the subreddit posts (using the API method) and passed in subreddit
        const posts = await getSubredditPosts(subreddit)
        //3. declare an object that takes the previous post state, and shows comments
        // Object created to obtain the metadata (comments) for the posts. We are adding showingComments and comments as additional fields to handle showing them when the user wants to. 
        // We need to do this because we need to call another API endpoint to get the comments for each post.
        const postsWithData = posts.map((post) => {
            return {
            ...post,
            showingComments: false,
            comments: [],
            loadingComments: false,
            errorComments: false
            }
        })
        //4. dispatch the successful get posts with the comments data
        dispatch(fetchPostSuccessful(postsWithData))
    } catch(err) {
        // 5. dispatch the failed comments reducer
        dispatch(fetchPostFailed())
    }
};

//Thunk to fetch the comments, taking two arguments.
//This needs to somehow identify the id of the post (check the API instructions)
export const fetchComments = (index, permalink) => async(dispatch) => {
    try {
        //1. dispatch the process to start fetching the comments - this needs to take one argument (arg1)
        dispatch(fetchCommentsPending(index))

        //2. declare a variable that handles the process to get the data from the API - needs to be async await - needs to take one argument (arg2)
        const comments = await getComments(permalink)

        //3. dispatch the successful reducer, which takes two of the arguments (arg1, variable)
        dispatch(fetchCommentsSuccess({index, comments}))
        
    } catch (err) {
        dispatch(fetchCommentsFailed(index))
    }
};

// Declare a variable to select the posts state
const selectPosts = (state) => state.reddit.posts;

// Declare a variable to select the search term state
const selectSearchTerm = (state) => state.reddit.searchTerm;

// Declare a variable (export it) to select the selected subreddit, take the state and the result should be the state for the selected sub reddit
export const selectSelectedSubreddit = (state) => state.reddit.selectedSubreddit;

// Declare a variable (export it) to select the filtered posts, create a selector to convert the search term to lower case and it should filter the results.
// The variable should think about the different status; empty and not empty. If empty, return the posts.
// If not empty, filter the post and convert the post title to lower case, if it includes the search term (which is converted to lower case)
export const selectFilteredPosts = createSelector(
    [selectPosts, selectSearchTerm],
    (posts, searchTerm) => {
        if(searchTerm !== '') {
            return posts.filter((post) =>
                post.title.toLowerCase().includes(searchTerm.toLowerCase())
            );
    } 
    return posts;
    }
);