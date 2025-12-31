// Components User Details
import React from "react";

const UserDetails = ({ user, repos, loading }) => {
  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <img src={user.avatar_url} alt={user.name} width="100" />
      <h1>{user.name}</h1>
      <p>{user.bio}</p>
      <a
        href={user.html_url}
        className="external-link"
        target="_blank"
        rel="noopener noreferrer"
      >
        View profile on GitHub
      </a>
      {/* Render repos, etc. */}
    </div>
  );
};

export default UserDetails;
