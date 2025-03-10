import { useEffect, useState } from "react";

function ManageAgenciesRequests() {
    const [requests, setRequests] = useState([]);

    // Fetch tour requests on component load
    useEffect(() => {
        fetch("http://localhost:5500/tourRequests")
            .then(response => response.json())
            .then(data => {
                console.log("Tour Requests Data:", data);
                setRequests(data);
            })
            .catch(error => console.error("Error fetching requests:", error));
    }, []);

    // Approve a tour request
    const handleApprove = (request) => {
        const newTour = {
            id: Date.now().toString(),
            agencyId: request.agencyId,
            agencyName: request.agencyName,
            ...request.tour  
        };

        fetch("http://localhost:5500/tours", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newTour),
        })
        .then(response => {
            if (!response.ok) {
                throw new Error("Failed to add tour");
            }
            return response.json();
        })
        .then(() => {
            return fetch(`http://localhost:5500/tourRequests/${request.id}`, {
                method: "DELETE",
                headers: { "Content-Type": "application/json" }
            });
        })
        .then(response => {
            if (!response.ok) {
                throw new Error("Failed to delete request");
            }
            return fetch("http://localhost:5500/tourRequests");  
        })
        .then(response => response.json())
        .then(updatedRequests => {
            setRequests(updatedRequests);
            alert("Tour approved and added successfully!");
        })
        .catch(error => console.error("Error approving tour:", error));
    };

    // Reject a tour request
    const handleReject = (requestId) => {
        fetch(`http://localhost:5500/tourRequests/${requestId}`, {
            method: "DELETE",
            headers: { "Content-Type": "application/json" }
        })
        .then(response => {
            if (!response.ok) {
                throw new Error("Failed to delete request");
            }
            return fetch("http://localhost:5500/tourRequests");
        })
        .then(response => response.json())
        .then(updatedRequests => {
            setRequests(updatedRequests);
            alert("Tour request rejected.");
        })
        .catch(error => console.error("Error rejecting tour:", error));
    };

    return (
        <div>
            <h1>Manage Tour Requests</h1>

            {requests.length === 0 ? (
                <p>No pending tour requests.</p>
            ) : (
                <ul>
                    {requests.map((request) => (
                        <li key={request.id}>
                            <h3>{request.tour?.name || "No Name Available"}</h3>
                            <p><strong>Agency:</strong> {request.agencyName}</p>
                            <p><strong>Category:</strong> {request.tour?.category || "N/A"}</p>
                            <p><strong>Price:</strong> ${request.tour?.price || "N/A"}</p>
                            <p><strong>Duration:</strong> {request.tour?.duration || "N/A"}</p>
                            <p><strong>Seats:</strong> {request.tour?.seats || "N/A"}</p>
                            <p><strong>Description:</strong> {request.tour?.description || "N/A"}</p>
                            <button onClick={() => handleApprove(request)}>Approve</button>
                            <button onClick={() => handleReject(request.id)}>Reject</button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default ManageAgenciesRequests;
