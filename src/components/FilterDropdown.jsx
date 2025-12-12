// src/components/FilterDropdown.jsx
import React from 'react';
import { usePollStore } from '../store/usePollStore';

// Dropdown options
const GENRES = ['All', 'Action', 'Comedy', 'Drama', 'Sci-Fi', 'Horror', 'Romance', 'Documentary'];
const STATUS = ['All', 'Active', 'Closed'];

export default function FilterDropdown({ type }) {
  const filters = usePollStore((s) => s.filters);
  const setFilters = usePollStore((s) => s.setFilters);

  const isGenre = type === 'genre';
  const list = isGenre ? GENRES : STATUS;

  // current selected value
  const currentValue = isGenre ? filters.genre : filters.status;

  const handleChange = (e) => {
    const value = e.target.value;

    // update only one filter and keep the other the same
    if (isGenre) {
      setFilters({ ...filters, genre: value });
    } else {
      setFilters({ ...filters, status: value });
    }
  };

  return (
    <div className="w-full md:w-auto">
      <label className="sr-only">
        {isGenre ? 'Genre' : 'Status'}
      </label>

      <select
        value={currentValue}
        onChange={handleChange}
        className="p-2 border rounded w-full md:w-auto"
      >
        {list.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}
