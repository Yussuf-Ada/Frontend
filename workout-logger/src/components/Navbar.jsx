import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="navbar">
      <div className="nav-links">
        <Link to="/workouts">My Workouts</Link>
        <Link to="/exercises">Exercise Library</Link>
      </div>
    </nav>
  );
}

export default Navbar;
