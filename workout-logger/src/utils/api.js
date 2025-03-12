import axios from "axios";

const API_URL = process.env.REACT_APP_SUPABASE_URL;
const ANON_KEY = process.env.REACT_APP_SUPABASE_ANON_KEY;

// Helper function to get the current user ID
const getUserId = (providedUserId) => {
  if (providedUserId) return providedUserId;

  try {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user?.id) {
      throw new Error("User ID is required for this operation");
    }
    return user.id;
  } catch (error) {
    console.error("Error retrieving user ID:", error);
    throw new Error("User ID is required for this operation");
  }
};

// Helper function to handle API errors
const handleApiError = (error, operation) => {
  console.error(`Error ${operation}:`, error.response?.data || error.message);
  throw error;
};

export const getUsers = async () => {
  try {
    const response = await axios.get(`${API_URL}/users`, {
      headers: {
        Authorization: `Bearer ${ANON_KEY}`,
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    handleApiError(error, "fetching users");
  }
};

export const getExercises = async () => {
  try {
    const response = await axios.get(`${API_URL}/exercises`, {
      headers: {
        Authorization: `Bearer ${ANON_KEY}`,
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    handleApiError(error, "fetching exercises");
  }
};

export const getWorkouts = async (userId) => {
  try {
    userId = getUserId(userId);

    const response = await axios.get(`${API_URL}/workouts?user_id=${userId}`, {
      headers: {
        Authorization: `Bearer ${ANON_KEY}`,
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    handleApiError(error, "fetching workouts");
  }
};

export const addWorkout = async (workout) => {
  try {
    // Ensure workout has user_id
    if (!workout.user_id) {
      workout.user_id = getUserId();
    }

    const response = await axios.post(`${API_URL}/workouts`, workout, {
      headers: {
        Authorization: `Bearer ${ANON_KEY}`,
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    handleApiError(error, "adding workout");
  }
};

export const editWorkout = async (id, workout, userId) => {
  try {
    userId = getUserId(userId);

    if (!workout.user_id) {
      workout.user_id = userId;
    }

    // Log the URL and request details
    const url = `${API_URL}/workouts/${id}?user_id=${userId}`;
    console.log("EDIT request URL:", url);
    console.log("Editing workout data:", workout);
    console.log("Headers:", {
      Authorization: `Bearer ${ANON_KEY}`,
      "Content-Type": "application/json",
    });

    const response = await axios.put(url, workout, {
      headers: {
        Authorization: `Bearer ${ANON_KEY}`,
        "Content-Type": "application/json",
      },
    });

    // Add success log message
    console.log("✅ SUCCESS: Workout edited successfully!", id);
    console.log("Updated workout data:", response.data);

    return response.data;
  } catch (error) {
    handleApiError(error, "editing workout");
  }
};

export const deleteWorkout = async (id, userId) => {
  try {
    userId = getUserId(userId);

    const url = `${API_URL}/${id}?user_id=${userId}`;
    console.log("DELETE request URL:", url);
    console.log("Headers:", {
      Authorization: `Bearer ${ANON_KEY}`,
      "Content-Type": "application/json",
    });

    const response = await axios.delete(url, {
      headers: {
        Authorization: `Bearer ${ANON_KEY}`,
        "Content-Type": "application/json",
      },
    });

    // Add success log message
    console.log("✅ SUCCESS: Workout deleted successfully!", id);

    return response.data;
  } catch (error) {
    handleApiError(error, "deleting workout");
  }
};
