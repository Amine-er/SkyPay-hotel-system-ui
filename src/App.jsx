import React, { useState } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from 'react-router-dom';
import HomePage from './components/Home/HomePage';
import PaymentPage from './components/Payment/PaymentPage';
import LoginPage from './components/Login/LoginPage';

const App = () => {
  const [selectedRoom, setSelectedRoom] = useState(null);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route
          path="/home"
          element={<HomePageWrapper setSelectedRoom={setSelectedRoom} />}
        />
        <Route
          path="/payment"
          element={<PaymentPage selectedRoom={selectedRoom} />}
        />
      </Routes>
    </Router>
  );
};

export default App;

const HomePageWrapper = ({ setSelectedRoom }) => {
  const navigate = useNavigate();

  const handleRoomSelect = (room) => {
    setSelectedRoom(room);
    navigate('/payment');
  };

  return <HomePage onRoomSelect={handleRoomSelect} />;
};
