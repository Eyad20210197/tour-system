import { useEffect, useState } from "react";
import * as signalR from "@microsoft/signalr";

function ManageComplaints() {
    const [complaints, setComplaints] = useState([]);
    const [hubConnection, setHubConnection] = useState(null);

    useEffect(() => {
        // Fetch complaints on initial load
        fetch("http://localhost:5055/api/complaints")
            .then(res => res.json())
            .then(data => setComplaints(data))
            .catch(err => console.error("Error fetching complaints:", err));

        // Setup SignalR connection
        const connection = new signalR.HubConnectionBuilder()
            .withUrl("http://localhost:5055/complainthub")
            .withAutomaticReconnect()
            .build();

        connection.start()
            .then(() => {
                console.log("SignalR connected (Admin)");
                setHubConnection(connection);

                connection.on("ReceiveComplaint", (newComplaint) => {
                    setComplaints(prev => [...prev, newComplaint]);
                });
            })
            .catch(err => console.error("SignalR connection error:", err));
    }, []);

    const handleResponse = (id, responseText) => {
        const targetComplaint = complaints.find(c => c.id === id);

        if (!targetComplaint) return;

        fetch(`http://localhost:5055/api/complaints/${id}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                id: targetComplaint.id,
                userId: targetComplaint.userId,
                message: targetComplaint.message,
                date: targetComplaint.date,
                status: "resolved",
                response: responseText
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
