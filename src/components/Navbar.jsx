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
<<<<<<< HEAD
               <li className="text"><Link to="/login">Login</Link></li> 
            )}
            </ul>
=======
                <Link to="/login">Login</Link>
            )}
>>>>>>> 5e67217acbb0e3135771684be00f384a4cd18cf0
        </nav>
    );
}

export default Navbar;
