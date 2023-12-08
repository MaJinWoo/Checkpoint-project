// api/firebaseAPI.js
import { getDownloadURL, ref, listAll } from 'firebase/storage';
import { storage } from '../firebase';

export const fetchDownloadURL = async (storeId) => {
  const listRef = ref(storage, storeId);
  const res = await listAll(listRef);
  if (res.items.length > 0) {
    const firstFileRef = res.items[0];
    return getDownloadURL(firstFileRef);
  }
  throw new Error('No files found in the directory');
};
