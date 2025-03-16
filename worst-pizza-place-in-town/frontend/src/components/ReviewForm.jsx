import React, { useState } from 'react';

const ReviewForm = ({ pizzaPlaceId, onSubmit }) => {
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    rating: 1,
    criteriaRatings: [
      { name: 'Cheese-to-crust ratio', rating: 1 },
      { name: 'Toppings quality', rating: 1 },
      { name: 'Wait time', rating: 1 },
      { name: 'Value for money', rating: 1 }
    ]
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleCriteriaChange = (index, value) => {
    const updatedCriteria = [...formData.criteriaRatings];
    updatedCriteria[index].rating = parseInt(value);
    setFormData({
      ...formData,
      criteriaRatings: updatedCriteria
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      ...formData,
      pizzaPlaceId
    });
  };

  const renderStarRating = (name, value, onChange) => {
    return (
      <div className="flex items-center">
        {[1, 2, 3, 4, 5].map((star) => (
          <label key={star} className="cursor-pointer">
            <input
              type="radio"
              name={name}
              value={star}
              checked={parseInt(value) === star}
              onChange={onChange}
              className="sr-only"
            />
            <svg
              className={`w-8 h-8 ${
                star <= value ? 'text-yellow-400' : 'text-gray-300'
              }`}
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          </label>
        ))}
      </div>
    );
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-bold mb-4">Write Your Review</h2>
      
      <div className="mb-4">
        <label htmlFor="title" className="block text-gray-700 font-medium mb-2">
          Title
        </label>
        <input
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
          required
        />
      </div>
      
      <div className="mb-4">
        <label className="block text-gray-700 font-medium mb-2">
          Overall Rating
        </label>
        {renderStarRating('rating', formData.rating, handleChange)}
      </div>
      
      <div className="mb-4">
        <label htmlFor="content" className="block text-gray-700 font-medium mb-2">
          Review
        </label>
        <textarea
          id="content"
          name="content"
          value={formData.content}
          onChange={handleChange}
          rows="4"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
          required
        ></textarea>
      </div>
      
      <div className="mb-4">
        <h3 className="text-gray-700 font-medium mb-2">Criteria Ratings</h3>
        {formData.criteriaRatings.map((criterion, index) => (
          <div key={index} className="mb-3">
            <div className="flex justify-between mb-1">
              <label className="text-sm text-gray-600">{criterion.name}</label>
              <span className="text-sm text-gray-600">{criterion.rating}/5</span>
            </div>
            {renderStarRating(
              `criteria-${index}`,
              criterion.rating,
              (e) => handleCriteriaChange(index, e.target.value)
            )}
          </div>
        ))}
      </div>
      
      <button
        type="submit"
        className="w-full bg-red-700 text-white py-2 px-4 rounded-md hover:bg-red-800 transition focus:outline-none focus:ring-2 focus:ring-red-500"
      >
        Submit Review
      </button>
    </form>
  );
};

export default ReviewForm;