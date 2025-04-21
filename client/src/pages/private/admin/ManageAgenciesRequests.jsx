import { useEffect, useState } from "react";

function ManageAgenciesRequests() {
    const [pendingTours, setPendingTours] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch("http://localhost:5055/api/tours?status=pending")
            .then((res) => res.json())
            .then((data) => setPendingTours(data))
            .catch((err) => console.error("Error fetching tours:", err))
            .finally(() => setLoading(false));
    }, []);

    const handleAction = (id, action) => {
        fetch(`http://localhost:5055/api/tours/${id}/${action}`, {
            method: "PUT"
        })
            .then((res) => {
                if (!res.ok) throw new Error("Failed to update status.");
                setPendingTours(prev => prev.filter(tour => tour.id !== id));
                alert(`Tour ${action}ed successfully.`);
            })
            .catch((err) => {
                console.error(`Error while ${action}ing tour:`, err);
                alert("Something went wrong.");
            });
    };

    return (
        <div className="FunctionalComponent">
            <h1>Manage Tour Requests</h1>

            {loading ? (
                <p>Loading tours...</p>
            ) : pendingTours.length === 0 ? (
                <p>No pending tour requests.</p>
            ) : (
                <ul className="Grid small">
                    {pendingTours.map((tour) => (
                        <li key={tour.id}>
                            <h3>{tour.name}</h3>
                            <p><strong>Agency ID:</strong> {tour.agencyId}</p>
                            <p><strong>Category:</strong> {tour.category}</p>
                            <p><strong>Price:</strong> ${tour.price}</p>
                            <p><strong>Duration:</strong> {tour.duration}</p>
                            <p><strong>Seats:</strong> {tour.seats}</p>
                            <p><strong>Description:</strong> {tour.description}</p>
                            <div className="buttons">
                                <button onClick={() => handleAction(tour.id, "approve")}>Approve</button>
                                <button onClick={() => handleAction(tour.id, "reject")}>Reject</button>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default ManageAgenciesRequests;
