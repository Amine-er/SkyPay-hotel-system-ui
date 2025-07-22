import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import makeReservation from '@/services/makeReservation';
import formatRoomType from '@/utils/formatRoomType';
import calculateNights from '@/utils/calculateNights';
import validatePaymentForm from '@/utils/validatePaymentForm';
import formatCardNumber from '@/utils/formatCardNumber';
import Header from '@/components/Home/Header';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Alert, AlertDescription } from '@/components/ui/alert';
import {
  CreditCard,
  CheckCircle,
  XCircle,
  Loader2,
  Calendar,
} from 'lucide-react';
import { useSelector, useDispatch } from 'react-redux';
import { clearReservationDates } from '@/store/slices/roomSlice';

const PaymentPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const selectedRoom = useSelector((state) => state.room.selected);
  const reservationDates = useSelector((state) => state.room.reservationDates);
  const user = useSelector((state) => state.auth.user);

  const [formData, setFormData] = useState({
    startDate: reservationDates.checkInDate || '',
    endDate: reservationDates.checkOutDate || '',
    userId: user?.userId || '',
    fullName: '',
    email: user?.email || '',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
  });

  const [showPaymentResult, setShowPaymentResult] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [paymentMessage, setPaymentMessage] = useState('');
  const [reservationReference, setReservationReference] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  // Update form data when Redux reservation dates change
  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      startDate: reservationDates.checkInDate || '',
      endDate: reservationDates.checkOutDate || '',
    }));
  }, [reservationDates]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validatePaymentForm(formData)) {
      alert('Please fill in all fields correctly');
      return;
    }

    setIsProcessing(true);

    try {
      const nights = calculateNights(formData.startDate, formData.endDate);
      const reservationData = {
        userId: formData.userId,
        fullName: formData.fullName,
        email: formData.email,
        cardNumber: formData.cardNumber.replace(/\s/g, ''),
        expiryDate: formData.expiryDate,
        cvv: formData.cvv,
        amount: nights * selectedRoom.price,
      };

      const reference = await makeReservation(
        selectedRoom.id,
        formData.startDate,
        formData.endDate,
        reservationData
      );

      setPaymentSuccess(true);
      setReservationReference(reference);
      setPaymentMessage(
        `Payment successful! Your reservation has been confirmed.`
      );
    } catch (error) {
      setPaymentSuccess(false);
      setPaymentMessage(
        'Payment failed. Please check your details and try again.'
      );
      console.error('Payment error:', error);
    } finally {
      setIsProcessing(false);
      setShowPaymentResult(true);
    }
  };

  const closePaymentResult = () => {
    setShowPaymentResult(false);
    if (paymentSuccess) {
      // Clear reservation dates from Redux on successful payment
      dispatch(clearReservationDates());
      navigate('/home');
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

  const nights = calculateNights(formData.startDate, formData.endDate);
  const totalAmount = nights * selectedRoom.price;

  const handleCardNumberChange = (e) => {
    const formatted = formatCardNumber(e.target.value);
    setFormData((prev) => ({
      ...prev,
      cardNumber: formatted,
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header currentPage="payment" />
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Reservation Summary */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                Reservation Summary
              </h2>
              <div className="space-y-4">
                <img
                  src={selectedRoom.imageUrl[0]}
                  alt={formatRoomType(selectedRoom.type)}
                  className="w-full h-48 object-cover rounded-lg"
                />
                <div>
                  <h3 className="text-xl font-semibold text-gray-800">
                    {formatRoomType(selectedRoom.type)}
                  </h3>
                  <p className="text-gray-600">{selectedRoom.description}</p>
                </div>

                {/* Reservation Dates Display */}
                {formData.startDate && formData.endDate && (
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <div className="flex items-center space-x-2 mb-2">
                      <Calendar className="w-4 h-4 text-blue-600" />
                      <span className="font-medium text-blue-800">
                        Your Stay
                      </span>
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-gray-600">Check-in</p>
                        <p className="font-semibold">
                          {new Date(formData.startDate).toLocaleDateString(
                            'en-US',
                            {
                              weekday: 'short',
                              year: 'numeric',
                              month: 'short',
                              day: 'numeric',
                            }
                          )}
                        </p>
                      </div>
                      <div>
                        <p className="text-gray-600">Check-out</p>
                        <p className="font-semibold">
                          {new Date(formData.endDate).toLocaleDateString(
                            'en-US',
                            {
                              weekday: 'short',
                              year: 'numeric',
                              month: 'short',
                              day: 'numeric',
                            }
                          )}
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                <div className="border-t pt-4">
                  <div className="flex justify-between mb-2">
                    <span>Room ID:</span>
                    <span className="font-semibold">
                      #{selectedRoom.id.toString().padStart(1, '0')}
                    </span>
                  </div>
                  <div className="flex justify-between mb-2">
                    <span>User ID:</span>
                    <span className="font-semibold">#{formData.userId}</span>
                  </div>
                  <div className="flex justify-between mb-2">
                    <span>Price per night:</span>
                    <span className="font-semibold">
                      {selectedRoom.price}MAD
                    </span>
                  </div>
                  {nights > 0 && (
                    <>
                      <div className="flex justify-between mb-2">
                        <span>Number of nights:</span>
                        <span className="font-semibold">{nights}</span>
                      </div>
                      <div className="flex justify-between text-lg font-bold text-blue-600">
                        <span>Total Amount:</span>
                        <span>{totalAmount}MAD</span>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>

            {/* Payment Form */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">
                Payment Details
              </h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Date inputs - pre-filled but editable */}
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
                      min={new Date().toISOString().split('T')[0]}
                      className="mt-1"
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
                      min={
                        formData.startDate ||
                        new Date().toISOString().split('T')[0]
                      }
                      className="mt-1"
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
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="cardNumber">Card Number</Label>
                  <div className="relative mt-1">
                    <Input
                      id="cardNumber"
                      name="cardNumber"
                      type="text"
                      placeholder="1234 5678 9012 3456"
                      value={formData.cardNumber}
                      onChange={handleCardNumberChange}
                      maxLength={19}
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
                      type="date"
                      value={formData.expiryDate}
                      onChange={handleInputChange}
                      required
                      className="mt-1"
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
                      maxLength={4}
                      required
                      className="mt-1"
                    />
                  </div>
                </div>

                <Button
                  type="submit"
                  disabled={isProcessing}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 text-lg disabled:opacity-50"
                >
                  {isProcessing ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    `Complete Payment ${
                      totalAmount > 0 ? totalAmount : selectedRoom.price
                    }MAD`
                  )}
                </Button>
              </form>
            </div>
          </div>
        </div>
      </main>

      <Dialog open={showPaymentResult} onOpenChange={setShowPaymentResult}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center space-x-2">
              {paymentSuccess ? (
                <CheckCircle className="h-6 w-6 text-green-600" />
              ) : (
                <XCircle className="h-6 w-6 text-red-600" />
              )}
              <span>
                {paymentSuccess ? 'Payment Successful!' : 'Payment Failed'}
              </span>
            </DialogTitle>
            <DialogDescription className="pt-4">
              {paymentMessage}
            </DialogDescription>
            {paymentSuccess && reservationReference && (
              <div className="mt-4 p-3 bg-green-50 rounded-lg">
                <p className="text-sm font-medium text-green-800">
                  Reservation Reference:
                </p>
                <p className="text-sm text-green-700 font-mono break-all">
                  {reservationReference}
                </p>
              </div>
            )}
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
