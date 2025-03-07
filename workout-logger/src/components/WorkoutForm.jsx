import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addWorkout } from "../utils/api.js";
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  Grid,
  Stack,
} from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import CloseIcon from "@mui/icons-material/Close";

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
    <Box
      sx={{
        maxWidth: 600,
        mx: "auto",
        mt: 4,
        p: 3,
      }}
    >
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography varant="h5" sx={{ mb: 6 }}>
          Add New Workout
        </Typography>

        <Box component="form" onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid xs={12}>
              <TextField
                fullWidth
                label="Exercise Name"
                value={workout.exercise}
                onChange={(e) =>
                  setWorkout({ ...workout, exercise: e.target.value })
                }
              />
            </Grid>

            <Grid xs={12}>
              <TextField
                fullWidth
                type="date"
                label="Date"
                value={workout.date}
                onChange={(e) =>
                  setWorkout({ ...workout, date: e.target.value })
                }
                InputLabelProps={{ shrink: true }}
              />
            </Grid>

            <Grid xs={12} sm={4}>
              <TextField
                fullWidth
                type="number"
                label="Sets"
                value={workout.sets}
                onChange={(e) =>
                  setWorkout({ ...workout, sets: e.target.value })
                }
              />
            </Grid>

            <Grid xs={12} sm={4}>
              <TextField
                fullWidth
                type="number"
                label="Reps"
                value={workout.reps}
                onChange={(e) =>
                  setWorkout({ ...workout, reps: e.target.value })
                }
              />
            </Grid>

            <Grid xs={12} sm={4}>
              <TextField
                fullWidth
                type="number"
                label="Weight (kg)"
                value={workout.weight}
                onChange={(e) =>
                  setWorkout({ ...workout, weight: e.target.value })
                }
              />
            </Grid>

            <Grid xs={12}>
              <Stack direction="row" spacing={2} justifyContent="flex-end">
                {onClose && (
                  <Button
                    variant="outlined"
                    startIcon={<CloseIcon />}
                    onClick={onClose}
                  >
                    Cancel
                  </Button>
                )}
                <Button
                  type="submit"
                  variant="contained"
                  startIcon={<SaveIcon />}
                >
                  Add Workout
                </Button>
              </Stack>
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </Box>
  );
}

export default WorkoutForm;
