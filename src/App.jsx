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
import { AuthProvider } from '@/components/Auth/AuthContext';
import RequireAuth from '@/components/Auth/RequireAuth';

const App = () => {
  const [selectedRoom, setSelectedRoom] = useState(null);

  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route
            path="/home"
            element={
              <RequireAuth allowedRoles={['ROLE_USER', 'ROLE_ADMIN']}>
                <HomePageWrapper setSelectedRoom={setSelectedRoom} />
              </RequireAuth>
            }
          />
          <Route
            path="/payment"
            element={
              <RequireAuth allowedRoles={['ROLE_USER', 'ROLE_ADMIN']}>
                <PaymentPage selectedRoom={selectedRoom} />
              </RequireAuth>
            }
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AuthProvider>
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
