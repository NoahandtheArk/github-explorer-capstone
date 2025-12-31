// Home
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Home() {
  const [username, setUsername] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username.trim()) {
      navigate(`/user/${encodeURIComponent(username.trim())}`);
    }
  };

  return (
    <div style={{ padding: '2rem', maxWidth: '600px', margin: '0 auto' }}>
      <h1>GitHub Explorer</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">Search GitHub User:</label>
        <br />
        <input
          id="username"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="e.g. octocat"
          style={{ padding: '0.5rem', width: '70%', marginRight: '0.5rem' }}
        />
        <button
          type="submit"
          style={{ padding: '0.5rem 1rem', backgroundColor: '#2563eb', color: 'white', border: 'none', borderRadius: '4px' }}
        >
          Search
        </button>
      </form>
    </div>
  );
}