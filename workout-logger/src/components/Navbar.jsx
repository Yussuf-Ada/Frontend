import { Link as RouterLink } from "react-router-dom";
import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";

function Navbar() {
  return (
    <AppBar position="sticky" color="default" elevation={1}>
      <Toolbar>
        <Typography
          variant="h6"
          component={RouterLink}
          to="/workouts"
          sx={{
            flexGrow: 1,
            background: "linear-gradient(45deg, #007bff, #00ff88)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            textDecoration: "none",
            cursor: "pointer",
          }}
        >
          Workout Logger
        </Typography>
        <Box>
          <Button component={RouterLink} to="/workouts" color="inherit">
            My Workouts
          </Button>
          <Button component={RouterLink} to="/exercises" color="inherit">
            Exercise Library
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
