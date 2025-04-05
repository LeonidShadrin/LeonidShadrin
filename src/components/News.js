import React, { useState } from 'react';
import { newsData } from '../data/newsData';
// import './News.css';

function News() {
  const [expandedId, setExpandedId] = useState(null);

  const toggleNews = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <div className="News">
      <h1>Новини</h1>
      {newsData.map((news) => (
        <div key={news.id} className="news-item">
          <h2 onClick={() => toggleNews(news.id)}>{news.title}</h2>
          {expandedId === news.id && <p>{news.content}</p>}
        </div>
      ))}
    </div>
  );
}

export default News;
