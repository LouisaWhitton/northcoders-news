import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import SmallComment from './SmallComment';

function CommentList( { userName, article } ) {
    const [isError, setIsError] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [comments, setComments] = useState([]);
    const [submittedStatus, setSubmittedStatus] = useState("N/A");
    const [reload, setReload] = useState(false);
    const [addedComments, setAddedComments] = useState(0);
    const { article_id } = useParams();
    const navigate = useNavigate();

    const urlString = `https://louisaw-nc-news.onrender.com/api/articles/` + article_id + "/comments";
    let errorText = "Sorry! No comments found! :-(";

    useEffect(() => {
        setIsLoading(true);
        axios.get(urlString)
        .then((e) => {
            if(!e.data.comments){
                return Promise.reject("Not found");
            }
            setComments(e.data.comments);
        })
        .then(() => {
            setIsLoading(false);
        })
        .catch((err) => {
            setIsError(true);
        })
    }, [ reload ])

    const handleClick = (e) => {
        e.preventDefault();
        if(e.target.firstChild.data === "Back to article"){
            navigate(`/articles/${article_id}`);
        } else if(e.target.firstChild.data === "Submit"){
            setSubmittedStatus("Submitted");
            setAddedComments(addedComments + 1);
            const newComment = document.getElementById("new-comment");
            const commentBody = {
                "username" : userName,
                "body" : newComment.value
            };
            axios.post(urlString, commentBody)
            .then((e) => {
                newComment.value="";
                setSubmittedStatus("N/A");
                setReload(!reload);
            })
            .catch((e) => {
                errorText = "Sorry! Comment failed to post. :-(";
                setIsError(true);
            })
        }
    }

    return isError ? (
        <main>
            <p className="error">Sorry! No comments found! :-(</p>
            <button className="back-button" onClick={handleClick}>Back to article</button> 
        </main>
        ) : isLoading ? (
        <p>
            Loading comments - please wait ...
        </p>
        ) : (
        <main>
            <span>
                <button onClick={handleClick}>Back to article</button>
            </span>
            <h2>{(article.comment_count !== undefined) ? `${Number(article.comment_count) + addedComments } comments on "${article.title}"` : "Comments"}:</h2>
            <ul>
                <span>
                    <h2 className="small-box-add-comment">Add comment ...</h2>
                    <button className="button-submit" onClick={handleClick}>Submit</button>
                    <textarea id="new-comment" className={`"small-box-text" ${(submittedStatus === "Submitted") ? "small-box-text-submitted" : ""}` } rows="4" placeholder="Type comment here ..." disabled={(submittedStatus === "Submitted")} ></textarea>
                    <p className="small-box-votes"> </p>
                </span>
                {
                    comments.map((e) => {
                    return (
                        <SmallComment comment={e} userName={userName} reload={reload} setReload={setReload} addedComments={addedComments} setAddedComments={setAddedComments} key={e.comment_id} />
                    );
                    })
                }
            </ul>
        </main>
    )
}

export default CommentList;