const API_URL = '/api/news'; 

export const getAllNews = async () => {
  const response = await fetch(`${API_URL}`);
  if (!response.ok) {
    throw new Error('Failed to fetch news');
  }
  return await response.json();
};

export const getNewsById = async (id) => {
  const response = await fetch(`${API_URL}/${id}`);
  if (!response.ok) {
    throw new Error('Failed to fetch news by ID');
  }
  return await response.json();
};

export const createNews = async (news) => {
  const response = await fetch(`${API_URL}/create`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(news),
  });
  if (!response.ok) {
    throw new Error('Failed to create news');
  }
  return await response.json();
};

export const updateNews = async (id, news) => {
  const response = await fetch(`${API_URL}/update/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(news),
  });
  if (!response.ok) {
    throw new Error('Failed to update news');
  }
  return await response.json();
};

export const deleteNews = async (id) => {
  const response = await fetch(`${API_URL}/delete/${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) {
    throw new Error('Failed to delete news');
  }
  return await response.json();
};
