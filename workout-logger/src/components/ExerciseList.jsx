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

  const handleCategoryChange = (event, newCategory) => {
    if (newCategory !== null) {
      setSelectedCategory(newCategory);
    }
  };

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
        <ToggleButtonGroup
          value={selectedCategory}
          exclusive
          onChange={handleCategoryChange}
          aria-label="exercise category"
        >
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
      </Box>

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
                  startIcon={<AddIcon />}
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

      {showForm && (
        <WorkoutForm
          preselectedExercise={selectedExercise.name}
          onClose={handleFormClose}
        />
      )}
    </Container>
  );
}

export default ExerciseList;
