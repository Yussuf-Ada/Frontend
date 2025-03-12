import React from "react";
import { render, screen, fireEvent, act } from "@testing-library/react";
import "@testing-library/jest-dom";
import Login from "../../components/Login";
import { loginUser, getUsers } from "../../utils/api";
import { BrowserRouter } from "react-router-dom";

// Mock the API calls
jest.mock("../../utils/api", () => ({
  loginUser: jest.fn(),
  getUsers: jest.fn(),
}));

// Mock useNavigate
const mockNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate,
}));

describe("Login", () => {
  const mockUsers = [
    { id: 1, name: "Test User", email: "test@example.com" },
    { id: 2, name: "Another User", email: "another@example.com" },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
    loginUser.mockResolvedValue({ token: "fake-token" });
    getUsers.mockResolvedValue(mockUsers);
  });

  test("renders user selection interface correctly", async () => {
    await act(async () => {
      render(
        <BrowserRouter>
          <Login />
        </BrowserRouter>
      );
    });

    expect(screen.getByText("Welcome to Workout Logger")).toBeInTheDocument();
    expect(screen.getByText("Select a user to continue:")).toBeInTheDocument();
    expect(getUsers).toHaveBeenCalled();
  });

  // Checks if users are displayed
  test("displays users from the API", async () => {
    await act(async () => {
      render(
        <BrowserRouter>
          <Login />
        </BrowserRouter>
      );
    });

    // Wait for users to load and be displayed
    await screen.findByText("Test User");
    expect(screen.getByText("Test User")).toBeInTheDocument();
    expect(screen.getByText("Another User")).toBeInTheDocument();
  });
});
