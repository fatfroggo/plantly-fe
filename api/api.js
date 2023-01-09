import axios from "axios";

const plantsApi = axios.create({
  baseURL: "https://plantly-api.onrender.com/api/",
});

const forumApiData = axios.create({
  baseURL: "https://plantly.cyclic.app/api/",
});

export const getPlants = (climate, searchQuery) => {
  return plantsApi
    .get("/plants", { params: { climate: climate, common_name: searchQuery } })
    .then((plants) => {
      return plants.data.plants;
    });
};

export const getPlantById = (id) => {
  return plantsApi.get(`/plants/${id}`).then((plant) => {
    return plant.data.plant;
  });
};

export const getUserPlants = (user) => {
  return plantsApi.get(`/myplants/${user}`).then((myPlants) => {
    return myPlants.data.myPlants;
  });
};

export const postUserPlant = ({
  username,
  plant_id,
  last_watered_date,
  nickname,
}) => {
  const postBody = { username, plant_id, last_watered_date, nickname };
  return plantsApi
    .post(`/myplants/${username}/${plant_id}`, postBody)
    .then(({ data }) => {
      return data.myPlant;
    });
};

export const deleteUserPlant = (username, my_plant_id) => {
  return plantsApi.delete(`/myplants/${username}/${my_plant_id}`);
};

export const getUserPlantByMyPlantId = (username, my_plant_id) => {
  return plantsApi.get(`/myplants/${username}/${my_plant_id}`).then((plant) => {
    return plant.data.myPlant;
  });
};

export const getForum = () => {
  return forumApiData.get("/reddit").then((reddit) => {
    return reddit.data.post_array;
  });
};

export const updatePlantLastWatered = ({
  username,
  my_plant_id,
  last_watered_date,
}) => {
  return plantsApi
    .patch(`myplants/${username}/${my_plant_id}/last_watered`, {
      last_watered_date,
    })
    .then(({ data }) => {
      return data;
    });
};
