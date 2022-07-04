// Define the root URL of the API
export const root = 'https://www.reddit.com/';

// Fetch the posts from the Reddit API - needs to be converted to json
export const getSubRedditPosts = async(subreddit) => {
    const response = await fetch(`${root}${subreddit}.json`);
    const json = await response.json();
    return json.data.children.map((post) => post.data);
};

// Fetch the subreddit posts - needs to be converted to json
export const getSubReddits = async() => {
    const response = await fetch(`${root}subreddits`);
    const json = await response.json();
    return json.data.children.map((subreddit) => subreddit.data);
};

// Fetch the comments - needs to be converted to json
export const getComments = async(permalink) => {
    const response = await fetch(`${root}${permalink}`);
    const json = await response.json();
    return json.data.children.map((comment) => comment.data);
};