import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import HomePage from './components/Home/HomePage';
import PaymentPage from './components/Payment/PaymentPage';
import SignInPage from './components/Login/SignInPage';
import SignUpPage from './components/Login/SignUpPage';
import RequireAuth from '@/auth/RequireAuth';
import RoomDetailsPage from './components/Room/RoomDetailsPage';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/signin" element={<SignInPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route
          path="/home"
          element={
            <RequireAuth allowedRoles={['ROLE_USER', 'ROLE_ADMIN']}>
              <HomePage />
            </RequireAuth>
          }
        />
        <Route
          path="/rooms/:roomId"
          element={
            <RequireAuth allowedRoles={['ROLE_USER', 'ROLE_ADMIN']}>
              <RoomDetailsPage />
            </RequireAuth>
          }
        />
        <Route
          path="/payment"
          element={
            <RequireAuth allowedRoles={['ROLE_USER', 'ROLE_ADMIN']}>
              <PaymentPage />
            </RequireAuth>
          }
        />
        <Route path="*" element={<Navigate to="/signin" replace />} />
      </Routes>
    </Router>
  );
};

export default App;
