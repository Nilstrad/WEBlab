import React, { useState } from "react";

function UpdateNews() {
  const [id, setId] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch(`http://localhost:8080/api/news/update/${id}`, { // Исправлено на правильный шаблон строки
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title, content }),
    })
      .then((response) => {
        if (response.ok) {
          alert("News updated successfully!");
          setId("");
          setTitle("");
          setContent("");
        } else {
          alert("Failed to update news.");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        alert("An error occurred while updating the news.");
      });
  };

  return (
    <div className="form-container">
      <h2>Update News</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="news-id">News ID:</label>
          <input
            type="text"
            id="news-id"
            value={id}
            onChange={(e) => setId(e.target.value)}
            required
            className="input-field"
          />
        </div>
        <div className="form-group">
          <label htmlFor="news-title">Title:</label>
          <input
            type="text"
            id="news-title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="input-field"
          />
        </div>
        <div className="form-group">
          <label htmlFor="news-content">Content:</label>
          <textarea
            id="news-content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
            className="textarea-field"
          />
        </div>
        <button type="submit" className="button">
          Update News
        </button>
      </form>
    </div>
  );
}

export default UpdateNews;
