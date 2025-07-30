export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Column */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">SP</span>
              </div>
              <h3 className="text-xl font-bold">SkyPay Hotel</h3>
            </div>
            <p className="text-gray-400">
              Your trusted partner for luxury hotel bookings worldwide.
              Experience comfort and excellence.
            </p>
            <div className="flex space-x-4">
              <button className="text-gray-400 hover:text-white transition-colors">
                <span className="text-xl">📘</span>
              </button>
              <button className="text-gray-400 hover:text-white transition-colors">
                <span className="text-xl">🐦</span>
              </button>
              <button className="text-gray-400 hover:text-white transition-colors">
                <span className="text-xl">📷</span>
              </button>
              <button className="text-gray-400 hover:text-white transition-colors">
                <span className="text-xl">💼</span>
              </button>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Quick Links</h4>
            <ul className="space-y-2 text-gray-400">
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Home
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Hotels
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Destinations
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Deals
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  About Us
                </a>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Support</h4>
            <ul className="space-y-2 text-gray-400">
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Help Center
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Contact Us
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Booking Help
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Cancellation Policy
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Contact</h4>
            <div className="space-y-2 text-gray-400">
              <p className="flex items-center gap-2">
                <span>📞</span>
                <span>+1 (212) 123-4567</span>
              </p>
              <p className="flex items-center gap-2">
                <span>✉️</span>
                <span>support@errabi.com</span>
              </p>
              <p className="flex items-center gap-2">
                <span>📍</span>
                <span>Morocco, Casablanca, ST 123</span>
              </p>
              <p className="flex items-center gap-2">
                <span>🕒</span>
                <span>24/7 Customer Support</span>
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            © 2025 ERRABI. All rights reserved.
          </p>
          <div className="flex space-x-6 text-sm text-gray-400 mt-4 md:mt-0">
            <a href="#" className="hover:text-white transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-white transition-colors">
              Terms of Use
            </a>
            <a href="#" className="hover:text-white transition-colors">
              Cookie Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
