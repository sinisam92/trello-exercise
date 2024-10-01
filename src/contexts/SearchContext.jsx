import React, { createContext, useContext, useState } from "react";
import PropTypes from "prop-types";

const SearchContext = createContext();

export const SearchProvider = ({ children }) => {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <SearchContext.Provider value={{ searchTerm, setSearchTerm }}>
      {children}
    </SearchContext.Provider>
  );
};

export const useSearch = () => {
  return useContext(SearchContext);
};

SearchProvider.propTypes = {
  children: PropTypes.node,
};
