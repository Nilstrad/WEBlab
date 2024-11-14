// API Base URL
const baseUrl = "http://localhost:8080/api/news";

// Pagination variables
let currentPage = 1;
const pageSize = 5;

// Fetch and display all news articles with pagination
async function fetchNews(page = 1) {
  const response = await fetch(`${baseUrl}?page=${page}&size=${pageSize}`);
  const news = await response.json();
  const newsListDiv = document.getElementById("news-list");
  newsListDiv.innerHTML = '';

  news.forEach(newsItem => {
    const newsElement = document.createElement('div');
    newsElement.classList.add('news-item');
    newsElement.innerHTML = `
      <h3>${newsItem.title}</h3>
      <p><strong>Author:</strong> ${newsItem.author}</p>
      <p><strong>Content:</strong> ${newsItem.content}</p>
      <button onclick="deleteNews(${newsItem.id})">Delete</button>
    `;
    newsListDiv.appendChild(newsElement);
  });

  updatePaginationControls();
}

// Handle page change for pagination
function changePage(direction) {
  if (direction === 'next') {
    currentPage++;
  } else if (direction === 'prev' && currentPage > 1) {
    currentPage--;
  }
  fetchNews(currentPage);
}

// Update pagination controls visibility
function updatePaginationControls() {
  const prevButton = document.getElementById("prev-page");
  const nextButton = document.getElementById("next-page");

  // Disable previous button if on first page
  prevButton.disabled = currentPage === 1;
  // Enable next button as needed (you may want to check total pages here)
  nextButton.disabled = false; // Disable when the last page is reached
}

// Create a new news article
document.getElementById("create-news-form").addEventListener("submit", async function(event) {
  event.preventDefault();

  const title = document.getElementById("title").value;
  const author = document.getElementById("author").value;
  const content = document.getElementById("content").value;

  const response = await fetch(baseUrl + "/create", {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ title, author, content })
  });

  if (response.ok) {
    alert("News created successfully!");
    fetchNews(currentPage);
  } else {
    alert("Failed to create news.");
  }
});

// Update an existing news article
document.getElementById("update-news-form").addEventListener("submit", async function(event) {
  event.preventDefault();

  const id = document.getElementById("update-id").value;
  const title = document.getElementById("update-title").value;
  const author = document.getElementById("update-author").value;
  const content = document.getElementById("update-content").value;

  const response = await fetch(baseUrl + "/update?id=" + id, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ title, author, content })
  });

  if (response.ok) {
    alert("News updated successfully!");
    fetchNews(currentPage);
  } else {
    alert("Failed to update news.");
  }
});

// Delete a news article
async function deleteNews(id) {
  const response = await fetch(baseUrl + "/delete?id=" + id, {
    method: 'DELETE'
  });

  if (response.ok) {
    alert("News deleted successfully!");
    fetchNews(currentPage);
  } else {
    alert("Failed to delete news.");
  }
}

// Load news on page load
fetchNews(currentPage);
