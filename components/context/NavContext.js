import { createContext } from "react";
import { useState } from "react";

const NavContext = createContext();

export const NavProvider = ({ children }) => {
  const [page, setPage] = useState("Home");

  return (
    <NavContext.Provider value={{ page, setPage }}>
      {children}
    </NavContext.Provider>
  );
};

export default NavContext;
