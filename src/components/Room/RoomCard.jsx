import React, { useState } from 'react';
import formatRoomType from '@/utils/formatRoomType';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const RoomCard = ({ room, onReservation }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % room.imageUrl.length);
  };

  const prevImage = () => {
    setCurrentImageIndex(
      (prev) => (prev - 1 + room.imageUrl.length) % room.imageUrl.length
    );
  };

  return (
    <Card className="w-full max-w-md mx-auto overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
      <div className="relative">
        <img
          src={room.imageUrl[currentImageIndex]}
          alt={`${formatRoomType(room.type)} - Image ${currentImageIndex + 1}`}
          className="w-full h-48 object-cover"
        />
        <Button
          variant="outline"
          size="sm"
          className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white"
          onClick={prevImage}
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          size="sm"
          className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white"
          onClick={nextImage}
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
        <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-1">
          {room.imageUrl.map((_, index) => (
            <div
              key={index}
              className={`w-2 h-2 rounded-full ${
                index === currentImageIndex ? 'bg-white' : 'bg-white/50'
              }`}
            />
          ))}
        </div>
      </div>
      <CardHeader>
        <CardTitle className="text-xl font-bold text-gray-800">
          {formatRoomType(room.type)}
        </CardTitle>
        <CardDescription className="text-gray-600">
          {room.description}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between items-center">
          <span className="text-2xl font-bold text-blue-600">
            {room.price}MAD/night
          </span>
          <Button
            onClick={() => onReservation(room)}
            className="bg-blue-600 hover:bg-blue-700 text-white"
          >
            Reserve Now
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
export default RoomCard;
