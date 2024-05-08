import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

function Article () {
    const { article_id } = useParams();
    const navigate = useNavigate();

    const [isError, setIsError] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [article, setArticle] = useState([]);

    const urlString = `https://louisaw-nc-news.onrender.com/api/articles/` + article_id;

    const handleClick = (e) => {
        e.preventDefault();
        navigate("/articles");
        }

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
    }, [])

    return  isError ? (
        <p className="error">Ah! Something went wrong there ... :-(</p>
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
                <p className="large-box-votes">{article.votes} votes</p>
                <p className="large-box-comments">{article.comment_count} comments</p>
                <img src={article.article_img_url} className="large-box-image"></img>
            </span>
            <button className="back-button" onClick={handleClick}>Back to articles</button>    
        </main>
    )
}

export default Article;