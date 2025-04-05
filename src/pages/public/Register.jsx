import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Register() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("tourist");
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleRegister = (e) => {
        e.preventDefault();

        const newUser = { username, password, role };

        fetch("http://localhost:5500/users", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newUser),
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Registration failed");
                }
                return response.json();
            })
            .then(() => {
                setMessage("Registration successful! Redirecting to login...");
                setError("");
                setUsername("");
                setPassword("");
                setRole("tourist");

                setTimeout(() => navigate("/login"), 2000);
            })
            .catch((error) => {
                console.error("Error registering user:", error);
                setError("Registration failed. Please try again.");
                setMessage("");
            });
    };

    return (
        <div className="log-in">
            <div className="log-container">
            <h1>Register</h1>

            {message && <p>{message}</p>}
            {error && <p>{error}</p>}

            <form onSubmit={handleRegister}>
                <div>
                    <label>Username:</label>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>

                <div>
                    <label>Password:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>

                <div>
                    <label >Role:</label>
                    <select id="label"
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                    >
                        <option value="tourist">Tourist</option>
                        <option value="agency">Agency</option>
                    </select>
                </div>

                <button type="submit">Register</button>
            </form>
            </div>
        </div>
    );
}

export default Register;
