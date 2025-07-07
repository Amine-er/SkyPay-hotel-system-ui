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
import SignInPage from './components/Login/SignInPage';
import SignUpPage from './components/Login/SignUpPage';
import { AuthProvider } from '@/auth/AuthContext';
import RequireAuth from '@/auth/RequireAuth';

const App = () => {
  const [selectedRoom, setSelectedRoom] = useState(null);

  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/signin" element={<SignInPage />} />
          <Route path="/signup" element={<SignUpPage />} />
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
          <Route path="*" element={<Navigate to="/signin" replace />} />
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
