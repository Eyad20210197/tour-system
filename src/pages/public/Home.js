import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

function Home() {
  const { user } = useContext(AuthContext);

  const dashboardLink =
    user?.role === "admin"
      ? "/dashboard/admin"
      : user?.role === "guide"
      ? "/dashboard/guide"
      : "/dashboard/tourist";

  return (
    <div>
      <h1>Welcome to Tour Management System</h1>
      <p>Explore and book amazing tours!</p>
      <nav>
        <Link to="/tours">View Tours</Link> |  
        {user ? <Link to={dashboardLink}>Dashboard</Link> : <Link to="/login">Login</Link>}
      </nav>
    </div>
  );
}

export default Home;
