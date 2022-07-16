import { configureStore } from '@reduxjs/toolkit';
import redditReducer from './redditSlice';
import subredditReducer from './subredditSlice';

const store = configureStore({
    reducer: {
        reddit: redditReducer,
        subreddits: subredditReducer
        }
    });

export default store;