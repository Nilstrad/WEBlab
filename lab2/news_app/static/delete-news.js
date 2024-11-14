document.getElementById("delete-news-form").addEventListener("submit", async function(event) {
    event.preventDefault();
  
    const id = document.getElementById("delete-id").value;
  
    const response = await fetch(`http://localhost:8080/api/news/delete?id=${id}`, {
      method: 'DELETE'
    });
  
    if (response.ok) {
      alert("News deleted successfully!");
      window.location.href = '/'; // Redirect to home page
    } else {
      alert("Failed to delete news.");
    }
  });
  