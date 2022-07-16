import { createSlice } from "@reduxjs/toolkit";
import { getSubreddits } from "../api/reddit";

const initialState = {
    subreddits: [],
    error: true,
    isLoading: false        
};

const subredditSlice = createSlice({
    name: 'subreddits',
    initialState,
    reducers: {
        fetchSubredditsPending(state) {
            // Handle the pending status for fetching the sub reddit from the API
            state.isLoading = true;
            state.error = false;
        },
        fetchSubredditsSuccess(state, action) {  
            // Handle the success status for fetching the sub reddit from the API - push the data into the subReddit array
            state.isLoading = false;
            state.subreddits = action.payload;
        },
        fetchSubredditsFailed(state) {
            // Handle the failure status for fetching the sub reddit from the API
            state.isLoading = false;
            state.error = true;
        },
    },
});



export const {
    fetchSubredditsPending,
    fetchSubredditsSuccess,
    fetchSubredditsFailed
} = subredditSlice.actions;

//Define the reducer
export default subredditSlice.reducer;

//Define the middleware to fetch the subreddits. Needs to be async and take a dispatch arg. Needs to try getting subreddits and handling an error.
export const fetchSubreddits = () => async (dispatch) => {
    try {
    dispatch(fetchSubredditsPending());
    const subreddits = await getSubreddits();
    dispatch(fetchSubredditsSuccess(subreddits));
    } catch(error) {
    dispatch(fetchSubredditsFailed());
    }
};

//Define the selected subreddits state.
export const selectedSubreddits = (state) => state.subreddits.subreddits;