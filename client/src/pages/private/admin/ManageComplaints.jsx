import { useEffect, useState } from "react";

function ManageComplaints() {
    const [complaints, setComplaints] = useState([]);

    useEffect(() => {
        fetch("http://localhost:5055/api/complaints")
            .then(res => res.json())
            .then(data => setComplaints(data))
            .catch(err => console.error("Error fetching complaints:", err));
    }, []);

    const handleResponse = (id, responseText) => {
        fetch(`http://localhost:5055/api/complaints/${id}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                response: responseText,
                status: "resolved",
            }),
        })
            .then(() => {
                setComplaints(prev =>
                    prev.map(c =>
                        c.id === id ? { ...c, response: responseText, status: "resolved" } : c
                    )
                );
            })
            .catch(err => console.error("Error responding to complaint:", err));
    };

    return (
        <div className="dashboard">
            <h1>Manage Complaints</h1>

            {complaints.length === 0 ? (
                <p>No complaints found.</p>
            ) : (
                <ul className="Grid">
                    {complaints.map((c) => (
                        <li key={c.id}>
                            <p><strong>User ID:</strong> {c.userId}</p>
                            <p><strong>Complaint:</strong> {c.message}</p>
                            <p><strong>Status:</strong> {c.status}</p>

                            {c.response ? (
                                <p><strong>Response:</strong> {c.response}</p>
                            ) : (
                                <form
                                    onSubmit={(e) => {
                                        e.preventDefault();
                                        const response = e.target.response.value;
                                        handleResponse(c.id, response);
                                    }}
                                >
                                    <textarea name="response" placeholder="Write your response..." required />
                                    <button type="submit">Send Response</button>
                                </form>
                            )}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default ManageComplaints;
