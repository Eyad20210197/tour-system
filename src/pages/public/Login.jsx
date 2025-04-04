import { useState, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
<<<<<<< HEAD
import { Link } from "react-router-dom";
=======

>>>>>>> 5e67217acbb0e3135771684be00f384a4cd18cf0
function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError(null);

        const result = await login(username, password);
        if (result.success) {
            if (result.role === "admin") {
                navigate("/dashboard/admin");
            } else if (result.role === "tourist") {
                navigate("/dashboard/tourist");
            } else if (result.role === "agency") {
                navigate("/dashboard/agency");
            } else {
                setError("Invalid user role. Contact admin.");
            }
        } else {
            setError(result.message);
        }
    };

    return (
<<<<<<< HEAD
        <div className="log-in">
=======
        <div>
>>>>>>> 5e67217acbb0e3135771684be00f384a4cd18cf0
            <h2>Login</h2>
            {error && <p style={{ color: "red" }}>{error}</p>}
            <form onSubmit={handleLogin}>
                <input 
                    type="text" 
                    placeholder="Username" 
                    value={username} 
                    onChange={(e) => setUsername(e.target.value)} 
                    required 
                />
                <input 
                    type="password" 
                    placeholder="Password" 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                    required 
                />
                <button type="submit">Login</button>
            </form>
<<<<<<< HEAD
            <Link to='/Register'>register?</Link>
=======
>>>>>>> 5e67217acbb0e3135771684be00f384a4cd18cf0
        </div>
    );
}

export default Login;
