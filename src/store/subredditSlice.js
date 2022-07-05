import { createSlice } from "@reduxjs/toolkit";
import { getSubreddits } from "../api/api";

const initialState = {
    isLoading: false,
    error: false,
    subReddit: []
}

const subredditSlice = createSlice({
    name: 'subRedditSlice',
    initialState: initialState,
    reducer: {
        setSubreddit(state, action) {
            // Set the initial sub reddit
            state.subReddit = action.payload
        },
        fetchSubredditPending(state, action) {
            // Handle the pending status for fetching the sub reddit from the API
            state.isLoading = true;
        },
        fetchSubredditSuccess(state, action) {  
            // Handle the success status for fetching the sub reddit from the API - push the data into the subReddit array
            state.isLoading = false;
            state.error = false;
            state.subReddit.push(action.payload);
        },
        fetchSubredditFailed(state, action) {
            // Handle the failure status for fetching the sub reddit from the API
            state.isLoading = false;
            state.error = true;
        }
    }
});



export const {
    setSubreddit,
    fetchSubredditPending,
    fetchSubredditSuccess,
    fetchSubredditFailed
} = subredditSlice.actions;

//Define the reducer
export default subredditSlice.reducer;

//Define the middleware to fetch the subreddits. Needs to be async and take a dispatch arg. Needs to try getting subreddits and handling an error.
export const fetchSubreddits = () => async (dispatch) => {
    try {
    dispatch(fetchSubredditPending())
    const subreddits = await getSubreddits()
    dispatch(fetchSubredditSuccess(subreddits))
    } catch(err) {
    dispatch(fetchSubredditFailed())
    }
};

//Define the selected subreddits state.
export const selectedSubreddit = (state) => state.subreddits.subReddit;