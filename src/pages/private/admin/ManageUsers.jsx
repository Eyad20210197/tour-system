import { useEffect, useState } from "react";

function ManageUsers() {
    const [users, setUsers] = useState([]);
    const [userData, setUserData] = useState({
        username: "",
        password: "",
        role: "agency",
    });
    const [editMode, setEditMode] = useState(false);
    const [editUserId, setEditUserId] = useState(null);

    useEffect(() => {
        fetch("http://localhost:5500/users")
            .then(response => response.json())
            .then(data => setUsers(data))
            .catch(error => console.error("Error fetching users:", error));
    }, []);

    const handleChange = (e) => {
        setUserData({ ...userData, [e.target.name]: e.target.value });
    };

    const handleAddUser = (e) => {
        e.preventDefault();

        fetch("http://localhost:5500/users", {
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
        setUserData({ username: user.username, password: user.password, role: user.role });
    };

    const handleUpdateUser = (e) => {
        e.preventDefault();

        fetch(`http://localhost:5500/users/${editUserId}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(userData),
        })
            .then(() => {
                setUsers(users.map(user => (user.id === editUserId ? { ...user, ...userData } : user)));
                setEditMode(false);
                setEditUserId(null);
                setUserData({ username: "", password: "", role: "agency" });
            })
            .catch(error => console.error("Error updating user:", error));
    };

    const handleDeleteUser = (userId) => {
        fetch(`http://localhost:5500/users/${userId}`, { method: "DELETE" })
            .then(() => setUsers(users.filter(user => user.id !== userId)))
            .catch(error => console.error("Error deleting user:", error));
    };

    return (
        <div className="FunctionalComponent">
            <h1>Manage Users</h1>

            <form onSubmit={editMode ? handleUpdateUser : handleAddUser}>
                <input type="text" name="username" placeholder="Username" value={userData.username} onChange={handleChange} required />
                <input type="password" name="password" placeholder="Password" value={userData.password} onChange={handleChange} required />
                <select name="role" value={userData.role} onChange={handleChange}>
                    <option value="agency">Tour Agency</option>
                    <option value="tourist">Tourist</option>
                </select>
                <button type="submit">{editMode ? "Update User" : "Add User"}</button>
            </form>

            <h2>Existing Users</h2>
            <ul>
                {users.map((user) => (
                    <li key={user.id}>
                        <h3>{user.username}</h3>
                        <p>Role: {user.role}</p>
                        <button onClick={() => handleEditUser(user)}>Edit</button>
                        <button onClick={() => handleDeleteUser(user.id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default ManageUsers;
