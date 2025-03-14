import React, { useEffect, useState } from "react";
import { getWorkouts, deleteWorkout, editWorkout } from "../utils/api.js";
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  TextField,
  Box,
  Divider,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

function WorkoutList() {
  // State for storing workouts grouped by date and tracking the workout being edited
  const [workoutsByDay, setWorkoutsByDay] = useState({});
  const [editingWorkout, setEditingWorkout] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Load user data from localStorage if available
    const userData = localStorage.getItem("user");
    if (userData) {
      const parsedUser = JSON.parse(userData);
      setUser(parsedUser);

      // debug code
      console.log("User in localStorage:", parsedUser);
      console.log("User ID type:", typeof parsedUser.id);
    } else {
      console.log("No user found in localStorage");
    }

    // Fetch workouts data on component mount
    loadWorkouts();
  }, []);

  // Fetches workout data and organizes it by date
  const loadWorkouts = async () => {
    const data = await getWorkouts();
    // Group workouts by date for better organisation
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

      // Create array for the date if it doesn't exist yet, then add the workout to that date's array
      if (!acc[date]) acc[date] = [];
      acc[date].push(workout);
      return acc;
    }, {});

    // Sort entries by date (newest first)
    const sortedEntries = Object.entries(grouped).sort(
      ([dateA], [dateB]) => new Date(dateB) - new Date(dateA)
    );

    setWorkoutsByDay(Object.fromEntries(sortedEntries));
  };

  // Enables edit mode for a selected workout
  const handleEdit = (workout) => {
    setEditingWorkout(workout);
  };

  // Saves the edited workout data to the backend
  const handleSaveEdit = async (id, updatedData) => {
    await editWorkout(id, updatedData);
    setEditingWorkout(null);
    loadWorkouts();
  };

  // Deletes a workout from the backend
  const handleDelete = async (id) => {
    await deleteWorkout(id);
    loadWorkouts();
  };

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>
        {user ? `${user.name}'s Workouts` : "Workouts"}
      </Typography>
      {/* Render workouts grouped by date */}
      {Object.entries(workoutsByDay).map(([date, workouts]) => (
        <Box key={date} sx={{ mb: 4 }}>
          <Typography variant="h5" sx={{ my: 2 }}>
            {date}
          </Typography>
          <Divider sx={{ mb: 2 }} />
          <Grid container spacing={3}>
            {workouts.map((workout) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={workout.id}>
                <Card elevation={2}>
                  <CardContent>
                    {/* Show edit form when a workout is being edited */}
                    {editingWorkout?.id === workout.id ? (
                      <Box
                        component="form"
                        sx={{ "& .MuiTextField-root": { mb: 2 } }}
                      >
                        <TextField
                          fullWidth
                          label="Exercise"
                          defaultValue={workout.exercise}
                          onChange={(e) => (workout.exercise = e.target.value)}
                        />
                        <TextField
                          fullWidth
                          type="number"
                          label="Sets"
                          defaultValue={workout.sets}
                          onChange={(e) => (workout.sets = e.target.value)}
                        />
                        <TextField
                          fullWidth
                          type="number"
                          label="Reps"
                          defaultValue={workout.reps}
                          onChange={(e) => (workout.reps = e.target.value)}
                        />
                        <TextField
                          fullWidth
                          type="number"
                          label="Weight (kg)"
                          defaultValue={workout.weight}
                          onChange={(e) => (workout.weight = e.target.value)}
                        />
                        <TextField
                          fullWidth
                          type="text"
                          label="Notes"
                          defaultValue={workout.notes}
                          onChange={(e) => (workout.notes = e.target.value)}
                        />
                        <Box sx={{ mt: 2 }}>
                          <Button
                            variant="contained"
                            onClick={() => handleSaveEdit(workout.id, workout)}
                            sx={{ mr: 1 }}
                          >
                            Save
                          </Button>
                          <Button
                            variant="outlined"
                            onClick={() => setEditingWorkout(null)}
                          >
                            Cancel
                          </Button>
                        </Box>
                      </Box>
                    ) : (
                      <>
                        <Typography variant="h6" gutterBottom>
                          {workout.exercise}
                        </Typography>
                        <Typography>Sets: {workout.sets}</Typography>
                        <Typography>Reps: {workout.reps}</Typography>
                        <Typography>Weight: {workout.weight}kg</Typography>
                        <Typography>Notes: {workout.notes}</Typography>
                        <Box sx={{ mt: 2, display: "flex", gap: 1 }}>
                          <Button
                            variant="outlined"
                            color="error"
                            startIcon={<DeleteIcon />}
                            onClick={() => handleDelete(workout.id)}
                          >
                            Delete
                          </Button>
                          <Button
                            variant="outlined"
                            startIcon={<EditIcon />}
                            onClick={() => handleEdit(workout)}
                          >
                            Edit
                          </Button>
                        </Box>
                      </>
                    )}
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      ))}
    </Container>
  );
}

export default WorkoutList;
