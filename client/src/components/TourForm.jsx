import React from "react";

function TourForm({ tourData, handleChange, handleSubmit, editMode }) {
    return (
        <form onSubmit={handleSubmit} className="search">
            <input
                type="text"
                name="name"
                placeholder="Tour Name"
                value={tourData.name}
                onChange={handleChange}
                required
            />

            <select name="category" value={tourData.category} onChange={handleChange} required>
                <option value="">Select Category</option>
                <option value="Adventure">Adventure</option>
                <option value="Historical">Historical</option>
                <option value="Relaxation">Relaxation</option>
            </select>

            <input
                type="number"
                name="price"
                placeholder="Price"
                value={tourData.price}
                onChange={handleChange}
                required
            />

            <input
                type="number"
                name="duration"
                placeholder="Duration"
                value={tourData.duration}
                onChange={handleChange}
                required
            />

            <input
                type="number"
                name="seats"
                placeholder="Seats"
                value={tourData.seats}
                onChange={handleChange}
                required
            />

            <input
                type="text"
                name="location"
                placeholder="Location"
                value={tourData.location}
                onChange={handleChange}
            />

            <input
                type="text"
                name="imageUrl"
                placeholder="Image URL"
                value={tourData.imageUrl}
                onChange={handleChange}
            />

            <input
                type="number"
                name="agencyId"
                placeholder="Agency ID"
                value={tourData.agencyId}
                onChange={handleChange}
            />

            <button type="submit">{editMode ? "Update Tour" : "Add Tour"}</button>
        </form>
    );
}

export default TourForm;
