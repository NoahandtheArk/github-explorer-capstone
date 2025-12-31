// User Details test
import React from "react";
import { render } from "@testing-library/react";
import UserDetails from "./UserDetails";

describe("UserDetails", () => {
  const mockUser = {
    name: "Test User",
    avatar_url: "https://via.placeholder.com/150",
    bio: "A test bio",
    html_url: "https://github.com/testuser",
  };

  const mockRepos = [
    {
      name: "test-repo",
      description: "A test repo",
      html_url: "https://github.com/testuser/test-repo",
      created_at: "2023-01-01T00:00:00Z",
      updated_at: "2023-01-02T00:00:00Z",
      owner: { login: "testuser" },
    },
  ];

  it("renders correctly and matches snapshot", () => {
    const { asFragment } = render(
      <UserDetails user={mockUser} repos={mockRepos} loading={false} />
    );

    expect(asFragment()).toMatchSnapshot();
  });

  it("shows loading state", () => {
    const { getByText } = render(
      <UserDetails user={null} repos={[]} loading={true} />
    );
    expect(getByText("Loading...")).toBeInTheDocument();
  });
});
