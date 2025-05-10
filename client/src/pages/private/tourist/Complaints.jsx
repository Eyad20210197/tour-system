import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../context/AuthContext";
import * as signalR from "@microsoft/signalr";

function Complaints() {
    const { user } = useContext(AuthContext);
    const [complaints, setComplaints] = useState([]);
    const [text, setText] = useState("");
    const [connection, setConnection] = useState(null);

    // 1. Fetch initial complaints
    useEffect(() => {
        if (user) {
            fetch(`http://localhost:5055/api/complaints?userId=${user.id}`)
                .then(res => res.json())
                .then(data => setComplaints(data))
                .catch(err => console.error("Error fetching complaints:", err));
        }
    }, [user]);

    // 2. Setup SignalR connection
    useEffect(() => {
        if (!user) return;

        const newConnection = new signalR.HubConnectionBuilder()
            .withUrl("http://localhost:5055/complainthub")
            .withAutomaticReconnect()
            .build();

        newConnection.start()
            .then(() => {
                console.log("SignalR Connected");
                setConnection(newConnection);

                // Handle updates from admin
                newConnection.on("ReceiveComplaintUpdate", (updatedComplaint) => {
                    setComplaints(prev =>
                        prev.map(c =>
                            c.id === updatedComplaint.id ? updatedComplaint : c
                        )
                    );
                });

                // Handle new complaints sent by this user (real-time)
                newConnection.on("ReceiveNewComplaint", (newComplaint) => {
                    if (newComplaint.userId === user.id) {
                        setComplaints(prev => [...prev, newComplaint]);
                    }
                });
            })
            .catch(err => console.error("SignalR Connection Error:", err));

        return () => {
            if (newConnection) newConnection.stop();
        };
    }, [user]);

    // 3. Handle new complaint submission
    const handleSubmit = (e) => {
        e.preventDefault();

        const newComplaint = {
            userId: user.id,
            username: user.username,
            message: text,
            status: "pending",
            response: ""
        };

        fetch("http://localhost:5055/api/complaints", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newComplaint),
        })
            .then(res => res.json())
            .then(() => {
                setText(""); // clear input
                // No need to manually add complaint here — SignalR will handle it
            })
            .catch(err => console.error("Error submitting complaint:", err));
    };

    return (
        <div className="dashboard">
            <h1>Submit a Complaint</h1>
            <form onSubmit={handleSubmit} className="Cardd">
                <textarea
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="Write your complaint here..."
                    required
                />
                <button type="submit">Submit</button>
            </form>

            <h2>Your Complaints</h2>
            <ul className="Grid">
                {complaints.map((c) => (
                    <li key={c.id}>
                        <p><strong>Message:</strong> {c.message}</p>
                        <p><strong>Status:</strong> {c.status}</p>
                        {c.response && <p><strong>Admin Response:</strong> {c.response}</p>}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Complaints;
