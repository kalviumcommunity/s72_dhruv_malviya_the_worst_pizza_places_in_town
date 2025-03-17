import React from 'react';
import { ThumbsDown, ThumbsUp, MessageCircle } from 'lucide-react';

const Review = ({ review, onVote }) => {
  const { 
    id, 
    username, 
    date, 
    rating, 
    title, 
    content, 
    criteriaRatings,
    upvotes,
    downvotes,
    userVote
  } = review;

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-4">
      <div className="flex justify-between items-start mb-3">
        <div>
          <h3 className="font-bold text-lg">{title}</h3>
          <div className="flex items-center text-sm text-gray-600">
            <span>By {username}</span>
            <span className="mx-2">•</span>
            <span>{formatDate(date)}</span>
          </div>
        </div>
        <div className="flex items-center">
          <span className="text-lg font-bold text-red-700">{rating}/5</span>
          <span className="ml-1 text-gray-500 text-sm">stars</span>
        </div>
      </div>
      
      <p className="text-gray-700 mb-4">{content}</p>
      
      {criteriaRatings && criteriaRatings.length > 0 && (
        <div className="mb-4">
          <h4 className="font-semibold text-sm mb-2">Criteria Ratings:</h4>
          <div className="flex flex-wrap gap-2">
            {criteriaRatings.map((criterion, index) => (
              <div key={index} className="bg-gray-100 px-3 py-1 rounded-full">
                <span className="text-xs font-medium text-gray-700">
                  {criterion.name}: {criterion.rating}/5
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
      
      <div className="flex items-center justify-between border-t pt-3 mt-3">
        <div className="flex items-center space-x-4">
          <button 
            className={`flex items-center space-x-1 ${userVote === 'up' ? 'text-green-600' : 'text-gray-500'} hover:text-green-600`}
            onClick={() => onVote(id, 'up')}
          >
            <ThumbsUp size={16} />
            <span>{upvotes}</span>
          </button>
          <button 
            className={`flex items-center space-x-1 ${userVote === 'down' ? 'text-red-600' : 'text-gray-500'} hover:text-red-600`}
            onClick={() => onVote(id, 'down')}
          >
            <ThumbsDown size={16} />
            <span>{downvotes}</span>
          </button>
        </div>
        <button className="text-gray-500 hover:text-gray-700 flex items-center space-x-1">
          <MessageCircle size={16} />
          <span>Reply</span>
        </button>
      </div>
    </div>
  );
};

export default Review;