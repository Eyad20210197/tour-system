import { createContext, useState, useEffect } from "react";

// Create authentication context
export const AuthContext = createContext();
 
const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // Load user from localStorage when the app starts
    useEffect(() => {
        const savedUser = localStorage.getItem("user");
        if (savedUser) setUser(JSON.parse(savedUser));//from string to object 
        setLoading(false);
    }, []); 
    // Login function
    const login = async (username, password) => {
        try {
            const response = await fetch("http://localhost:5500/users");
            const users = await response.json();
            const foundUser = users.find(user => user.username === username && user.password === password);

            if (foundUser) {
                setUser(foundUser);
                localStorage.setItem("user", JSON.stringify(foundUser));//from object to string
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
        <AuthContext.Provider value={{ user, login, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
