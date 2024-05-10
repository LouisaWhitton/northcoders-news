import { useState } from 'react';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header.jsx';
import ArticleList from './components/ArticleList.jsx';
import Article from './components/Article.jsx';
import CommentList from './components/CommentList.jsx';

function App() {
  const [userName, setUserName] = useState("happyamy2016");
  const [article, setArticle] = useState([]);
  const [userVotes, setUserVotes] = useState([]);

  return (
    <>
      <Header username={userName} />
      <Routes>
        <Route path="/" element={ <ArticleList userName={userName}/> } />
        <Route path="/articles" element={ <ArticleList userName={userName} /> } />
        <Route path="/articles/:article_id" element={ <Article userName={userName} article={article} setArticle={setArticle} userVotes={userVotes} setUserVotes={setUserVotes}/> } />
        <Route path="/articles/:article_id/comments" element={ <CommentList userName={userName} article={article} /> } />
      </Routes>
    </>
  );
};

export default App;
