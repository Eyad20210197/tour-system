import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
function Navbar() {
    const { user, logout } = useContext(AuthContext);
    
      const navigate =useNavigate();
        const handleGoToDashboard = () => {
            const dashboardLink =
              user?.role === "admin"
                ? "/dashboard/admin"
                : user?.role === "agency"
                ? "/dashboard/agency"
                : "/dashboard/tourist";
          
            navigate(dashboardLink);
          };
    return (
        <nav>

            <ul>
            <li className="text"><Link to="/">Home</Link></li>
            <li className="text"><Link to="/tours">Tours</Link></li>
            <li className="text"><button onClick={handleGoToDashboard}>dashboard</button></li>

            {user ? (
                <>
                <li>  
                    <button onClick={logout}>Logout</button>
                    
                </li>
                <li>
                    <span>Welcome, {user.username}!</span>
                </li>
                </>
            ) : (
               <li className="text"><Link to="/login">Login</Link></li> 
            )}
            </ul>
        </nav>
    );
}

export default Navbar;
