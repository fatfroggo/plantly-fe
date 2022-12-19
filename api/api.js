import axios from 'axios';

const plantsApi = axios.create({
  baseURL: 'https://salmon-cuttlefish-hat.cyclic.app/api',
});

export const getPlants = plantsApi.get('/plants').then(plants => {
  return plants.data.plants;
});
