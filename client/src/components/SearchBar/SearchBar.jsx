import { useState } from 'react';
import './searchBar.scss';
import { Link } from 'react-router-dom';

const fuelTypes = ['petrol', 'diesel', 'electric', 'hybrid'];
const categories = ['sedan', 'coupe', 'combi', 'suv', 'hatchback'];

function SearchBar() {
  const [query, setQuery] = useState({
    fuelType: "petrol",
    category: "sedan",
    city: "",
    minPrice: 0,
    maxPrice: 0,
  });

  const handleChange = (e) => {
    setQuery((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <div className="searchBar">
      <div className="type">
        <select name="fuelType" value={query.fuelType} onChange={handleChange}>
          {fuelTypes.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
      </div>
      <div className="type">
        <select name="category" value={query.category} onChange={handleChange}>
          {categories.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
      </div>
      <form>
        <input
          type="text"
          name="city"
          placeholder="City"
          onChange={handleChange}
        />
        <input
          type="number"
          name="minPrice"
          min={0}
          max={10000000}
          placeholder="Min Price"
          onChange={handleChange}
        />
        <input
          type="number"
          name="maxPrice"
          min={0}
          max={10000000}
          placeholder="Max Price"
          onChange={handleChange}
        />
        <Link
          to={`/catalog?fuelType=${query.fuelType}&category=${query.category}&city=${query.city}&minPrice=${query.minPrice}&maxPrice=${query.maxPrice}`}
        >
          <button type="button">
            <img src="/search.png" alt="Search" />
          </button>
        </Link>
      </form>
    </div>
  );
}

export default SearchBar;
