import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  CardActionArea,
  Avatar,
} from "@mui/material";
import { getUsers } from "../utils/api";
function Login() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchUsers() {
      try {
        const data = await getUsers();
        setUsers(data || []);
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchUsers();
  }, []);

  const handleUserSelect = (user) => {
    localStorage.setItem("user", JSON.stringify(user));
    navigate("/workouts");
  };

  return (
    <Container component="main" maxWidth="md">
      <Box
        sx={{
          mt: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component="h1" variant="h4" sx={{ mb: 5 }}>
          Welcome to Workout Logger
        </Typography>

        <Typography variant="h6" sx={{ mb: 3 }}>
          Select a user to continue:
        </Typography>

        {loading ? (
          <Typography>Loading users...</Typography>
        ) : (
          <Grid container spacing={3}>
            {users.map((user) => (
              <Grid item xs={12} sm={6} md={4} key={user.id}>
                <Card>
                  <CardActionArea onClick={() => handleUserSelect(user)}>
                    <CardContent sx={{ textAlign: "center", p: 3 }}>
                      <Avatar
                        sx={{
                          width: 80,
                          height: 80,
                          mx: "auto",
                          mb: 2,
                          bgcolor: "primary.main",
                        }}
                        src={user.avatar_url}
                      >
                        {user.name.charAt(0)}
                      </Avatar>
                      <Typography variant="h6">{user.name}</Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}
      </Box>
    </Container>
  );
}

export default Login;
