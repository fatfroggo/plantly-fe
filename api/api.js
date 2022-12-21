import axios from 'axios';

const plantsApi = axios.create({
  baseURL: 'https://plantly.cyclic.app/api',
});

export const getPlants = () => {
  return plantsApi
    .get('/plants')
    .then(plants => {
      return plants.data.plants;
    })
    .catch(err => console.log(err));
};

export const getPlantsByQuery = searchquery => {
  return plantsApi.get(`/plants/?q=${searchquery}`).then(({ data }) => {
    return data;
  });
};

export const getPlantById = id => {
  return plantsApi.get(`/plants/${id}`).then(plant => {
    return plant.data.plant;
  });
};

// export const getUserPlants = () => {
//   return plantsApi.get(`/myPlants/fatfroggo`).then(userPlants => {
//     return userPlants.data.userPlants;
//   });
// };
