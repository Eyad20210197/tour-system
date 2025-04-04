import { createContext, useState, useEffect } from "react";

// Create authentication context
export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    // Load user from localStorage when the app starts
    useEffect(() => {
        const savedUser = localStorage.getItem("user");
        if (savedUser) setUser(JSON.parse(savedUser));
<<<<<<< HEAD
    }, []); 
=======
    }, []);
>>>>>>> 5e67217acbb0e3135771684be00f384a4cd18cf0

    // Login function
    const login = async (username, password) => {
        try {
            const response = await fetch("http://localhost:5500/users");
            const users = await response.json();
            const foundUser = users.find(user => user.username === username && user.password === password);

            if (foundUser) {
                setUser(foundUser);
                localStorage.setItem("user", JSON.stringify(foundUser));
                return { success: true, role: foundUser.role };
            } else {
                return { success: false, message: "Invalid username or password" };
            }
        } catch (error) {
            console.error("Login Error:", error);
            return { success: false, message: "Server error" };
        }
    };

    // Logout function
    const logout = () => {
        setUser(null);
        localStorage.removeItem("user");
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
