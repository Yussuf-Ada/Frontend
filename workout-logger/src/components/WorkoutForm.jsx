import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addWorkout } from "../utils/api.js";

function WorkoutForm({ preselectedExercise, onClose }) {
  const navigate = useNavigate();
  const [workout, setWorkout] = useState({
    exercise: preselectedExercise || "",
    sets: "",
    reps: "",
    weight: "",
    category: "",
    date: new Date().toISOString().split("T")[0],
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await addWorkout(workout);
    if (onClose) {
      onClose();
    } else {
      navigate("/workouts");
    }
  };

  return (
    <div className="workout-form">
      <h2>Add New Workout</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Exercise Name"
          value={workout.exercise}
          onChange={(e) => setWorkout({ ...workout, exercise: e.target.value })}
        />
        <input
          type="date"
          value={workout.date}
          onChange={(e) => setWorkout({ ...workout, date: e.target.value })}
        />
        <input
          type="number"
          placeholder="Sets"
          value={workout.sets}
          onChange={(e) => setWorkout({ ...workout, sets: e.target.value })}
        />
        <input
          type="number"
          placeholder="Reps"
          value={workout.reps}
          onChange={(e) => setWorkout({ ...workout, reps: e.target.value })}
        />
        <input
          type="number"
          placeholder="Weight (kg)"
          value={workout.weight}
          onChange={(e) => setWorkout({ ...workout, weight: e.target.value })}
        />
        <select
          value={workout.category}
          onChange={(e) => setWorkout({ ...workout, category: e.target.value })}
        >
          <option value="">Select Category</option>
          <option value="Strength">Strength</option>
          <option value="Cardio">Cardio</option>
          <option value="Flexibility">Flexibility</option>
        </select>
        <div className="form-buttons">
          <button type="submit">Add Workout</button>
          {onClose && (
            <button type="button" onClick={onClose}>
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
}

export default WorkoutForm;
