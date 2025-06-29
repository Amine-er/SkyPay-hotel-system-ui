import React from 'react';
import Header from '@/components/Home/Header';
import RoomCard from '@/components/Home/RoomCard';
import { Loader2, XCircle } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import useFetchRooms from '@/services/useFetchRooms';

const HomePage = ({ onNavigate, onRoomSelect }) => {
  const { rooms, loading, error } = useFetchRooms();

  const handleReservation = (room) => {
    onRoomSelect(room);
    onNavigate('payment');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header onNavigate={onNavigate} currentPage="home" />
        <div className="flex items-center justify-center py-20">
          <div className="text-center">
            <Loader2 className="h-12 w-12 animate-spin text-blue-600 mx-auto mb-4" />
            <p className="text-gray-600">Loading available rooms...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header onNavigate={onNavigate} currentPage="home" />
        <div className="flex items-center justify-center py-20">
          <Alert className="max-w-md">
            <XCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        </div>
      </div>
    );
  }

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
        {rooms.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {rooms.map((room) => (
              <RoomCard
                key={room.id}
                room={room}
                onReservation={handleReservation}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500">No rooms available at the moment.</p>
          </div>
        )}
      </main>
    </div>
  );
};
export default HomePage;
