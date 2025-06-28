import React, { useState } from 'react';
import Header from '@/components/Home/Header';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { CreditCard, CheckCircle, XCircle } from 'lucide-react';

const PaymentPage = ({ onNavigate, selectedRoom }) => {
  const [formData, setFormData] = useState({
    startDate: '',
    endDate: '',
    userId: Math.floor(Math.random() * 10000) + 1,
    fullName: '',
    cardNumber: '',
    expiryDate: '',
    cvv: ''
  });

  const [showPaymentResult, setShowPaymentResult] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [paymentMessage, setPaymentMessage] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const validateForm = () => {
    const { startDate, endDate, fullName, cardNumber, expiryDate, cvv } = formData;
    
    if (!startDate || !endDate || !fullName || !cardNumber || !expiryDate || !cvv) {
      return false;
    }

    if (new Date(startDate) >= new Date(endDate)) {
      return false;
    }

    return true;
  };

  const simulatePayment = () => {
    // Simulate random payment success/failure and room availability
    const isPaymentSuccessful = Math.random() > 0.2; // 80% success rate
    const isRoomAvailable = Math.random() > 0.1; // 90% availability rate

    if (!isRoomAvailable) {
      setPaymentSuccess(false);
      setPaymentMessage('Sorry, this room is no longer available for the selected dates.');
    } else if (!isPaymentSuccessful) {
      setPaymentSuccess(false);
      setPaymentMessage('Payment failed. Please check your card details and try again.');
    } else {
      setPaymentSuccess(true);
      setPaymentMessage('Payment successful! Your reservation has been confirmed.');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      alert('Please fill in all fields correctly');
      return;
    }

    simulatePayment();
    setShowPaymentResult(true);
  };

  const closePaymentResult = () => {
    setShowPaymentResult(false);
    if (paymentSuccess) {
      onNavigate('home');
    }
  };

  if (!selectedRoom) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Alert className="max-w-md">
          <XCircle className="h-4 w-4" />
          <AlertDescription>
            No room selected. Please return to the home page and select a room.
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  const calculateNights = () => {
    if (formData.startDate && formData.endDate) {
      const start = new Date(formData.startDate);
      const end = new Date(formData.endDate);
      const diffTime = Math.abs(end - start);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      return diffDays;
    }
    return 0;
  };

  const totalAmount = calculateNights() * selectedRoom.price;

  return (
    <div className="min-h-screen bg-gray-50">
      <Header onNavigate={onNavigate} currentPage="payment" />
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Room Summary */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Reservation Summary</h2>
              <div className="space-y-4">
                <img
                  src={selectedRoom.images[0]}
                  alt={selectedRoom.type}
                  className="w-full h-48 object-cover rounded-lg"
                />
                <div>
                  <h3 className="text-xl font-semibold text-gray-800">{selectedRoom.type}</h3>
                  <p className="text-gray-600">{selectedRoom.description}</p>
                </div>
                <div className="border-t pt-4">
                  <div className="flex justify-between mb-2">
                    <span>Room ID:</span>
                    <span className="font-semibold">#{selectedRoom.id.toString().padStart(4, '0')}</span>
                  </div>
                  <div className="flex justify-between mb-2">
                    <span>User ID:</span>
                    <span className="font-semibold">#{formData.userId}</span>
                  </div>
                  <div className="flex justify-between mb-2">
                    <span>Price per night:</span>
                    <span className="font-semibold">${selectedRoom.price}</span>
                  </div>
                  {calculateNights() > 0 && (
                    <>
                      <div className="flex justify-between mb-2">
                        <span>Number of nights:</span>
                        <span className="font-semibold">{calculateNights()}</span>
                      </div>
                      <div className="flex justify-between text-lg font-bold text-blue-600">
                        <span>Total Amount:</span>
                        <span>${totalAmount}</span>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>

            {/* Payment Form */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Payment Details</h2>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="startDate">Check-in Date</Label>
                    <Input
                      id="startDate"
                      name="startDate"
                      type="date"
                      value={formData.startDate}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="endDate">Check-out Date</Label>
                    <Input
                      id="endDate"
                      name="endDate"
                      type="date"
                      value={formData.endDate}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="fullName">Full Name</Label>
                  <Input
                    id="fullName"
                    name="fullName"
                    type="text"
                    placeholder="Enter your full name"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="cardNumber">Card Number</Label>
                  <div className="relative">
                    <Input
                      id="cardNumber"
                      name="cardNumber"
                      type="text"
                      placeholder="1234 5678 9012 3456"
                      value={formData.cardNumber}
                      onChange={handleInputChange}
                      required
                    />
                    <CreditCard className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="expiryDate">Expiry Date</Label>
                    <Input
                      id="expiryDate"
                      name="expiryDate"
                      type="text"
                      placeholder="MM/YY"
                      value={formData.expiryDate}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="cvv">CVV</Label>
                    <Input
                      id="cvv"
                      name="cvv"
                      type="text"
                      placeholder="123"
                      value={formData.cvv}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>

                <Button
                  onClick={handleSubmit}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 text-lg"
                >
                  Complete Payment ${totalAmount > 0 ? totalAmount : selectedRoom.price}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Payment Result Dialog */}
      <Dialog open={showPaymentResult} onOpenChange={setShowPaymentResult}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center space-x-2">
              {paymentSuccess ? (
                <CheckCircle className="h-6 w-6 text-green-600" />
              ) : (
                <XCircle className="h-6 w-6 text-red-600" />
              )}
              <span>{paymentSuccess ? 'Payment Successful!' : 'Payment Failed'}</span>
            </DialogTitle>
            <DialogDescription className="pt-4">
              {paymentMessage}
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-end space-x-2 pt-4">
            <Button onClick={closePaymentResult}>
              {paymentSuccess ? 'Continue' : 'Try Again'}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};
export default PaymentPage;