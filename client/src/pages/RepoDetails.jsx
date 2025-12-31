// RepoDetails
import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

export default function RepoDetails() {
  const { owner, repo } = useParams();
  const [repoData, setRepoData] = useState(null);
  const [commits, setCommits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRepoAndCommits = async () => {
      try {
        setLoading(true);
        setError(null);

        // Fetch repo details
        const repoRes = await fetch(`/api/github/users/${owner}/repos`);
        if (!repoRes.ok) throw new Error("Failed to fetch repos");
        const repos = await repoRes.json();
        const targetRepo = repos.find((r) => r.name === repo);
        if (!targetRepo) throw new Error("Repo not found");

        // Fetch last 5 commits
        const commitsRes = await fetch(
          `/api/github/repos/${owner}/${repo}/commits`
        );
        if (!commitsRes.ok) throw new Error("Failed to fetch commits");
        const commitsData = await commitsRes.json();

        setRepoData(targetRepo);
        setCommits(commitsData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (owner && repo) {
      fetchRepoAndCommits();
    }
  }, [owner, repo]);

  if (loading)
    return <div style={{ padding: "2rem" }}>Loading repository details...</div>;
  if (error)
    return <div style={{ padding: "2rem", color: "red" }}>Error: {error}</div>;

  return (
    <div style={{ padding: "2rem", maxWidth: "900px", margin: "0 auto" }}>
      <h1>Repo Details</h1>

      {/* Repo metadata */}
      <div style={{ marginBottom: "2rem" }}>
        <h2>
          <a
            href={repoData.html_url}
            className="external-link"
            target="_blank"
            rel="noopener noreferrer"
          >
            {owner}/{repo}
          </a>
        </h2>
        <p>
          <strong>Description:</strong>{" "}
          {repoData.description || <em>No description</em>}
        </p>
        <p>
          <strong>Created:</strong>{" "}
          {new Date(repoData.created_at).toLocaleString()}
        </p>
        <p>
          <strong>Last updated:</strong>{" "}
          {new Date(repoData.updated_at).toLocaleString()}
        </p>
      </div>

      {/* Last 5 commits */}
      <div>
        <h3>Last 5 Commits</h3>
        {commits.length === 0 ? (
          <p>No commits found.</p>
        ) : (
          <ul style={{ listStyle: "none", padding: 0 }}>
            {commits.map((commit, index) => (
              <li
                key={commit.sha}
                style={{
                  marginBottom: "1rem",
                  padding: "1rem",
                  border: "1px solid #ddd",
                  borderRadius: "6px",
                  backgroundColor: "#fafafa",
                }}
              >
                <div>
                  <strong>#{index + 1}</strong> {commit.message.split("\n")[0]}
                </div>
                <div
                  style={{
                    fontSize: "0.9rem",
                    color: "#555",
                    marginTop: "0.3rem",
                  }}
                >
                  by {commit.author} on {new Date(commit.date).toLocaleString()}
                </div>
                <div style={{ marginTop: "0.5rem" }}>
                  <a
                    href={commit.html_url}
                    className="external-link"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View commit
                  </a>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Back to user profile */}
      <div style={{ marginTop: "2rem" }}>
        <Link
          to={`/user/${owner}`}
          style={{ color: "#92abe2ff", textDecoration: "underline" }}
        >
          ← Back to {owner}'s profile
        </Link>
      </div>
    </div>
  );
}
