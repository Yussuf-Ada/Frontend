import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addWorkout } from "../utils/api.js";
import {
  Box,
  Typography,
  TextField,
  Button,
  Grid,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
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
    // Dialog component creates a modal that appears on top of the page content rather than at the bottom like Paper component.
    <Dialog open={true} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        <Typography variant="h5">Add New Workout</Typography>
      </DialogTitle>

      <DialogContent>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Exercise Name"
                value={workout.exercise}
                onChange={(e) =>
                  setWorkout({ ...workout, exercise: e.target.value })
                }
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                type="date"
                label="Date"
                value={workout.date}
                onChange={(e) =>
                  setWorkout({ ...workout, date: e.target.value })
                }
              />
            </Grid>

            <Grid item xs={12} sm={4}>
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

            <Grid item xs={12} sm={4}>
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

            <Grid item xs={12} sm={4}>
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
          </Grid>
        </Box>
      </DialogContent>

      <DialogActions>
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
          onClick={handleSubmit}
          variant="contained"
          startIcon={<SaveIcon />}
        >
          Add Workout
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default WorkoutForm;
