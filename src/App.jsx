import React, { useState } from 'react';
import HomePage from './components/Home/HomePage';
import PaymentPage from './components/Payment/PaymentPage';

const App = () => {
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedRoom, setSelectedRoom] = useState(null);

  const handleNavigate = (page) => {
    setCurrentPage(page);
  };

  const handleRoomSelect = (room) => {
    setSelectedRoom(room);
  };

  if (currentPage === 'home') {
    return (
      <HomePage onNavigate={handleNavigate} onRoomSelect={handleRoomSelect} />
    );
  } else if (currentPage === 'payment') {
    return (
      <PaymentPage onNavigate={handleNavigate} selectedRoom={selectedRoom} />
    );
  }

  return (
    <HomePage onNavigate={handleNavigate} onRoomSelect={handleRoomSelect} />
  );
};

export default App;
