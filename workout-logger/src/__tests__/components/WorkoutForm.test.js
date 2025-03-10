import React from "react";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import WorkoutForm from "../../components/WorkoutForm";
import "@testing-library/jest-dom";

// Mocking dependencies
jest.mock("../../utils/api", () => ({
  addWorkout: jest.fn(),
}));
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => jest.fn(),
}));

describe("WorkoutForm", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders form elements correctly", () => {
    render(
      <BrowserRouter>
        <WorkoutForm />
      </BrowserRouter>
    );

    expect(screen.getByText("Add New Workout")).toBeInTheDocument();
    expect(screen.getByLabelText("Exercise Name")).toBeInTheDocument();
    expect(screen.getByLabelText("Date")).toBeInTheDocument();
    expect(screen.getByLabelText("Sets")).toBeInTheDocument();
    expect(screen.getByLabelText("Reps")).toBeInTheDocument();
    expect(screen.getByLabelText("Weight (kg)")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Add Workout" })
    ).toBeInTheDocument();
  });
});
