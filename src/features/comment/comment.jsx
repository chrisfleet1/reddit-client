import React from "react";
import './comment.css';
import Avatar from "../Avatar/Avatar";

const Comment = (props) => {
    const { comment } = props;
    return (
        <div className="comment">
            <div className="comment-metadata">
                <Avatar name={comment.author} />
                <p className="comment-author">{comment.author}</p>
                <p className="comment-created-time">{comment.created_utc}</p>
                <p>{comment.body_html}</p>
            </div>
        </div>
    )
};

export default Comment;