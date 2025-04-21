import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Register() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("tourist");
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleRegister = async (e) => {  // Add async here
        e.preventDefault();

        const newUser = { username, password, role };
        
        try {
            // Step 1: Check if the username already exists
            const response = await fetch("http://localhost:5055/api/users");
            const users = await response.json();

            // Check if the username already exists
            const userExists = users.some(user => user.username === username);

            if (userExists) {
                setError("Username already exists. Please choose another one.");
                return; // Stop execution if username already exists
            } else {
                // Step 2: Proceed with registering the user
                const registerResponse = await fetch("http://localhost:5055/api/users",{
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(newUser),
                });

                if (!registerResponse.ok) {
                    throw new Error("Registration failed");
                }

                // Step 3: Handle successful registration
                setMessage("Registration successful! Redirecting to login...");
                setError(""); // Reset any previous error
                setUsername("");
                setPassword("");
                setRole("tourist");

                setTimeout(() => navigate("/login"), 2000); // Redirect after 2 seconds
            }
        } catch (error) {
            console.error("Error registering user:", error);
            setError("Registration failed. Please try again.");
            setMessage(""); // Clear success message in case of error
        }
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
