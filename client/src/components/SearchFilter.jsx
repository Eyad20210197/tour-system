import React from "react";
 
function SearchFilter({ searchTerm, setSearchTerm, categoryFilter, setCategoryFilter, priceFilter, setPriceFilter }) {
  return (
    <div className="search">
      <input
        type="text"
        placeholder="Search by name"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <input
        type="number"
        placeholder="Max Price"
        value={priceFilter}
        onChange={(e) => setPriceFilter(e.target.value)}
      />
      <select
        value={categoryFilter}
        onChange={(e) => setCategoryFilter(e.target.value)}
      >
        <option value="">All Categories</option>
        <option value="Adventure">Adventure</option>
        <option value="Historical">Historical</option>
        <option value="Relaxation">Relaxation</option>
      </select>
    </div>
  );
}

export default SearchFilter;
