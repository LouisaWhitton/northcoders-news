import { useState, useEffect } from 'react';
import axios from 'axios';
import SmallArticle from './SmallArticle';

function ArticleList({ userName }) {
    const [isError, setIsError] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [articles, setArticles] = useState([]);

    let urlString = `https://louisaw-nc-news.onrender.com/api/articles`;

    useEffect(() => {
        setIsLoading(true);
        axios.get(urlString)
        .then((e) => {
            setArticles(e.data.articles);
        })
        .then(() => {
            setIsLoading(false);
        })
        .catch((err) => {
            setIsError(true);
        })
    }, [])

    return isError ? (
            <p className="error">Ah! Something went wrong there ... :-(</p>
        ) : isLoading ? (
        <p>
            Loading articles - please wait ...
        </p>
        ) : (
        <main>
            <ul>
                {
                    articles.map((e) => {
                    return (
                        <SmallArticle article={e} username={userName} key={e.article_id} />
                    );
                    })
                }
            </ul>
        </main>
    )
}

export default ArticleList;