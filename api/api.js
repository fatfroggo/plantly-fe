import axios from "axios";

const plantsApi = axios.create({
  baseURL: "https://plantly.cyclic.app/api",
});

export const getPlants = plantsApi.get("/plants").then((plants) => {
  return plants.data.plants;
});

export const getPlantsByQuery = (searchquery) => {
  return plantsApi.get(`/plants/?q=${searchquery}`).then(({ data }) => {
    return data;
  });
};
