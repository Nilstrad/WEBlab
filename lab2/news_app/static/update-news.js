document.getElementById("update-news-form").addEventListener("submit", async function(event) {
    event.preventDefault();
  
    const id = document.getElementById("update-id").value;
    const title = document.getElementById("update-title").value;
    const author = document.getElementById("update-author").value;
    const content = document.getElementById("update-content").value;
  
    const response = await fetch(`http://localhost:8080/api/news/update?id=${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ title, author, content })
    });
  
    if (response.ok) {
      alert("News updated successfully!");
      window.location.href = '/'; // Redirect to home page
    } else {
      alert("Failed to update news.");
    }
  });
  