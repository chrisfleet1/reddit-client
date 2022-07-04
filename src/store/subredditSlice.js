import { createSlice } from "@reduxjs/toolkit";
import { getSubReddits } from "../api/api";

const initialState = {
    isLoading: false,
    error: false,
    subReddit: []
}

const subRedditSlice = createSlice({
    name: 'subRedditSlice',
    initialState: initialState,
    reducer: {
        setSubReddit(state, action) {
            // Set the initial sub reddit
            state.subReddit = action.payload
        },
        fetchSubRedditPending(state, action) {
            // Handle the pending status for fetching the sub reddit from the API
            state.isLoading = true;
        },
        fetchSubRedditSuccess(state, action) {  
            // Handle the success status for fetching the sub reddit from the API - push the data into the subReddit array
            state.isLoading = false;
            state.error = false;
            state.subReddit.push(action.payload);
        },
        fetchSubRedditFailed(state, action) {
            // Handle the failure status for fetching the sub reddit from the API
            state.isLoading = false;
            state.error = true;
        }
    }
});



export const {
    setSubReddit,
    fetchSubRedditPending,
    fetchSubRedditSuccess,
    fetchSubRedditFailed
} = subRedditSlice.actions;

//Define the reducer
export default subRedditSlice.reducer;

//Define the middleware to fetch the subreddits. Needs to be async and take a dispatch arg. Needs to try getting subreddits and handling an error.
export const fetchSubreddits = () => async (dispatch) => {
    try {
    dispatch(fetchSubRedditPending())
    const subreddits = await getSubReddits()
    dispatch(fetchSubRedditSuccess(subreddits))
    } catch(err) {
    dispatch(fetchSubRedditFailed())
    }
};

//Define the selected subreddits state.
export const selectedSubReddit = (state) => state.subreddits.subReddit;