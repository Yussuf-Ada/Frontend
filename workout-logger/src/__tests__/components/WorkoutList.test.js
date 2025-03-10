import React from "react";
import {
  render,
  screen,
  fireEvent,
  waitFor,
  act,
} from "@testing-library/react";
import "@testing-library/jest-dom";
import WorkoutList from "../../components/WorkoutList";
import { getWorkouts, deleteWorkout, editWorkout } from "../../utils/api";

// Mock the API functions
jest.mock("../../utils/api", () => ({
  getWorkouts: jest.fn(),
  deleteWorkout: jest.fn(),
  editWorkout: jest.fn(),
}));

describe("WorkoutList", () => {
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
    jest.clearAllMocks();
    getWorkouts.mockResolvedValue(mockWorkouts);
    deleteWorkout.mockResolvedValue({});
    editWorkout.mockResolvedValue({});
  });

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
});
