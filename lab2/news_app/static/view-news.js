async function fetchNews() {
    const response = await fetch("http://localhost:8080/api/news");
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
      `;
      newsListDiv.appendChild(newsElement);
    });
  }
  
  fetchNews();
  