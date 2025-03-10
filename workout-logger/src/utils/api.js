import axios from "axios";

const API_URL = process.env.REACT_APP_SUPABASE_URL;
const ANON_KEY = process.env.REACT_APP_SUPABASE_ANON_KEY;

export const getUsers = async () => {
  const response = await axios.get(`${API_URL}/users`, {
    headers: {
      Authorization: `Bearer ${ANON_KEY}`,
      "Content-Type": "application/json",
    },
  });
  return response.data;
};

export const getExercises = async () => {
  const response = await axios.get(`${API_URL}/exercises`, {
    headers: {
      Authorization: `Bearer ${ANON_KEY}`,
      "Content-Type": "application/json",
    },
  });
  return response.data;
};

export const getWorkouts = async (userId) => {
  if (!userId) {
    const user = JSON.parse(localStorage.getItem("user"));
    userId = user?.id;
  }

  if (!userId) {
    throw new Error("User ID is required to fetch workouts");
  }

  const response = await axios.get(`${API_URL}/workouts?user_id=${userId}`, {
    headers: {
      Authorization: `Bearer ${ANON_KEY}`,
      "Content-Type": "application/json",
    },
  });
  return response.data;
};

export const addWorkout = async (workout) => {
  const response = await axios.post(API_URL, workout, {
    headers: {
      Authorization: `Bearer ${ANON_KEY}`,
      "Content-Type": "application/json",
    },
  });
  return response.data;
};

export const editWorkout = async (id, workout) => {
  const response = await axios.put(`${API_URL}/${id}`, workout, {
    headers: {
      Authorization: `Bearer ${ANON_KEY}`,
      "Content-Type": "application/json",
    },
  });
  return response.data;
};

export const deleteWorkout = async (id) => {
  const response = await axios.delete(`${API_URL}/${id}`, {
    headers: {
      Authorization: `Bearer ${ANON_KEY}`,
      "Content-Type": "application/json",
    },
  });
  return response.data;
};
