import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { MapPin, Phone, Globe, Clock, ThumbsDown } from 'lucide-react';
import Review from '../components/Review';

const PizzaPlaceDetail = ({ user }) => {
  const { id } = useParams();
  const [pizzaPlace, setPizzaPlace] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPizzaPlaceDetails = async () => {
      try {
        // Replace with your actual API endpoint
        const response = await fetch(`/api/pizza-places/${id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch pizza place details');
        }
        const data = await response.json();
        setPizzaPlace(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
        
        // Mock data for demonstration
        setPizzaPlace({
          id: parseInt(id),
          name: "Crusty's Pizza",
          imageUrl: "/api/placeholder/800/400",
          location: "Downtown",
          address: "123 Main St, Anytown, USA",
          phone: "(555) 123-4567",
          website: "https://example.com",
          hours: "Mon-Sun: 11am-11pm",
          worstFeature: "Soggy Bottom",
          description: "Known for their consistently disappointing crust that never quite lives up to expectations. The sauce is bland and the cheese is often sparse.",
          averageRating: 2.1,
          totalReviews: 12
        });
      }
    };

    const fetchReviews = async () => {
      try {
        // Replace with your actual API endpoint
        const response = await fetch(`/api/pizza-places/${id}/reviews`);
        if (!response.ok) {
          throw new Error('Failed to fetch reviews');
        }
        const data = await response.json();
        setReviews(data);
      } catch (err) {
        console.error('Error fetching reviews:', err);
        
        // Mock data for demonstration
        setReviews([
          {
            id: 1,
            username: "PizzaLover123",
            date: "2024-03-01",
            rating: 2,
            title: "Disappointing experience",
            content: "I was really looking forward to trying this place after seeing their ads, but the pizza was a major letdown. The crust was soggy, the cheese was sparse, and the toppings were minimal at best. Not worth the price at all.",
            criteriaRatings: [
              { name: "Cheese-to-crust ratio", rating: 2 },
              { name: "Toppings quality", rating: 1 },
              { name: "Wait time", rating: 3 },
              { name: "Value for money", rating: 1 }
            ],
            upvotes: 15,
            downvotes: 2,
            userVote: null
          },
          {
            id: 2,
            username: "CrustCritic",
            date: "2024-02-15",
            rating: 1,
            title: "Worst crust I've ever had",
            content: "The crust was like eating cardboard that had been left in water. Absolutely no flavor and terrible texture. The sauce was also bland and watery. Will never go back.",
            criteriaRatings: [
              { name: "Cheese-to-crust ratio", rating: 2 },
              { name: "Toppings quality", rating: 2 },
              { name: "Wait time", rating: 1 },
              { name: "Value for money", rating: 1 }
            ],
            upvotes: 22,
            downvotes: 1,
            userVote: null
          }
        ]);
      }
    };

    fetchPizzaPlaceDetails();
    fetchReviews();
  }, [id]);

  const handleVote = async (reviewId, voteType) => {
    if (!user) {
      alert("You must be logged in to vote on reviews");
      return;
    }

    try {
      // Replace with your actual API endpoint
      const response = await fetch(`/api/reviews/${reviewId}/vote`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({ voteType })
      });

      if (!response.ok) {
        throw new Error('Failed to submit vote');
      }

      // Update the reviews state with the new vote
      setReviews(reviews.map(review => {
        if (review.id === reviewId) {
          const updatedReview = { ...review, userVote: voteType };
          
          if (voteType === 'up') {
            if (review.userVote === 'up') {
              updatedReview.upvotes--;
              updatedReview.userVote = null;
            } else {
              updatedReview.upvotes++;
              if (review.userVote === 'down') {
                updatedReview.downvotes--;
              }
            }
          } else if (voteType === 'down') {
            if (review.userVote === 'down') {
              updatedReview.downvotes--;
              updatedReview.userVote = null;
            } else {
              updatedReview.downvotes++;
              if (review.userVote === 'up') {
                updatedReview.upvotes--;
              }
            }
          }
          
          return updatedReview;
        }
        return review;
      }));
    } catch (err) {
      console.error('Error voting on review:', err);
      alert('Failed to submit vote. Please try again later.');
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-700"></div>
      </div>
    );
  }

  if (error && !pizzaPlace) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
          <strong className="font-bold">Error:</strong>
          <span className="block sm:inline"> {error}</span>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Pizza Place Header */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
        <div className="relative h-64 overflow-hidden">
          <img 
            src={pizzaPlace.imageUrl || "/api/placeholder/800/400"} 
            alt={pizzaPlace.name} 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-30"></div>
          <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
            <h1 className="text-3xl font-bold mb-2">{pizzaPlace.name}</h1>
            <div className="flex items-center text-sm">
              <MapPin size={16} className="mr-1" />
              <span>{pizzaPlace.location}</span>
              <span className="mx-2">•</span>
              <span className="bg-red-700 text-white px-2 py-1 rounded-full text-xs">
                {pizzaPlace.worstFeature}
              </span>
            </div>
          </div>
        </div>

        <div className="p-6">
          <div className="flex items-center mb-4">
            <div className="bg-red-100 text-red-800 rounded-full px-3 py-1 flex items-center">
              <ThumbsDown size={16} className="mr-1" />
              <span className="font-bold">{pizzaPlace.averageRating.toFixed(1)}/5</span>
              <span className="ml-1 text-sm">({pizzaPlace.totalReviews} reviews)</span>
            </div>
          </div>

          <p className="text-gray-700 mb-6">{pizzaPlace.description}</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div className="flex items-start">
              <MapPin className="text-gray-500 mr-2 mt-1" size={18} />
              <div>
                <h3 className="font-medium text-gray-700">Address</h3>
                <p className="text-gray-600">{pizzaPlace.address}</p>
              </div>
            </div>
            <div className="flex items-start">
              <Phone className="text-gray-500 mr-2 mt-1" size={18} />
              <div>
                <h3 className="font-medium text-gray-700">Phone</h3>
                <p className="text-gray-600">{pizzaPlace.phone}</p>
              </div>
            </div>
            <div className="flex items-start">
              <Globe className="text-gray-500 mr-2 mt-1" size={18} />
              <div>
                <h3 className="font-medium text-gray-700">Website</h3>
                <a href={pizzaPlace.website} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                  {pizzaPlace.website}
                </a>
              </div>
            </div>
            <div className="flex items-start">
            <Clock className="text-gray-500 mr-2 mt-1" size={18} />
              <div>
                <h3 className="font-medium text-gray-700">Hours</h3>
                <p className="text-gray-600">{pizzaPlace.hours}</p>
              </div>
            </div>
          </div>

          <div className="flex justify-between items-center">
            <Link to="/" className="text-blue-600 hover:underline flex items-center">
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
              </svg>
              Back to all pizza places
            </Link>
            
            {user && (
              <Link 
                to={`/add-review/${pizzaPlace.id}`} 
                className="bg-red-700 text-white py-2 px-4 rounded-md hover:bg-red-800 transition"
              >
                Write a Review
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Reviews Section */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Reviews</h2>
        
        {reviews.length === 0 ? (
          <div className="bg-gray-100 p-6 rounded-lg text-center">
            <p className="text-gray-700">No reviews yet. Be the first to review this pizza place!</p>
            {user ? (
              <Link 
                to={`/add-review/${pizzaPlace.id}`} 
                className="inline-block mt-4 bg-red-700 text-white py-2 px-4 rounded-md hover:bg-red-800 transition"
              >
                Write a Review
              </Link>
            ) : (
              <Link 
                to="/login" 
                className="inline-block mt-4 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition"
              >
                Log in to write a review
              </Link>
            )}
          </div>
        ) : (
          <div className="space-y-4">
            {reviews.map((review) => (
              <Review key={review.id} review={review} onVote={handleVote} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default PizzaPlaceDetail;