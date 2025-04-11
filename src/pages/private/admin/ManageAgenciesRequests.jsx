import { useEffect, useState } from "react";

function ManageAgenciesRequests() {
    const [requests, setRequests] = useState([]);

    useEffect(() => {
        fetch("http://localhost:5500/tourRequests")
            .then((res) => res.json())
            .then((data) => setRequests(data))
            .catch((err) => console.error("Error fetching requests:", err));
    }, []);

    const handleApprove = (request) => {
        const newTour = {
            id: Date.now().toString(),
            agencyId: request.agencyId,
            agencyName: request.agencyName,
            ...request.tour,
        };

        fetch("http://localhost:5500/tours", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newTour),
        })
            .then((res) => res.json())
            .then(() => {
                return fetch(`http://localhost:5500/tourRequests/${request.id}`, {
                    method: "DELETE",
                });
            })
            .then(() => {
                setRequests((prev) => prev.filter((r) => r.id !== request.id));
                alert("Tour approved and added successfully!");
            })
            .catch((err) => console.error("Error approving request:", err));
    };

    const handleReject = (id) => {
        fetch(`http://localhost:5500/tourRequests/${id}`, {
            method: "DELETE",
        })
            .then(() => {
                setRequests((prev) => prev.filter((r) => r.id !== id));
                alert("Tour request rejected.");
            })
            .catch((err) => console.error("Error rejecting request:", err));
    };

    return (
        <div className="FunctionalComponent">
            <h1>Manage Tour Requests</h1>

            {requests.length === 0 ? (
                <p>No pending tour requests.</p>
            ) : (
                <ul className="Grid small">
                    {requests.map((req) => (
                        <li key={req.id}>
                            <h3>{req.tour?.name || "No Name"}</h3>
                            <p><strong>Agency:</strong> {req.agencyName}</p>
                            <p><strong>Category:</strong> {req.tour?.category}</p>
                            <p><strong>Price:</strong> ${req.tour?.price}</p>
                            <p><strong>Duration:</strong> {req.tour?.duration}</p>
                            <p><strong>Seats:</strong> {req.tour?.seats}</p>
                            <p><strong>Description:</strong> {req.tour?.description}</p>
                            <div className="buttons">
                                <button onClick={() => handleApprove(req)}>Approve</button>
                                <button onClick={() => handleReject(req.id)}>Reject</button>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default ManageAgenciesRequests;
