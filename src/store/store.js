import { configureStore } from '@reduxjs/toolkit';
import redditReducer from './redditSlice';
import subredditReducer from './subredditSlice';

const store = configureStore({
    reducer: {
        reddit: redditReducer,
        subreddit: subredditReducer
        }
    });

export default store;