import { useState } from 'react';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header.jsx';
import ArticleList from './components/ArticleList.jsx';
import Article from './components/Article.jsx';

function App() {
  const [userName, setUserName] = useState("happyamy2016");

  return (
    <>
      <Header username={userName} />
      <Routes>
        <Route path="/" element={ <ArticleList /> } />
        <Route path="/articles" element={ <ArticleList /> } />
        <Route path="/articles/:article_id" element={ <Article /> } />
      </Routes>
    </>
  );
};

export default App;
