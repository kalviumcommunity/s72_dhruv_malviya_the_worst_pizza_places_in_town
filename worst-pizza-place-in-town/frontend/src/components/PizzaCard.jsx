import React from 'react';
import { Link } from 'react-router-dom';
import { Star, ThumbsDown } from 'lucide-react';

const PizzaCard = ({ pizzaPlace }) => {
  const { 
    id, 
    name, 
    imageUrl, 
    location, 
    worstFeature, 
    averageRating, 
    totalReviews 
  } = pizzaPlace;

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition duration-300">
      <div className="relative h-48 overflow-hidden">
        <img 
          src={imageUrl || "/api/placeholder/400/200"} 
          alt={name} 
          className="w-full h-full object-cover"
        />
        <div className="absolute bottom-0 left-0 bg-red-700 text-white px-3 py-1 rounded-tr-lg">
          <div className="flex items-center">
            <ThumbsDown size={16} className="mr-1" />
            <span>{(5 - averageRating).toFixed(1)}/5</span>
          </div>
        </div>
      </div>
      
      <div className="p-4">
        <h3 className="text-xl font-bold text-gray-800 mb-1">{name}</h3>
        <p className="text-gray-600 text-sm mb-2">{location}</p>
        
        <div className="mb-3">
          <span className="inline-block bg-red-100 text-red-800 text-xs px-2 py-1 rounded-full font-semibold">
            {worstFeature}
          </span>
        </div>
        
        <div className="flex justify-between items-center">
          <div className="text-sm text-gray-500">
            {totalReviews} {totalReviews === 1 ? 'review' : 'reviews'}
          </div>
          <Link 
            to={`/pizza/${id}`} 
            className="text-red-700 hover:text-red-900 text-sm font-medium"
          >
            View Details →
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PizzaCard;