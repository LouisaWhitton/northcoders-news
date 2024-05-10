import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

function Article ({ userName, article, setArticle, userVotes, setUserVotes }) {
    const { article_id } = useParams();
    const navigate = useNavigate();

    const [isError, setIsError] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [voteCast, setVoteCast] = useState(0);
    
    const urlString = `https://louisaw-nc-news.onrender.com/api/articles/` + article_id;

    useEffect(() => {
        setIsLoading(true);
        axios.get(urlString)
        .then((e) => {
            setArticle(e.data.article[0]);
        })
        .then(() => {
            setIsLoading(false);
        })
        .catch((err) => {
            setIsError(true);
        })
    }, [ voteCast ])

    const handleClick = (e) => {
        e.preventDefault();
        if(e.target.firstChild.data === "Back to articles"){
            navigate("/articles");
        } else if(e.target.firstChild.data === "View comments") {
            navigate(`/articles/${article_id}/comments`)
        } else if(e.target.firstChild.data === "+") {
            setVoteCast(1);
            axios.patch(urlString, { inc_votes : 1 })
            .catch((err) => {
                setIsError(true);
            })
        }
        else if(e.target.firstChild.data === "-") {
            setVoteCast(-1);
            axios.patch(urlString, { inc_votes : -1 })
            .catch((err) => {
                setIsError(true);
            })
        }
    }

    return  isError ? (
        <main>
            <p className="error">Ah! Something went wrong there ... :-(</p>
            <button className="back-button" onClick={handleClick}>Back to articles</button> 
        </main>
    ) : isLoading ? (
    <p>
        Loading article - please wait ...
    </p>
    ) : (
        <main>
            <span className="large-box">
                <p className="large-box-category">{article.topic}</p>
                <p className="large-box-dateadded">added {article.created_at.substring(8,10)}/{article.created_at.substring(5,7)}/{article.created_at.substring(0,4)} {article.created_at.substring(11, 16)}</p>
                <h2 className="large-box-title">{article.title}</h2>
                <section className="large-box-text">{article.body}</section>
                <p className="large-box-votes">{`${article.votes + voteCast} ${(article.votes + voteCast === 1) ? "vote" : "votes"}`}</p>
                <p className="large-box-comments">{article.comment_count} comments</p>
                <img src={article.article_img_url} className="large-box-image"></img>
                <div className="large-box-vote-buttons">
                    <button className={`plus-minus-button ${(voteCast !== 0) ? "disabled-button" : "" }`} onClick={handleClick}>+</button>
                    <button className={`plus-minus-button ${(voteCast !== 0) ? "disabled-button" : "" }`} onClick={handleClick}>-</button>
                </div>
                <div className="large-box-comment-buttons">
                    <button onClick={handleClick}>View comments</button>
                </div>
            </span>
            <button className="back-button" onClick={handleClick}>Back to articles</button>    
        </main>
    )
}

export default Article;