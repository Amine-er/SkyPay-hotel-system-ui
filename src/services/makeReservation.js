import API_BASE_URL from './API_BASE_URL';
const makeReservation = async (roomId, startDate, endDate, reservationData) => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/bookings/make-reservation?roomId=${roomId}&startDate=${startDate}&endDate=${endDate}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(reservationData),
      }
    );

    if (!response.ok) {
      throw new Error('Failed to make reservation');
    }

    const reservationReference = await response.text();
    return reservationReference.replace(/"/g, ''); // Remove quotes from response
  } catch (error) {
    console.error('Error making reservation:', error);
    throw error;
  }
};
export default makeReservation;
