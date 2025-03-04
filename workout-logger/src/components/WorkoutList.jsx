import React, { useEffect, useState } from "react";
import { getWorkouts, deleteWorkout, editWorkout } from "../utils/api.js";

function WorkoutList() {
  const [workoutsByDay, setWorkoutsByDay] = useState({});
  const [editingWorkout, setEditingWorkout] = useState(null);

  useEffect(() => {
    loadWorkouts();
  }, []);

  const loadWorkouts = async () => {
    const data = await getWorkouts();

    // Group workouts by date
    const grouped = data.reduce((acc, workout) => {
      const date = workout.date
        ? new Date(workout.date)
            .toLocaleDateString("en-US", {
              month: "long",
              day: "numeric",
              year: "numeric",
            })
            .replace(",", "")
        : "Today";

      if (!acc[date]) {
        acc[date] = [];
      }
      acc[date].push(workout);
      return acc;
    }, {});

    const sortedEntries = Object.entries(grouped).sort(
      ([dateA], [dateB]) => new Date(dateB) - new Date(dateA)
    );

    setWorkoutsByDay(Object.fromEntries(sortedEntries));
  };

  const handleEdit = (workout) => {
    setEditingWorkout(workout);
  };

  const handleSaveEdit = async (id, updatedData) => {
    await editWorkout(id, updatedData);
    setEditingWorkout(null);
    loadWorkouts();
  };

  const handleDelete = async (id) => {
    await deleteWorkout(id);
    loadWorkouts();
  };

  return (
    <div className="workout-list">
      <h2>My Workouts</h2>
      {Object.entries(workoutsByDay).map(([date, workouts]) => (
        <div key={date} className="day-group">
          <h3 className="date-header">{date}</h3>
          <div className="workouts-grid">
            {workouts.map((workout) => (
              <div key={workout.id} className="workout-card">
                {editingWorkout?.id === workout.id ? (
                  <div className="edit-form">
                    <input
                      defaultValue={workout.exercise}
                      onChange={(e) => (workout.exercise = e.target.value)}
                    />
                    <input
                      type="number"
                      defaultValue={workout.sets}
                      onChange={(e) => (workout.sets = e.target.value)}
                    />
                    <input
                      type="number"
                      defaultValue={workout.reps}
                      onChange={(e) => (workout.reps = e.target.value)}
                    />
                    <input
                      type="number"
                      defaultValue={workout.weight}
                      onChange={(e) => (workout.weight = e.target.value)}
                    />
                    <button onClick={() => handleSaveEdit(workout.id, workout)}>
                      Save
                    </button>
                    <button onClick={() => setEditingWorkout(null)}>
                      Cancel
                    </button>
                  </div>
                ) : (
                  <>
                    <h3>{workout.exercise}</h3>
                    <p>Sets: {workout.sets}</p>
                    <p>Reps: {workout.reps}</p>
                    <p>Weight: {workout.weight}kg</p>
                    <p>Category: {workout.category}</p>
                    <button onClick={() => handleDelete(workout.id)}>
                      Delete
                    </button>
                    <button onClick={() => handleEdit(workout)}>Edit</button>
                  </>
                )}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default WorkoutList;
