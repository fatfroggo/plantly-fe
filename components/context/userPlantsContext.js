import { createContext } from "react";
import { useState, useContext, useEffect } from "react";
import { getUserPlants } from "../../api/api";
import UserContext from "./userContext";

const UserPlantsContext = createContext();

export const UserPlantsProvider = ({ children }) => {
  const [userPlantsData, setUserPlantsData] = useState([]);
  const { user, setUser } = useContext(UserContext);

  useEffect(() => {
    getUserPlants(user).then((plants) => {
      setUserPlantsData(plants);
    });
  }, []);

  return (
    <UserPlantsContext.Provider value={{ userPlantsData, setUserPlantsData }}>
      {children}
    </UserPlantsContext.Provider>
  );
};

export default UserPlantsContext;
