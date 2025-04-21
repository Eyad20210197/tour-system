import { createContext, useState, useEffect } from "react";

// Creating A context

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // local storage to load the data into the username & password field

    useEffect(() => {
        const savedUser = localStorage.getItem("user");
        if (savedUser) setUser(JSON.parse(savedUser));
        setLoading(false);
    }, []);

    // When Logging In

    const login = async (username, password) => {
        try {
            const response = await fetch("http://localhost:5055/api/users/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, password })
            });

            console.log("RESPONSE STATUS:", response.status);

            if (!response.ok) {
                return { success: false, message: "Invalid username or password" };
            }

            const foundUser = await response.json();
            console.log("USER FROM API:", foundUser); 

            setUser(foundUser);
            localStorage.setItem("user", JSON.stringify(foundUser));

            return { success: true, role: foundUser.role };
        } catch (error) {
            console.error("Login Error:", error);
            return { success: false, message: "Server error" };
        }
    };


    // When Logging Out

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
