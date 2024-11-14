document.getElementById("create-news-form").addEventListener("submit", async function(event) {
    event.preventDefault();
  
    const title = document.getElementById("title").value;
    const author = document.getElementById("author").value;
    const content = document.getElementById("content").value;
  
    const response = await fetch("http://localhost:8080/api/news/create", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ title, author, content })
    });
  
    if (response.ok) {
      alert("News created successfully!");
      window.location.href = '/'; 
    } else {
      alert("Failed to create news.");
    }
  });
  