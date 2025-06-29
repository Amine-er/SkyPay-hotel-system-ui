import { useState, useEffect } from 'react';
import fetchRooms from './fetchRooms';

export default function useFetchRooms() {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadRooms = async () => {
      try {
        const data = await fetchRooms();
        setRooms(data);
      } catch (err) {
        setError('Failed to load rooms. Please try again later.');
        console.error('Error loading rooms:', err);
      } finally {
        setLoading(false);
      }
    };

    loadRooms();
  }, []);

  return { rooms, loading, error };
}
