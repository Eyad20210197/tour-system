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
    <div className="home-page">
      
      <h1>Adventure is Calling - Are You Ready to Answer?</h1>
      <p>Explore and book amazing tours!</p>
      <button><Link to="/tours">View Tours</Link></button>
     
    </div>
  );
}
export default Home;
