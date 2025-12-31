// User Details
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

export default function UserDetails() {
  const { username } = useParams();
  const [user, setUser] = useState(null);
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        // Fetch user
        const userRes = await fetch(`/api/github/users/${username}`);
        if (!userRes.ok) {
          throw new Error('User not found');
        }
        const userData = await userRes.json();
        setUser(userData);

        // Fetch repos
        const reposRes = await fetch(`/api/github/users/${username}/repos`);
        const reposData = await reposRes.json();
        setRepos(reposData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [username]);

  if (loading) return <div style={{ padding: '2rem' }}>Loading user...</div>;
  if (error) return <div style={{ padding: '2rem', color: 'red' }}>Error: {error}</div>;

  return (
    <div style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <img
          src={user.avatar_url}
          alt={user.name || username}
          style={{ width: '100px', height: '100px', borderRadius: '50%' }}
        />
        <div>
          <h1>{user.name || username}</h1>
          {user.bio && <p>{user.bio}</p>}
          <a
            href={user.html_url}
            className="external-link"
            target="_blank"
            rel="noopener noreferrer"
          >
            View on GitHub
          </a>
        </div>
      </div>

      <h2>Public Repositories ({repos.length})</h2>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {repos.map((repo) => (
          <li key={repo.name} style={{ margin: '1rem 0', padding: '1rem', border: '1px solid #ddd', borderRadius: '4px' }}>
            <h3>
              <Link to={`/user/${repo.owner}/repo/${repo.name}`} style={{ textDecoration: 'none', color: '#1e40af' }}>
                {repo.name}
              </Link>
            </h3>
            <p>{repo.description || <em>No description</em>}</p>
            <small>
              Created: {new Date(repo.created_at).toLocaleDateString()} |
              Updated: {new Date(repo.updated_at).toLocaleDateString()}
            </small>
          </li>
        ))}
      </ul>
    </div>
  );
}