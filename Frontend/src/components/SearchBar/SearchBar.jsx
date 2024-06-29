// src/components/SearchBar.js
import React from 'react';
import './SearchBar.css';

const SearchBar = ({ query = '', onQueryChange }) => {

  const handleChange = (e) => {
    onQueryChange(e.target.value);
  };

  return (
    <div className="search-bar">
      <input
        className="flex h-10 w-[500px] border border-black/50 bg-transparent px-3 py-2 text-sm placeholder:text-gray-600 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
        type="text"
        onChange={handleChange}
        value={query}
        placeholder="Search the item"
      />
    </div>
  );
};

export default SearchBar;
