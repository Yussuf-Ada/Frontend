import React from "react";
import { render, screen, fireEvent, act } from "@testing-library/react";
import "@testing-library/jest-dom";
import WorkoutList from "../../components/WorkoutList";
import { getWorkouts, deleteWorkout, editWorkout } from "../../utils/api";

// Mock the API functions to avoid actual network requests during testing
jest.mock("../../utils/api", () => ({
  getWorkouts: jest.fn(),
  deleteWorkout: jest.fn(),
  editWorkout: jest.fn(),
}));

describe("WorkoutList", () => {
  // Sample workout data for testing purposes
  const mockWorkouts = [
    {
      id: 1,
      exercise: "Bench Press",
      sets: "3",
      reps: "10",
      weight: "60",
      date: "2025-03-10",
      notes: "Feeling strong",
    },
    {
      id: 2,
      exercise: "Squats",
      sets: "4",
      reps: "8",
      weight: "100",
      date: "2025-03-10",
      notes: "New PR",
    },
  ];

  beforeEach(() => {
    // Reset mock function states before each test to ensure clean testing environment
    jest.clearAllMocks();
    // Setup mock responses for API calls
    getWorkouts.mockResolvedValue(mockWorkouts);
    deleteWorkout.mockResolvedValue({});
    editWorkout.mockResolvedValue({});
  });

  // Verify the component properly renders the workout list from API data
  test("renders workout list correctly", async () => {
    await act(async () => {
      render(<WorkoutList />);
    });

    const benchPress = await screen.findByText("Bench Press");
    expect(benchPress).toBeInTheDocument();

    expect(screen.getByText("Squats")).toBeInTheDocument();
    expect(screen.getByText("Sets: 3")).toBeInTheDocument();
    expect(screen.getByText("Weight: 60kg")).toBeInTheDocument();

    expect(getWorkouts).toHaveBeenCalledTimes(1);
  });

  // Ensure the delete functionality properly removes a workout entry
  test("can delete a workout", async () => {
    await act(async () => {
      render(<WorkoutList />);
    });

    await screen.findByText("Bench Press");

    const deleteButtons = screen.getAllByText("Delete");

    await act(async () => {
      fireEvent.click(deleteButtons[0]);
    });

    // Check if the deletion API was called with the correct workout ID
    expect(deleteWorkout).toHaveBeenCalledWith(1);
    // Verify list is refreshed after deletion
    expect(getWorkouts).toHaveBeenCalledTimes(2);
  });

  // Validate the edit functionality correctly updates workout information
  test("can edit a workout", async () => {
    await act(async () => {
      render(<WorkoutList />);
    });

    await screen.findByText("Bench Press");

    const editButtons = screen.getAllByText("Edit");

    await act(async () => {
      fireEvent.click(editButtons[0]);
    });

    const saveButton = await screen.findByText("Save");
    expect(saveButton).toBeInTheDocument();

    const weightInputs = screen.getAllByLabelText("Weight (kg)");

    await act(async () => {
      fireEvent.change(weightInputs[0], { target: { value: "65" } });
      fireEvent.click(saveButton);
    });

    // Confirm the edit API was called with the proper workout ID and updated weight value
    expect(editWorkout).toHaveBeenCalledWith(
      1,
      expect.objectContaining({ weight: "65" })
    );
  });
});
