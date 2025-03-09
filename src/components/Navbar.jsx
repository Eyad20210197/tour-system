import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

function Navbar() {
    const { user, logout } = useContext(AuthContext);

    return (
        <nav>
            <Link to="/">Home</Link>
            <Link to="/tours">Tours</Link>

            {user ? (
                <>
                    <span>Welcome, {user.username}!</span>
                    <button onClick={logout}>Logout</button>
                </>
            ) : (
                <Link to="/login">Login</Link>
            )}
        </nav>
    );
}

export default Navbar;
