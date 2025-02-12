import axios from 'axios';

const api = axios.create({
  baseURL: 'https://api.pokemontcg.io/v2',
  headers: {
    'X-Api-Key': '21dec265-6675-4e3b-971b-07dd662de519', 
  },
});

export const getCards = (page = 1, filters = {}) => {
  const params = { page, pageSize: 20, ...filters };
  return api.get('/cards', { params });
};  

export const getSets = () => {
  return api.get('/sets');
};  

export const getTypes = () => {
  return api.get('/types');
};  

export const getRarities = () => {
  return api.get('/rarities');
};  

