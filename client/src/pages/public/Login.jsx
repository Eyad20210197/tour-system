import { useState, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";

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
        <div className="log-in">
            <div className="log-container">
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
                <Link to='/register'>Register?</Link>
            </div>
        </div>
    );
}

export default Login;
