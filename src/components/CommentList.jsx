import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import SmallComment from './SmallComment';

function CommentList( { userName, article } ) {
    const [isError, setIsError] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [comments, setComments] = useState([]);
    const { article_id } = useParams();
    const navigate = useNavigate();

    let urlString = `https://louisaw-nc-news.onrender.com/api/articles/` + article_id + "/comments";

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
    }, [])

    const handleClick = (e) => {
        e.preventDefault();
        if(e.target.firstChild.data === "Back to article"){
            navigate(`/articles/${article_id}`);
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
            <h2>{(article.comment_count !== undefined) ? `${article.comment_count} comments on "${article.title}"` : "Comments"}:</h2>
            <ul>
                {
                    comments.map((e) => {
                    return (
                        <SmallComment comment={e} userName={userName} key={e.comment_id} />
                    );
                    })
                }
            </ul>
        </main>
    )
}

export default CommentList;