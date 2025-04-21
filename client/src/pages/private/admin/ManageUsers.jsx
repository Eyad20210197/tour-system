import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../../context/AuthContext";

function ManageUsers() {
    const { user } = useContext(AuthContext);
    const [users, setUsers] = useState([]);
    const [userData, setUserData] = useState({
        username: "",
        password: "",
        role: "agency",
    });
    const [editMode, setEditMode] = useState(false);
    const [editUserId, setEditUserId] = useState(null);

    useEffect(() => {
        fetch("http://localhost:5055/api/users")
            .then(response => response.json())
            .then(data => setUsers(data))
            .catch(error => console.error("Error fetching users:", error));
    }, []);

    const handleChange = (e) => {
        setUserData({ ...userData, [e.target.name]: e.target.value });
    };

    const handleAddUser = (e) => {
        e.preventDefault();

        fetch("http://localhost:5055/api/users", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(userData),
        })
            .then(response => response.json())
            .then(newUser => {
                setUsers([...users, newUser]);
                setUserData({ username: "", password: "", role: "agency" });
            })
            .catch(error => console.error("Error adding user:", error));
    };

    const handleEditUser = (user) => {
        setEditMode(true);
        setEditUserId(user.id);
        setUserData({
            username: user.username,
            password: user.password,
            role: user.role
        });
    };

    const handleUpdateUser = (e) => {
        e.preventDefault();

        fetch(`http://localhost:5055/api/users/${editUserId}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ ...userData, id: editUserId }),
        })
            .then(() => {
                setUsers(users.map(u => (u.id === editUserId ? { ...u, ...userData } : u)));
                setEditMode(false);
                setEditUserId(null);
                setUserData({ username: "", password: "", role: "agency" });
            })
            .catch(error => console.error("Error updating user:", error));
    };

    const handleDeleteUser = (userId) => {

        // Prevents Admin To delete Admin

        const targetUser = users.find(u => u.id === userId);
        if (targetUser?.role === "admin") {
            alert("Admins cannot delete other admins.");
            return;
        }

        fetch(`http://localhost:5055/api/users/${userId}`, {
            method: "DELETE"
        })
            .then(() => setUsers(users.filter(u => u.id !== userId)))
            .catch(error => console.error("Error deleting user:", error));
    };

    return (
        <div className="FunctionalComponent">
            <h1>Manage Users</h1>

            <form onSubmit={editMode ? handleUpdateUser : handleAddUser} className="search">
                <input
                    type="text"
                    name="username"
                    placeholder="Username"
                    value={userData.username}
                    onChange={handleChange}
                    required
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={userData.password}
                    onChange={handleChange}
                    required
                />
                <select name="role" value={userData.role} onChange={handleChange}>
                    <option value="agency">Tour Agency</option>
                    <option value="tourist">Tourist</option>
                </select>
                <button type="submit">{editMode ? "Update User" : "Add User"}</button>
            </form>

            <h2>Existing Users</h2>
            <ul className="Grid small">
                {users.map((u) => (
                    <li key={u.id}>
                        <h3>{u.username}</h3>
                        <p>Role: {u.role}</p>
                        <div className="buttons">
                            <button onClick={() => handleEditUser(u)}>Edit</button>
                            <button onClick={() => handleDeleteUser(u.id)}>Delete</button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default ManageUsers;
