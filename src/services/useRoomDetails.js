import { useEffect, useState } from 'react';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const useRoomDetails = (roomId) => {
  const [reviews, setReviews] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [reviewsRes, usersRes] = await Promise.all([
          fetch(`${API_BASE_URL}/reviews/room/${roomId}`),
          fetch(`${API_BASE_URL}/users`),
        ]);
        const reviewsData = await reviewsRes.json();
        const usersData = await usersRes.json();
        setReviews(reviewsData);
        setUsers(usersData);
      } catch (err) {
        console.error('Error loading data:', err);
      } finally {
        setLoading(false);
      }
    };

    if (roomId) fetchData();
  }, [roomId]);

  return { reviews, users, loading };
};
