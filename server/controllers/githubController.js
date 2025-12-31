// Github Controller
const axios = require("axios");

// Clean API URL — no trailing spaces
const GITHUB_API = "https://api.github.com";

// Common headers for GitHub API
const GITHUB_HEADERS = {
  "User-Agent": "GitHub-Explorer-App", // Required by GitHub
};

/**
 * Fetch user profile from GitHub
 */
async function getUser(req, res) {
  try {
    const { username } = req.params;

    // Hardcoded, no constants, no variables
    const url = `https://api.github.com/users/${encodeURIComponent(username)}`;

    const response = await axios.get(url, {
      headers: {
        "User-Agent": "Mozilla/5.0 (GitHub-Explorer-App)", // GitHub-friendly UA
        Accept: "application/vnd.github.v3+json",
      },
      timeout: 10000,
    });

    const { name, avatar_url, bio, public_repos, html_url } = response.data;
    res.json({ name, avatar_url, bio, public_repos, html_url });
  } catch (error) {
    console.error("Full error response:", error.response?.data);
    console.error("Status:", error.response?.status);
    console.error("Headers sent:", error.config?.headers);

    if (error.response?.status === 404) {
      return res.status(404).json({ error: "User not found" });
    }
    res.status(500).json({ error: "Failed to fetch user from GitHub" });
  }
}

/**
 * Fetch user's public repos
 */
async function getUserRepos(req, res) {
  try {
    const { username } = req.params;
    const reposRes = await axios.get(
      `${GITHUB_API}/users/${username}/repos?per_page=10&sort=updated`,
      {
        headers: GITHUB_HEADERS,
      }
    );
    const repos = reposRes.data.map((repo) => ({
      name: repo.name,
      description: repo.description,
      html_url: (repo.html_url || "").trim(),
      created_at: repo.created_at,
      updated_at: repo.updated_at,
      owner: repo.owner.login,
    }));
    res.json(repos);
  } catch (error) {
    console.error("Repo fetch error:", error.message);
    res.status(500).json({ error: "Failed to fetch repos" });
  }
}

/**
 * Fetch last 5 commits for a repo
 */
async function getCommits(req, res) {
  try {
    const { owner, repo } = req.params;
    const commitsRes = await axios.get(
      `${GITHUB_API}/repos/${owner}/${repo}/commits?per_page=5`,
      {
        headers: GITHUB_HEADERS,
      }
    );
    const commits = commitsRes.data.map((commit) => ({
      sha: commit.sha,
      message: commit.commit.message,
      author: commit.commit.author.name,
      date: commit.commit.author.date,
      html_url: (commit.html_url || "").trim(),
    }));
    res.json(commits);
  } catch (error) {
    console.error("Commits fetch error:", error.message);
    res.status(500).json({ error: "Failed to fetch commits" });
  }
}

module.exports = { getUser, getUserRepos, getCommits };
