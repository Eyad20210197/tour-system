import { useEffect, useState } from "react";

function ManageComplaints() {
    const [complaints, setComplaints] = useState([]);
    const [responseData, setResponseData] = useState("");

    useEffect(() => {
        fetch("http://localhost:5500/complaints")
            .then(response => response.json())
            .then(data => setComplaints(data))
            .catch(error => console.error("Error fetching complaints:", error));
    }, []);

    const handleRespond = (complaintId) => {
        if (!responseData.trim()) {
            alert("Response cannot be empty!");
            return;
        }

        fetch(`http://localhost:5500/complaints/${complaintId}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ response: responseData }),
        })
            .then(() => {
                setComplaints(complaints.map(complaint => 
                    complaint.id === complaintId ? { ...complaint, response: responseData } : complaint
                ));
                setResponseData("");
            })
            .catch(error => console.error("Error responding to complaint:", error));
    };

    const handleRequestMoreInfo = (complaintId) => {
        fetch(`http://localhost:5500/complaints/${complaintId}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ response: "Please provide more details." }),
        })
            .then(() => {
                setComplaints(complaints.map(complaint => 
                    complaint.id === complaintId ? { ...complaint, response: "Please provide more details." } : complaint
                ));
            })
            .catch(error => console.error("Error requesting more info:", error));
    };

    const handleDeleteComplaint = (complaintId) => {
        fetch(`http://localhost:5500/complaints/${complaintId}`, { method: "DELETE" })
            .then(() => setComplaints(complaints.filter(complaint => complaint.id !== complaintId)))
            .catch(error => console.error("Error deleting complaint:", error));
    };

    return (
        <div className="FunctionalComponent">
            <h1>Manage Complaints</h1>

            {complaints.length === 0 ? (
                <p>No complaints found.</p>
            ) : (
                <ul>
                    {complaints.map((complaint) => (
                        <li key={complaint.id}>
                            <h3>{complaint.subject}</h3>
                            <p><strong>User:</strong> {complaint.username}</p>
                            <p><strong>Details:</strong> {complaint.details}</p>
                            <p><strong>Response:</strong> {complaint.response || "No response yet"}</p>

                            <input 
                                type="text" 
                                placeholder="Write a response..." 
                                value={responseData} 
                                onChange={(e) => setResponseData(e.target.value)} 
                            />
                            <button onClick={() => handleRespond(complaint.id)}>Send Response</button>
                            <button onClick={() => handleRequestMoreInfo(complaint.id)}>Request More Info</button>
                            <button onClick={() => handleDeleteComplaint(complaint.id)}>Delete</button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default ManageComplaints;
