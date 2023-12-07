import axios from 'axios';

export const fetchStores = async () => {
  try {
    const response = await axios.get(`http://localhost:4000/stores`);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

export const deleteStore = async (storeId) => {
  try {
    await axios.delete(`http://localhost:4000/stores`, storeId);
    return;
  } catch (error) {
    return console.error('Error deleting data:', error);
  }
};

export const addStore = async (newStore) => {
  try {
    await axios.post(`http://localhost:4000/stores`, newStore);
  } catch (error) {
    return console.error('Error posting store', error);
  }
};
