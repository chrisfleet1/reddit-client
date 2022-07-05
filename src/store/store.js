import { configureStore } from '@reduxjs/toolkit';
import redditReducer from './redditSlice';
import subRedditReducer from './subredditSlice';

const store = configureStore({
    reducer: {
        reddit: redditReducer,
        subReddit: subRedditReducer
        }
    });

export default store;