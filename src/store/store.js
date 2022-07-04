import { configureStore, combineReducers } from '@reduxjs/toolkit';
import redditReducer from './redditSlice';
import subRedditReducer from './subredditSlice';

const store = configureStore(combineReducers({
    reducer: {
        reddit: redditReducer,
        subReddit: subRedditReducer
    }
}));

export default store;