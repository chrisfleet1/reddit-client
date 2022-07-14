import React, {useState} from 'react';
import {BiUpvote, BiDownvote, BiDownArrowCircle, BiUpArrowCircle} from 'react-icons/bi';
import Skeleton from 'react-loading-skeleton';
import Card from '../card/card';
import Comment from '../comment/comment.jsx';
import {TiMessage} from 'react-icons/ti';
import Avatar from '../Avatar/Avatar';
import shortenNumber from './shortenNumber';
import moment from 'react-moment';
import './post.css';

const Post = (props) => {
    //create two states, voteValue and setVote value
    const [voteValue, setVoteValue] = useState(0);
    
    //props should be two states, toggle comments
    const [post, onToggleComments] = props;
    /**
     * @param {number} newValue The new vote value
     */
    //declare function to handle the vote and set the vote value
    const onHandleVote = (newValue) => {
        if(newValue === voteValue) {
            setVoteValue(0);
        } else if (newValue === 1) {
            setVoteValue(1);
        } else {
            setVoteValue(-1);
        }
    };

    //render up vote icon
    const renderUpVote =() => {
        if(voteValue === 1) {
            return <BiUpvote className='icon-action'/>;
        } 
        return <BiUpArrowCircle className='icon-action' />;
    };

    //render down vote icon

    const renderDownVote =() => {
        if(voteValue === -1) {
            return <BiDownvote className='icon-action'/>;
        } 
        return <BiDownArrowCircle className='icon-action' />;
    };

    //function to get the vote type
    const getVoteType = () => {
        if(voteValue === 1 ) {
            return 'up-vote';
        }
        if(voteValue === -1 ) {
            return 'down-vote';
        }
        return '';
    };

    //function to render the comments
    const renderComments = () => {
      // error with render
        if(post.errorComments) {
            return (
                <div>
                    <h3>There has been an error loading the comments</h3>
                </div>
            );
        }
        // loading comments
        if (post.loadingComments) {
            return(
                <div>
                    <Skeleton />
                    <Skeleton />
                    <Skeleton />
                    <Skeleton />
                </div>
            );
        }
        // show comments
        if (post.showingComments) {
            return (
                <div>
                {post.comments.map((comment) => (
                    <Comment comment={comment} key={comment.id} />
                ))}
                </div>
            );
        }
        return null;
    };

    // Return the post data with the votes, comments, author
    return (
        <article key={post.id}>
          <Card>
            <div className="post-wrapper">
              <div className="post-votes-container">
                <button
                  type="button"
                  className={`icon-action-button up-vote ${
                    voteValue === 1 && 'active'
                  }`}
                  onClick={() => onHandleVote(1)}
                  aria-label="Up vote"
                >
                  {renderUpVote()}
                </button>
                <p className={`post-votes-value ${getVoteType()}`}>
                  {shortenNumber(post.ups, 1)}
                </p>
                <button
                  type="button"
                  className={`icon-action-button down-vote ${
                    voteValue === -1 && 'active'
                  }`}
                  onClick={() => onHandleVote(-1)}
                  aria-label="Down vote"
                >
                  {renderDownVote()}
                </button>
              </div>
              <div className="post-container">
                <h3 className="post-title">{post.title}</h3>
    
                <div className="post-image-container">
                  <img src={post.url} alt="" className="post-image" />
                </div>
    
                <div className="post-details">
                  <span className="author-details">
                    <Avatar name={post.author} />
                    <span className="author-username">{post.author}</span>
                  </span>
                  <span>{moment.unix(post.created_utc).fromNow()}</span>
                  <span className="post-comments-container">
                    <button
                      type="button"
                      className={`icon-action-button ${
                        post.showingComments && 'showing-comments'
                      }`}
                      onClick={() => onToggleComments(post.permalink)}
                      aria-label="Show comments"
                    >
                      <TiMessage className="icon-action" />
                    </button>
                    {shortenNumber(post.num_comments, 1)}
                  </span>
                </div>
    
                {renderComments()}
              </div>
            </div>
          </Card>
        </article>
      );
    };

export default Post;