import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Hotel, Search, User, Info, ArrowLeft, LogOut } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '@/store/slices/authSlice';

const Header = ({ currentPage }) => {
  const user = useSelector((state) => state.auth.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
    navigate('/signin');
  };

  return (
    <header className="bg-white shadow-md border-b">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Hotel className="h-8 w-8 text-blue-600" />
            <h1 className="text-2xl font-bold text-gray-800">SkyPay Hotel</h1>
          </div>
          <nav className="flex items-center space-x-6">
            {currentPage === 'payment' && (
              <Button
                variant="ghost"
                className="flex items-center space-x-1"
                onClick={navigate.bind(null, '/home')}
              >
                <ArrowLeft className="h-4 w-4" />
                <span>Back to Rooms</span>
              </Button>
            )}
            <Button variant="ghost" className="flex items-center space-x-1">
              <Search className="h-4 w-4" />
              <span>Search</span>
            </Button>
            <Button variant="ghost" className="flex items-center space-x-1">
              <Info className="h-4 w-4" />
              <span>About</span>
            </Button>
            <Button
              variant="ghost"
              className="flex items-center space-x-1"
              onClick={handleLogout}
            >
              <LogOut className="h-4 w-4" />
              <span>Logout</span>
            </Button>
            <Button variant="ghost" className="flex items-center space-x-1">
              <User className="h-4 w-4" />
              <span>{user?.name || 'Guest'}</span>
            </Button>
          </nav>
        </div>
      </div>
    </header>
  );
};
export default Header;
