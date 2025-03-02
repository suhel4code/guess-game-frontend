// src/components/Login.test.jsx
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import { useUser } from "../context/User";
import { describe, it, expect, vi } from "vitest";
import Game from "./Game";

// Mock the useUser hook
vi.mock("../context/User", () => ({
  useUser: vi.fn(),
}));

// Mock the axiosInstance
vi.mock("../api/axiosInstance", () => ({
  get: vi.fn(),
}));

// Mock react-router-dom
vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom"); // Use vi.importActual
  return {
    ...actual,
    useNavigate: () => vi.fn(), // Mock useNavigate
  };
});

describe("Login Component", () => {
  const mockLogin = vi.fn();
  const mockNavigate = vi.fn();

  beforeEach(() => {
    // Mock useUser hook
    useUser.mockReturnValue({
      user: null, // Simulate no user logged in
      login: mockLogin,
    });
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it("renders the game component", () => {
    render(
      <Router>
        <Game />
      </Router>
    );

    // Check if the welcome message is displayed
    expect(screen.getByText("Total Games Played")).toBeInTheDocument();
  });
});
