import { useState } from 'react';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header.jsx';
import ArticleList from './components/ArticleList.jsx';

function App() {
  const [userName, setUserName] = useState("happyamy2016");

  return (
    <>
      <Header username={userName} />
      <ArticleList />
    </>
  )
}

export default App;
