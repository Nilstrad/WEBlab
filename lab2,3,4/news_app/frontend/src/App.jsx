import React from 'react';
import { Route, Routes, Link } from 'react-router-dom';
import CreateNews from './components/CreateNews';
import UpdateNews from './components/UpdateNews';
import DeleteNews from './components/DeleteNews';
import ViewNews from './components/ViewNews';

function App() {
  return (
    <div>
      <h1>News Application</h1>

      {/* Навигационное меню */}
      <nav>
        <ul>
          <li><Link to="/" className="button">Home</Link></li>
          <li><Link to="/create-news" className="button">Create News</Link></li>
          <li><Link to="/update-news" className="button">Update News</Link></li>
          <li><Link to="/delete-news" className="button">Delete News</Link></li>
          <li><Link to="/view-news" className="button">View News</Link></li>
        </ul>
      </nav>

      {/* Настроим маршруты */}
      <Routes>
        <Route path="/" element={<h2>Welcome to the News App</h2>} />
        <Route path="/create-news" element={<CreateNews />} />
        <Route path="/update-news" element={<UpdateNews />} />
        <Route path="/delete-news" element={<DeleteNews />} />
        <Route path="/view-news" element={<ViewNews />} />
      </Routes>
    </div>
  );
}

export default App;
