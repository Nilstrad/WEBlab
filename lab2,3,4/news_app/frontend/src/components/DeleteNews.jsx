import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const DeleteNews = () => {
  const [newsId, setNewsId] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch(`http://localhost:8080/api/news/delete/${newsId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        alert("News deleted successfully!");
        setNewsId("");
        navigate("/");
      } else {
        alert("Failed to delete news.");
      }
    } catch (error) {
      alert("Error: " + error.message);
    }
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        <h2>Delete News</h2>
        <label htmlFor="news-id">Enter News ID to Delete:</label>
        <input
          type="text"
          id="news-id"
          name="news-id"
          value={newsId}
          onChange={(e) => setNewsId(e.target.value)}
          placeholder="Enter the ID of the news to delete"
          required
        />

        <button type="submit" className="button">
          Delete
        </button>
      </form>
    </div>
  );
};

export default DeleteNews;
