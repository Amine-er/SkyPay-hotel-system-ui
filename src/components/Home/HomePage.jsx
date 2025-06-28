import React from 'react';
import Header from '@/components/Home/Header';
import RoomCard from '@/components/Home/RoomCard';
import roomsData from '@/lib/roomsData';

const HomePage = ({ onNavigate, onRoomSelect }) => {
  const handleReservation = (room) => {
    onRoomSelect(room);
    onNavigate('payment');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header onNavigate={onNavigate} currentPage="home" />
      <main className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            Available Rooms
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover our carefully curated selection of rooms, each designed to
            provide you with comfort, luxury, and an unforgettable experience.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {roomsData.map((room) => (
            <RoomCard
              key={room.id}
              room={room}
              onReservation={handleReservation}
            />
          ))}
        </div>
      </main>
    </div>
  );
};
export default HomePage;
