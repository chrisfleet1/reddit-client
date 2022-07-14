import { createSlice } from "@reduxjs/toolkit";
import { getSubreddits } from "../api/reddit";

const initialState = {
    isLoading: false,
    error: false,
    subreddits: []
}

const subredditSlice = createSlice({
    name: 'subreddits',
    initialState: initialState,
    reducer: {
        fetchSubredditPending(state) {
            // Handle the pending status for fetching the sub reddit from the API
            state.isLoading = true;
            state.error = false;
        },
        fetchSubredditSuccess(state, action) {  
            // Handle the success status for fetching the sub reddit from the API - push the data into the subReddit array
            state.isLoading = false;
            state.error = false;
            state.subreddits = action.payload;
        },
        fetchSubredditFailed(state) {
            // Handle the failure status for fetching the sub reddit from the API
            state.isLoading = false;
            state.error = true;
        },
    },
});



export const {
    fetchSubredditPending,
    fetchSubredditSuccess,
    fetchSubredditFailed
} = subredditSlice.actions;

//Define the reducer
export default subredditSlice.reducer;

//Define the middleware to fetch the subreddits. Needs to be async and take a dispatch arg. Needs to try getting subreddits and handling an error.
export const fetchSubreddits = () => async (dispatch) => {
    try {
    dispatch(fetchSubredditPending());
    const subreddits = await getSubreddits();
    dispatch(fetchSubredditSuccess(subreddits));
    } catch(err) {
    dispatch(fetchSubredditFailed());
    }
};

//Define the selected subreddits state.
export const selectedSubreddits = (state) => state.subreddits.subreddits;