import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import WorkoutList from "./components/WorkoutList";
import ExerciseList from "./components/ExerciseList";

import "./App.css";

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/workouts" element={<WorkoutList />} />
          <Route path="/exercises" element={<ExerciseList />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
