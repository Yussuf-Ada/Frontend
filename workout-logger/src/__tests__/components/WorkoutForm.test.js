import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import WorkoutForm from "../../components/WorkoutForm";
import { addWorkout } from "../../utils/api";
import "@testing-library/jest-dom";

// Mock dependencies
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

  test("submits form with correct data", async () => {
    render(
      <BrowserRouter>
        <WorkoutForm />
      </BrowserRouter>
    );

    // Fill out form
    fireEvent.change(screen.getByLabelText("Exercise Name"), {
      target: { value: "Bench Press" },
    });
    fireEvent.change(screen.getByLabelText("Sets"), {
      target: { value: "3" },
    });
    fireEvent.change(screen.getByLabelText("Reps"), {
      target: { value: "10" },
    });
    fireEvent.change(screen.getByLabelText("Weight (kg)"), {
      target: { value: "60" },
    });

    // Submit form
    fireEvent.click(screen.getByRole("button", { name: "Add Workout" }));

    // Verify API was called with correct data
    await waitFor(() => {
      expect(addWorkout).toHaveBeenCalledWith(
        expect.objectContaining({
          exercise: "Bench Press",
          sets: "3",
          reps: "10",
          weight: "60",
        })
      );
    });
  });

  test("handles preselected exercise prop", () => {
    render(
      <BrowserRouter>
        <WorkoutForm preselectedExercise="Squats" />
      </BrowserRouter>
    );

    expect(screen.getByLabelText("Exercise Name")).toHaveValue("Squats");
  });

  test("calls onClose when Cancel button is clicked", () => {
    const mockOnClose = jest.fn();
    render(
      <BrowserRouter>
        <WorkoutForm onClose={mockOnClose} />
      </BrowserRouter>
    );

    fireEvent.click(screen.getByRole("button", { name: "Cancel" }));
    expect(mockOnClose).toHaveBeenCalled();
  });
});
