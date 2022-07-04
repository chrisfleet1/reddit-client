import React from "react";
import './comment.css';

export const Comment = (props) => {
    const { comment } = props;
    return (
        <div>
            <div>
                <p>{comment.author}</p>
                <p>{comment.created_utc}</p>
                <p>{comment.body_html}</p>
            </div>
        </div>
    )
};