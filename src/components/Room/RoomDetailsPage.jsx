import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Header from '@/components/Home/Header';
import {
  Star,
  ChevronLeft,
  ChevronRight,
  MapPin,
  Users,
  ThumbsUp,
  Calendar,
  CreditCard,
} from 'lucide-react';
import calculateNights from '@/utils/calculateNights';
import { useSelector, useDispatch } from 'react-redux';
import { setReservationDates } from '@/store/slices/roomSlice';
import { useRoomDetails } from '@/services/useRoomDetails';

const mockRoom = {
  amenities: [
    'Free WiFi',
    'Parking',
    'Coffee Machine',
    'Smart TV',
    'Air Conditioning',
  ],
  capacity: 4,
  size: '45 m²',
};

const RoomDetailsPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const selectedRoom = useSelector((state) => state.room.selected);
  const reservationDates = useSelector((state) => state.room.reservationDates);
  const { reviews, users } = useRoomDetails(selectedRoom.id);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showAllReviews, setShowAllReviews] = useState(false);

  const [checkInDate, setCheckInDate] = useState(
    reservationDates.checkInDate || ''
  );
  const [checkOutDate, setCheckOutDate] = useState(
    reservationDates.checkOutDate || ''
  );

  useEffect(() => {
    setCheckInDate(reservationDates.checkInDate || '');
    setCheckOutDate(reservationDates.checkOutDate || '');
  }, [reservationDates]);

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % selectedRoom.imageUrl.length);
  };

  const prevImage = () => {
    setCurrentImageIndex(
      (prev) =>
        (prev - 1 + selectedRoom.imageUrl.length) % selectedRoom.imageUrl.length
    );
  };

  const renderStars = (rating) =>
    Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${
          i < rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
        }`}
      />
    ));

  const handleCheckInChange = (e) => {
    const newCheckInDate = e.target.value;
    setCheckInDate(newCheckInDate);

    dispatch(
      setReservationDates({
        checkInDate: newCheckInDate,
        checkOutDate: checkOutDate,
      })
    );
  };

  const handleCheckOutChange = (e) => {
    const newCheckOutDate = e.target.value;
    setCheckOutDate(newCheckOutDate);

    dispatch(
      setReservationDates({
        checkInDate: checkInDate,
        checkOutDate: newCheckOutDate,
      })
    );
  };

  const handleReservation = () => {
    if (!checkInDate || !checkOutDate) {
      alert('Please select both check-in and check-out dates');
      return;
    }

    if (new Date(checkOutDate) <= new Date(checkInDate)) {
      alert('Check-out date must be after check-in date');
      return;
    }

    dispatch(
      setReservationDates({
        checkInDate: checkInDate,
        checkOutDate: checkOutDate,
      })
    );

    navigate('/payment');
  };

  const averageRating =
    reviews.reduce((sum, r) => sum + r.rating, 0) / (reviews.length || 1);
  const ratingBreakdown = reviews.reduce((acc, r) => {
    acc[r.rating] = (acc[r.rating] || 0) + 1;
    return acc;
  }, {});

  const displayedReviews = showAllReviews ? reviews : reviews.slice(0, 4);
  const nights = calculateNights(checkInDate, checkOutDate);
  const totalPrice = nights * selectedRoom.price;

  return (
    <div className="min-h-screen bg-gray-50">
      <Header currentPage={`/rooms/${selectedRoom?.id}`} />
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Room Images */}
            <div className="relative mb-8">
              <div className="relative h-96 rounded-lg overflow-hidden">
                <img
                  src={selectedRoom.imageUrl[currentImageIndex]}
                  alt={`Image ${currentImageIndex + 1}`}
                  className="w-full h-full object-cover"
                />
                <Button
                  variant="outline"
                  size="sm"
                  className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80"
                  onClick={prevImage}
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80"
                  onClick={nextImage}
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Room Info */}
            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="text-2xl">{selectedRoom.name}</CardTitle>
                <CardDescription>{selectedRoom.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
                  <div className="flex items-center space-x-2">
                    <Users className="w-5 h-5 text-gray-500" />
                    <span>{mockRoom.capacity} guests</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <MapPin className="w-5 h-5 text-gray-500" />
                    <span>{mockRoom.size}</span>
                  </div>
                </div>
                <div className="mb-6">
                  <h4 className="font-semibold mb-3">Amenities</h4>
                  <div className="flex flex-wrap gap-2">
                    {mockRoom.amenities.map((amenity, index) => (
                      <Badge key={index} variant="secondary">
                        {amenity}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Reviews Section */}
            <Card>
              <CardHeader>
                <div className="flex items-center space-x-2">
                  <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  <span className="text-xl font-bold">
                    {averageRating.toFixed(1)}
                  </span>
                  <span className="text-gray-600">
                    · {reviews.length} reviews
                  </span>
                </div>
              </CardHeader>
              <CardContent>
                {/* Rating Breakdown */}
                <div className="mb-6">
                  {[5, 4, 3, 2, 1].map((rating) => {
                    const count = ratingBreakdown[rating] || 0;
                    const percent = (count / reviews.length) * 100 || 0;
                    return (
                      <div key={rating} className="flex items-center space-x-2">
                        <span className="text-sm w-2">{rating}</span>
                        <div className="flex-1 h-2 bg-gray-200 rounded-full">
                          <div
                            className="h-full bg-gray-800 rounded-full"
                            style={{ width: `${percent}%` }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>

                <Separator className="my-6" />

                {/* Individual Reviews */}
                <div className="space-y-6">
                  {displayedReviews.map((review) => {
                    const user = users.find((u) => u.id === review.userId);
                    return (
                      <div key={review.id} className="space-y-3">
                        <div className="flex items-start space-x-3">
                          <img
                            src={user?.profilePicture}
                            alt={user?.firstName}
                            className="w-10 h-10 rounded-full object-cover"
                          />
                          <div className="flex-1">
                            <div className="font-semibold">
                              {user?.firstName} {user?.lastName}
                            </div>
                            <div className="flex items-center space-x-2 mb-2">
                              <div className="flex">
                                {renderStars(review.rating)}
                              </div>
                              <span className="text-sm text-gray-600">
                                {review.date} · {review.stayDuration}
                              </span>
                            </div>
                            <p className="text-gray-700 mb-2">
                              {review.comment}
                            </p>
                            {review.showMore && (
                              <button className="text-sm font-medium underline">
                                Show more
                              </button>
                            )}
                            {review.hasThumbsUp && (
                              <div className="mt-2">
                                <ThumbsUp className="w-4 h-4 text-gray-400" />
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {reviews.length > 4 && (
                  <div className="mt-6 text-center">
                    <Button
                      variant="outline"
                      onClick={() => setShowAllReviews(!showAllReviews)}
                    >
                      {showAllReviews
                        ? 'Show less'
                        : `Show all ${reviews.length} reviews`}
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Reservation Sidebar */}
          <div className="lg:col-span-1">
            <Card className="sticky top-8">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Calendar className="w-5 h-5" />
                  <span>Reserve this room</span>
                </CardTitle>
                <div className="flex items-baseline space-x-2">
                  <span className="text-2xl font-bold text-blue-600">
                    {selectedRoom.price}MAD
                  </span>
                  <span className="text-gray-500">per night</span>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Date Selection */}
                <div className="grid grid-cols-1 gap-3">
                  <div>
                    <Label htmlFor="checkIn" className="text-sm font-medium">
                      Check-in
                    </Label>
                    <Input
                      id="checkIn"
                      type="date"
                      value={checkInDate}
                      onChange={handleCheckInChange}
                      min={new Date().toISOString().split('T')[0]}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="checkOut" className="text-sm font-medium">
                      Check-out
                    </Label>
                    <Input
                      id="checkOut"
                      type="date"
                      value={checkOutDate}
                      onChange={handleCheckOutChange}
                      min={
                        checkInDate || new Date().toISOString().split('T')[0]
                      }
                      className="mt-1"
                    />
                  </div>
                </div>

                {/* Price Breakdown */}
                {nights > 0 && (
                  <div className="space-y-2 pt-4 border-t">
                    <div className="flex justify-between text-sm">
                      <span>
                        {selectedRoom.price}MAD × {nights} night
                        {nights > 1 ? 's' : ''}
                      </span>
                      <span>{totalPrice}MAD</span>
                    </div>
                    <Separator />
                    <div className="flex justify-between font-semibold">
                      <span>Total</span>
                      <span>{totalPrice}MAD</span>
                    </div>
                  </div>
                )}

                {/* Reserve Button */}
                <Button
                  onClick={handleReservation}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                  size="lg"
                >
                  <CreditCard className="w-4 h-4 mr-2" />
                  Reserve & Pay
                </Button>

                {/* Additional Info */}
                <div className="text-xs text-gray-500 text-center pt-2">
                  You won't be charged yet
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoomDetailsPage;
