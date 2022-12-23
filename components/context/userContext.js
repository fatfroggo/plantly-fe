import { createContext } from "react";
import { useState } from "react";

const UserContext = createContext();
const UserPlantsContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState("fatfroggo");

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
