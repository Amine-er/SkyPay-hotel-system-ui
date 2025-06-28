import React from 'react';
import { Button } from '@/components/ui/button';
import { Hotel, Search, User, Info, ArrowLeft } from 'lucide-react';

const Header = ({ onNavigate, currentPage }) => {
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
                onClick={() => onNavigate('home')}
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
            <Button variant="ghost" className="flex items-center space-x-1">
              <User className="h-4 w-4" />
              <span>Login</span>
            </Button>
          </nav>
        </div>
      </div>
    </header>
  );
};
export default Header;
