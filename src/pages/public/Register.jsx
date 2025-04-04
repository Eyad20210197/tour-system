import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Register() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("tourist");
    const [message, setMessage] = useState("");
    const navigate = useNavigate();

    const handleRegister = (e) => {
        e.preventDefault();

        const newUser = { username, password, role };

        fetch("http://localhost:5500/users", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newUser),
        })
            .then((response) => response.json())
            .then(() => {
                setMessage("Registration successful! Redirecting to login...");
                setTimeout(() => navigate("/login"), 2000);
            })
            .catch((error) => console.error("Error registering user:", error));
    };

    return (
        <div>
            <h1>Register</h1>
            {message && <p style={{ color: "green" }}>{message}</p>}
            <form onSubmit={handleRegister}>
                <label>Username:</label>
                <input 
                    type="text" 
                    value={username} 
                    onChange={(e) => setUsername(e.target.value)} 
                    required 
                />

                <label>Password:</label>
                <input 
                    type="password" 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                    required 
                />

                <label>Role:</label>
                <select value={role} onChange={(e) => setRole(e.target.value)}>
                    <option value="tourist">Tourist</option>
                    <option value="guide">Guide</option>
                </select>

                <button type="submit">Register</button>
            </form>
        </div>
    );
}

export default Register;
