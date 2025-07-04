import React, { useState } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useNavigate,
} from 'react-router-dom';
import HomePage from './components/Home/HomePage';
import PaymentPage from './components/Payment/PaymentPage';
import LoginPage from './components/Login/LoginPage';
import PrivateRoute from './components/Auth/PrivateRoute';

const App = () => {
  const [selectedRoom, setSelectedRoom] = useState(null);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route
          path="/home"
          element={
            <PrivateRoute>
              <HomePageWrapper setSelectedRoom={setSelectedRoom} />
            </PrivateRoute>
          }
        />
        <Route
          path="/payment"
          element={
            <PrivateRoute>
              <PaymentPage selectedRoom={selectedRoom} />
            </PrivateRoute>
          }
        />
        <Route path="*" element={<Navigate to="/" replace />} />
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
