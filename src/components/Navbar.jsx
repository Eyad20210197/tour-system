import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

function Navbar() {
    const { user, logout } = useContext(AuthContext);

    return (
        <nav>

            <ul>
            <li className="text"><Link to="/">Home</Link></li>
            <li className="text"><Link to="/tours">Tours</Link></li>


            {user ? (
                <>
                    <span>Welcome, {user.username}!</span>
                    <button onClick={logout}>Logout</button>
                </>
            ) : (
               <li className="text"><Link to="/login">Login</Link></li> 
            )}
            </ul>
        </nav>
    );
}

export default Navbar;
