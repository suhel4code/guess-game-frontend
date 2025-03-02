// src/components/Login.test.jsx
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import Login from "./Login";
import { useUser } from "../context/User";
import { describe, it, expect, vi } from "vitest";

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

  it("renders the login form", () => {
    render(
      <Router>
        <Login />
      </Router>
    );

    // Check if the welcome message is displayed
    expect(
      screen.getByText("Welcome to The Globetrotter Challenge")
    ).toBeInTheDocument();

    // Check if the input field is displayed
    expect(screen.getByLabelText("Enter your name")).toBeInTheDocument();

    // Check if the Login and Create User buttons are displayed
    expect(screen.getByTestId("log-in-button")).toBeInTheDocument();
    expect(screen.getByTestId("create-user")).toBeInTheDocument();
  });
});
