import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function SmallComment({ comment, userName, reload, setReload, addedComments, setAddedComments}) {
    const navigate = useNavigate();
    const [isDeleted, setIsDeleted] = useState(false);

    const dateAdded = comment.created_at.substring(8,10) + "/" + comment.created_at.substring(5,7) + "/" + comment.created_at.substring(0,4) + " " + comment.created_at.substring(11, 16);
    const commentHeader = ((comment.author === userName ) ? "Comment by me" : "Comment by " + comment.author) + " on " + dateAdded;

    const urlString = `https://louisaw-nc-news.onrender.com/api/comments/${comment.comment_id}`;
    
    const handleClick = (e) => {
        e.preventDefault();
        if(e.target.firstChild.data === "Delete comment"){
            setIsDeleted(true);
            axios.delete(urlString)
            .then((e) => {
                setAddedComments(addedComments - 1);
                setReload(!reload);
            })
            .catch((e) => {
                setErrorText("Failed to delete comment. :-(");
                setIsError()
                setReload(!reload);
            })
        }
    }
 
    return (
        <span>
            <h2 className="small-box-italic">{commentHeader}</h2>
            <div>{ !isDeleted && <p id="comment-body" className="small-box-text">{comment.body}</p> }</div>
            <div>{ isDeleted && <p id="comment-body-deleted" className="small-box-text small-box-text-deleted">comment deleted</p> }</div>
            <div className="button-submit">{comment.author === userName && <button onClick={handleClick}>Delete comment</button>}</div>
            <p className="small-box-votes">{comment.votes} votes</p>
        </span>
    )
}

export default SmallComment;