import { createContext } from "react";
import { useState, useContext, useEffect } from "react";

const UserPlantsContext = createContext();

export const UserPlantsProvider = ({ children }) => {
  const [userPlantsData, setUserPlantsData] = useState([]);

  return (
    <UserPlantsContext.Provider value={{ userPlantsData, setUserPlantsData }}>
      {children}
    </UserPlantsContext.Provider>
  );
};

export default UserPlantsContext;
