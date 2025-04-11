// TourPackages.jsx
import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../../context/AuthContext";
import TourForm from "../../../components/TourForm";

export default function TourPackages() {
  const { user } = useContext(AuthContext);
  const [tours, setTours] = useState([]);
  const [tourData, setTourData] = useState({
    name: "",
    category: "",
    price: "",
    duration: "",
    seats: "",
    description: "",
    imageUrl: ""
  });
  const [editMode, setEditMode] = useState(false);
  const [editTourId, setEditTourId] = useState(null);

  useEffect(() => {
    if (user && user.id) {
      fetch(`http://localhost:5500/tours?agencyId=${user.id}`)
        .then((res) => res.json())
        .then(setTours)
        .catch(console.error);
    }
  }, [user]);

  const handleChange = (e) => {
    setTourData({ ...tourData, [e.target.name]: e.target.value });
  };

  const handleAddTour = (e) => {
    e.preventDefault();
    const request = {
      agencyId: user.id,
      agencyName: user.username,
      action: "add",
      tour: tourData
    };

    fetch("http://localhost:5500/tourRequests", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(request)
    })
      .then(() => {
        alert("Tour request submitted for admin approval.");
        setTourData({ name: "", category: "", price: "", duration: "", seats: "", description: "", imageUrl: "" });
      })
      .catch(console.error);
  };

  const handleEditTour = (tour) => {
    setEditMode(true);
    setEditTourId(tour.id);
    setTourData({ ...tour });
  };

  const handleUpdateTour = (e) => {
    e.preventDefault();

    fetch(`http://localhost:5500/tours/${editTourId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(tourData)
    })
      .then(() => {
        setTours(tours.map((t) => (t.id === editTourId ? { ...t, ...tourData } : t)));
        setEditMode(false);
        setEditTourId(null);
        setTourData({ name: "", category: "", price: "", duration: "", seats: "", description: "", imageUrl: "" });
      })
      .catch(console.error);
  };

  const handleDeleteTour = (tourId) => {
    fetch(`http://localhost:5500/tours/${tourId}`, {
      method: "DELETE"
    })
      .then(() => setTours(tours.filter((t) => t.id !== tourId)))
      .catch(console.error);
  };

  return (
    <div className="FunctionalComponent">
      <h1>Manage Your Tour Packages</h1>

      <TourForm
        tourData={tourData}
        handleChange={handleChange}
        handleSubmit={editMode ? handleUpdateTour : handleAddTour}
        editMode={editMode}
      />

      <h2>Your Tours</h2>
      <ul className="Grid small">
        {tours.map((tour) => (
          <li key={tour.id}>
            <h3>{tour.name}</h3>
            <p>Category: {tour.category} - Price: ${tour.price}</p>
            <div className="buttons">
              <button onClick={() => handleEditTour(tour)}>Edit</button>
              <button onClick={() => handleDeleteTour(tour.id)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}