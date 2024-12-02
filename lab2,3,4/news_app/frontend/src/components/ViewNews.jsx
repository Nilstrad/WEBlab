import React, { useState, useEffect } from "react";

function ViewNews() {
  const [news, setNews] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/news")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch news.");
        }
        return response.json();
      })
      .then((data) => {
        setNews(data || []);  // Гарантируем, что всегда будет массив
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error:", error);
        setError("An error occurred while fetching news.");
        setLoading(false);
      });
  }, []);

  return (
    <div className="view-news-container">
      <h2>View News</h2>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <ul className="news-list">
          {news.length > 0 ? (
            news.map((item) => (
              <li key={item.id} className="news-item">
                <h3 className="news-title">ID: {item.id} - {item.title}</h3>
                <p className="news-content">{item.content}</p>
              </li>
            ))
          ) : (
            <p>No news available.</p>
          )}
        </ul>
      )}
    </div>
  );
}

export default ViewNews;
