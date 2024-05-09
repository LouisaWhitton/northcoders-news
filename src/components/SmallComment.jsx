import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function SmallComment({ comment, userName }) {
    const navigate = useNavigate();

    const dateAdded = comment.created_at.substring(8,10) + "/" + comment.created_at.substring(5,7) + "/" + comment.created_at.substring(0,4) + " " + comment.created_at.substring(11, 16);
    const commentHeader = ((comment.author === userName ) ? "Comment by me" : "Comment by " + comment.author) + " on " + dateAdded;

    return (
        <span>
            <h2 className="small-box-italic">{commentHeader}</h2>
            <p className="small-box-text">{comment.body}</p>
            <p className="small-box-votes">{comment.votes} votes</p>
        </span>
    )
}

export default SmallComment;