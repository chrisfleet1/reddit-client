// Define the root URL of the API
export const root = 'https://www.reddit.com/';

// Fetch the posts from the Reddit API - needs to be converted to json
export const getSubredditPosts = async (subreddit) => {
    const response = await fetch(`${root}${subreddit}.json`);
    const json = await response.json();
    return json.data.children.map((post) => post.data);
};

// Fetch the subreddit posts - needs to be converted to json
export const getSubreddits = async () => {
    const response = await fetch(`${root}subreddits.json`);
    const json = await response.json();
    return json.data.children.map((subreddit) => subreddit.data);
};

// Fetch the comments - needs to be converted to json
export const getComments = async (permalink) => {
    const response = await fetch(`${root}${permalink}.json`);
    const json = await response.json();
    return json[1].data.children.map((subreddit) => subreddit.data);
};