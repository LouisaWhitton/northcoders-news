import { useState } from 'react';
//import { useNavigate } from 'react-router-dom';

function SmallArticle({ article }) {
    //const navigate = useNavigate();
    return (
        <span className="small-box">
            <p className="small-box-category">{article.topic}</p>
            <p className="small-box-dateadded">added {article.created_at.substring(8,10)}/{article.created_at.substring(5,7)}/{article.created_at.substring(0,4)} {article.created_at.substring(11, 16)}</p>
            <h2 className="small-box-title">{article.title}</h2>
            <p className="small-box-votes">{article.votes} votes</p>
            <p className="small-box-comments">{article.comment_count} comments</p>
            <img src={article.article_img_url} className="small-box-image"></img>
            
        </span>
    )
}

export default SmallArticle;