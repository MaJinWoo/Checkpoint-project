import axios from 'axios';

const getStores = async () => {
  const response = await axios.get(`http://localhost:4000/stores`);
  return response.data;
};
const addGeocode = async (id, data) => {
  await axios.patch(`http://localhost:4000/stores/${id}`, { geocode: data });
};
export { getStores, addGeocode };
