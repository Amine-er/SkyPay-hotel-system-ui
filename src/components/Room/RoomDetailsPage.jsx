import React, { useState, useEffect } from 'react';
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
import Header from '@/components/Home/Header';
import {
  Star,
  ChevronLeft,
  ChevronRight,
  MapPin,
  Users,
  ThumbsUp,
} from 'lucide-react';
import { useSelector } from 'react-redux';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

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
  const selectedRoom = useSelector((state) => state.room.selected);
  const [reviews, setReviews] = useState([]);
  const [users, setUsers] = useState([]);
  //const [loading, setLoading] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showAllReviews, setShowAllReviews] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [reviewsRes, usersRes] = await Promise.all([
          fetch(`${API_BASE_URL}/reviews/room/${selectedRoom.id}`),
          fetch(`${API_BASE_URL}/users`),
        ]);
        const reviewsData = await reviewsRes.json();
        const usersData = await usersRes.json();
        setReviews(reviewsData);
        setUsers(usersData);
      } catch (err) {
        console.error('Error loading data:', err);
      } finally {
        //setLoading(false);
      }
    };

    fetchData();
  }, [selectedRoom.id]);

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

  const averageRating =
    reviews.reduce((sum, r) => sum + r.rating, 0) / (reviews.length || 1);
  const ratingBreakdown = reviews.reduce((acc, r) => {
    acc[r.rating] = (acc[r.rating] || 0) + 1;
    return acc;
  }, {});

  const displayedReviews = showAllReviews ? reviews : reviews.slice(0, 4);

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
        </div>
      </div>
    </div>
  );
};

export default RoomDetailsPage;
