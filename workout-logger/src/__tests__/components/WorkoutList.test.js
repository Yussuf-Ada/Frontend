import React from "react";
import { render, screen, fireEvent, act } from "@testing-library/react";
import "@testing-library/jest-dom";
import WorkoutList from "../../components/WorkoutList";
import { getWorkouts, deleteWorkout, editWorkout } from "../../utils/api";

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

  test("can delete a workout", async () => {
    await act(async () => {
      render(<WorkoutList />);
    });

    await screen.findByText("Bench Press");

    const deleteButtons = screen.getAllByText("Delete");

    await act(async () => {
      fireEvent.click(deleteButtons[0]);
    });

    expect(deleteWorkout).toHaveBeenCalledWith(1);
    expect(getWorkouts).toHaveBeenCalledTimes(2);
  });

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

    expect(editWorkout).toHaveBeenCalledWith(
      1,
      expect.objectContaining({ weight: "65" })
    );
  });
});
