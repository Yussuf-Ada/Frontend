import React, { useState, useEffect } from "react";
import WorkoutForm from "./WorkoutForm";
import { getExercises } from "../utils/api";

function ExerciseList() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedExercise, setSelectedExercise] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [exercises, setExercises] = useState([]);

  const categories = ["all", "Chest", "Back", "Legs", "Arms", "Shoulders"];

  useEffect(() => {
    fetchExercises();
  }, []);

  async function fetchExercises() {
    try {
      const data = await getExercises();
      setExercises(data);
    } catch (error) {
      console.error("Error fetching exercises:", error.message);
    }
  }
  const handleAddToWorkout = (exercise) => {
    setSelectedExercise(exercise);
    setShowForm(true);
  };

  const handleFormClose = () => {
    setShowForm(false);
    setSelectedExercise(null);
  };

  const filteredExercises =
    selectedCategory === "all"
      ? exercises
      : exercises.filter((exercise) => exercise.category === selectedCategory);

  return (
    <div className="exercise-list">
      <h2>Exercise Library</h2>

      <div className="category-filter">
        {categories.map((category) => (
          <button
            key={category}
            className={selectedCategory === category ? "active" : ""}
            onClick={() => setSelectedCategory(category)}
          >
            {category}
          </button>
        ))}
      </div>

      <div className="exercises-grid">
        {filteredExercises.map((exercise) => (
          <div key={exercise.id} className="exercise-card">
            <h3>{exercise.name}</h3>
            <p>{exercise.category}</p>
            <button onClick={() => handleAddToWorkout(exercise)}>
              Add to Workout
            </button>
          </div>
        ))}
      </div>

      {showForm && (
        <div className="workout-form-overlay">
          <WorkoutForm
            preselectedExercise={selectedExercise.name}
            onClose={handleFormClose}
          />
        </div>
      )}
    </div>
  );
}

export default ExerciseList;
