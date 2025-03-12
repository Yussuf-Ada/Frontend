import React, { useState, useEffect } from "react";
import WorkoutForm from "./WorkoutForm";
import { getExercises } from "../utils/api";
import {
  Container,
  Typography,
  Button,
  Card,
  CardContent,
  CardActions,
  Box,
  Grid,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

function ExerciseList() {
  // State management for category filtering and exercise selection
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedExercise, setSelectedExercise] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [exercises, setExercises] = useState([]);

  // Available exercise categories
  const categories = ["all", "Chest", "Back", "Legs", "Arms", "Shoulders"];

  useEffect(() => {
    // Fetch exercises on component mount
    fetchExercises();
  }, []);

  // Retrieves exercise data from the API
  async function fetchExercises() {
    try {
      const data = await getExercises();
      setExercises(data);
    } catch (error) {
      console.error("Error fetching exercises:", error.message);
    }
  }

  // Handles adding an exercise to the workout
  const handleAddToWorkout = (exercise) => {
    setSelectedExercise(exercise);
    setShowForm(true);
  };

  // Allows creation of custom exercises
  const handleCustomExercise = () => {
    setSelectedExercise(null);
    setShowForm(true);
  };

  // Closes the workout form when finished
  const handleFormClose = () => {
    setShowForm(false);
    setSelectedExercise(null);
  };

  // Updates the category filter selection
  const handleCategoryChange = (newCategory) => {
    if (newCategory !== null) {
      setSelectedCategory(newCategory);
    }
  };

  // Filters exercises based on selected category
  const filteredExercises =
    selectedCategory === "all"
      ? exercises
      : exercises.filter((exercise) => exercise.category === selectedCategory);

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>
        Exercise Library
      </Typography>

      <Box sx={{ mb: 7 }}>
        {/* Category filter controls */}
        <ToggleButtonGroup
          value={selectedCategory}
          exclusive
          onChange={handleCategoryChange}
          aria-label="exercise category"
        >
          {" "}
          {categories.map((category) => (
            <ToggleButton
              key={category}
              value={category}
              sx={{
                "&.Mui-selected": {
                  backgroundColor: "primary.main",
                  color: "white",
                  "&:hover": {
                    backgroundColor: "primary.dark",
                  },
                },
              }}
            >
              {category}
            </ToggleButton>
          ))}
        </ToggleButtonGroup>
        <Button
          variant="contained"
          color="primary"
          onClick={handleCustomExercise}
          endIcon={<AddIcon />}
          sx={{ ml: 2 }}
        >
          Custom Exercise
        </Button>
      </Box>

      {/* Grid display of filtered exercises */}
      <Grid container spacing={1}>
        {filteredExercises.map((exercise) => (
          <Grid xs={12} sm={6} md={4} lg={3} key={exercise.id}>
            <Card sx={{ margin: 2 }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  {exercise.name}
                </Typography>
                <Typography color="text.secondary">
                  {exercise.category}
                </Typography>
              </CardContent>
              <CardActions>
                <Button
                  endIcon={<AddIcon />}
                  variant="contained"
                  fullWidth
                  onClick={() => handleAddToWorkout(exercise)}
                >
                  Add to Workout
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Conditionally render the workout form when an exercise is selected */}
      {showForm && (
        <WorkoutForm
          preselectedExercise={selectedExercise ? selectedExercise.name : ""}
          // Supporting custom exercises, where the exercise name is null
          onClose={handleFormClose}
        />
      )}
    </Container>
  );
}

export default ExerciseList;
