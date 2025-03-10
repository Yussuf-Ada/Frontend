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
  const [workoutsByDay, setWorkoutsByDay] = useState({});
  const [editingWorkout, setEditingWorkout] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Get the logged-in user from localStorage
    const userData = localStorage.getItem("user");
    if (userData) {
      setUser(JSON.parse(userData));
    }

    loadWorkouts();
  }, []);

  const loadWorkouts = async () => {
    const data = await getWorkouts();
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

      if (!acc[date]) acc[date] = [];
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
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>
        {user ? `${user.name}'s Workouts` : "Workouts"}
      </Typography>
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
