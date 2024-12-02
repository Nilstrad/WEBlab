import React, { useEffect, useState } from "react";
import { getAllNews } from "../api";
import { Link } from "react-router-dom";

const NewsList = () => {
  const [newsList, setNewsList] = useState([]);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const news = await getAllNews();
        setNewsList(news);
      } catch (error) {
        console.error("Error fetching news:", error);
      }
    };

    fetchNews();
  }, []);

  return (
    <div className="news-container">
      <h2>News List</h2>
      {newsList.length > 0 ? (
        <div className="news-list">
          {newsList.map((news) => (
            <div className="news-item" key={news.id}>
              <p className="title">Title: {news.title}</p>
              <p className="author">Author: {news.author}</p>
              <p className="id">ID: {news.id}</p>
              <div className="news-actions">
                <Link to={`/view/${news.id}`} className="button">
                  View
                </Link>
                <Link to={`/update/${news.id}`} className="button">
                  Edit
                </Link>
                <Link to={`/delete/${news.id}`} className="button">
                  Delete
                </Link>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>No news available.</p>
      )}
    </div>
  );
};

export default NewsList;
