import React, { useState } from "react";

const CreateNews = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    const newsData = { title, author, content };

    try {
      const response = await fetch("/api/news/create", {  // Используем относительный URL для проксирования запросов
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newsData),
      });

      if (response.ok) {
        alert("News created successfully!");
        setTitle("");
        setAuthor("");
        setContent("");
      } else {
        alert("Failed to create news.");
      }
    } catch (error) {
      console.error("Error creating news:", error);
      alert("An error occurred while creating the news.");
    }
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        <h2>Create News</h2>
        <label htmlFor="title">Title:</label>
        <input
          type="text"
          id="title"
          name="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter the news title"
          required
        />

        <label htmlFor="author">Author:</label>
        <input
          type="text"
          id="author"
          name="author"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          placeholder="Enter the author's name"
          required
        />

        <label htmlFor="content">Content:</label>
        <textarea
          id="content"
          name="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Enter the content of the news"
          required
        />

        <button type="submit">Create News</button>
      </form>
    </div>
  );
};

export default CreateNews;
