import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

export default function Header() {
  const navigate = useNavigate();

  return (
    <header className="absolute top-0 left-0 right-0 z-50 bg-white/10 backdrop-blur-md border-b border-white/20">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo and Brand */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">SP</span>
            </div>
            <h1 className="text-2xl font-bold text-white">SkyPay Hotel</h1>
          </div>

          {/* Navigation Buttons */}
          <div className="flex items-center space-x-4">
            <Button
              onClick={() => {
                navigate('/signin');
              }}
              variant="ghost"
              className="text-white hover:bg-white/20 hover:text-white"
            >
              Sign In
            </Button>
            <Button
              onClick={() => {
                navigate('/signup');
              }}
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              Sign Up
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
