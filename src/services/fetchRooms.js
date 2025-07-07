const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const fetchRooms = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/rooms`);
    if (!response.ok) {
      throw new Error('Failed to fetch rooms');
    }
    const data = await response.json();
    return data.content || [];
  } catch (error) {
    console.error('Error fetching rooms:', error);
    throw error;
  }
};
export default fetchRooms;
