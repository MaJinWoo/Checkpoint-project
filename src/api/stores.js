import axios from 'axios';

export const fetchStores = async () => {
  try {
    const response = await axios.get(`${process.env.REACT_APP_STORE_SERVER_URL}/stores`);
    // console.log(response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

export const deleteStore = async (storeId) => {
  try {
    await axios.delete(`${process.env.REACT_APP_STORE_SERVER_URL}/stores`, storeId);
    return;
  } catch (error) {
    return console.error('Error deleting data:', error);
  }
};

export const addStore = async (newStore) => {
  try {
    await axios.post(`${process.env.REACT_APP_STORE_SERVER_URL}/stores`, newStore);
  } catch (error) {
    return console.error('Error posting store', error);
  }
};

export const updateStore = async ({ id, changes }) => {
  try {
    await axios.patch(`${process.env.REACT_APP_STORE_SERVER_URL}/stores/${id}`, changes);
  } catch (error) {
    return console.error('Error updating store', error);
  }
};
