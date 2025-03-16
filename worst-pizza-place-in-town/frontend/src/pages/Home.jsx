import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PizzaCard from '../components/PizzaCard';

const Home = () => {
  const [pizzaPlaces, setPizzaPlaces] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sortBy, setSortBy] = useState('worstRating'); // Default sort by worst rating

  useEffect(() => {
    const fetchPizzaPlaces = async () => {
      try {
        // Replace with your actual API endpoint
        const response = await fetch('/api/pizza-places');
        if (!response.ok) {
          throw new Error('Failed to fetch pizza places');
        }
        const data = await response.json();
        setPizzaPlaces(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
        
        // For demonstration purposes only - remove this in production
        // Mock data to show when API fails
        setPizzaPlaces([
          {
            id: 1,
            name: "Crusty's Pizza",
            imageUrl: "/api/placeholder/400/200",
            location: "Downtown",
            worstFeature: "Soggy Bottom",
            averageRating: 2.1,
            totalReviews: 12
          },
          {
            id: 2,
            name: "Cheap Slice",
            imageUrl: "/api/placeholder/400/200",
            location: "Westside",
            worstFeature: "Skimpy Toppings",
            averageRating: 1.8,
            totalReviews: 8
          },
          {
            id: 3,
            name: "Pizza Paradise",
            imageUrl: "/api/placeholder/400/200",
            location: "Northside",
            worstFeature: "Burnt Edges",
            averageRating: 2.4,
            totalReviews: 15
          }
        ]);
      }
    };

    fetchPizzaPlaces();
  }, []);

  const handleSortChange = (e) => {
    setSortBy(e.target.value);
  };

  const sortPizzaPlaces = (places) => {
    switch (sortBy) {
      case 'worstRating':
        return [...places].sort((a, b) => a.averageRating - b.averageRating);
      case 'mostReviews':
        return [...places].sort((a, b) => b.totalReviews - a.totalReviews);
      case 'alphabetical':
        return [...places].sort((a, b) => a.name.localeCompare(b.name));
      default:
        return places;
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Worst Pizza Places</h1>
          <p className="text-gray-600">Discover and share disappointing pizza experiences</p>
        </div>
        
        <div className="mt-4 md:mt-0 flex flex-col sm:flex-row gap-4">
          <div className="flex items-center">
            <label htmlFor="sortBy" className="mr-2 text-gray-700">Sort by:</label>
            <select
              id="sortBy"
              value={sortBy}
              onChange={handleSortChange}
              className="border rounded-md p-2 bg-white text-gray-800"
            >
              <option value="worstRating">Worst Rated</option>
              <option value="mostReviews">Most Reviews</option>
              <option value="alphabetical">A-Z</option>
            </select>
          </div>
          
          <Link 
            to="/add-pizza-place" 
            className="bg-red-700 text-white py-2 px-4 rounded-md hover:bg-red-800 transition flex items-center justify-center"
          >
            Add New Pizza Place
          </Link>
        </div>
      </div>
      
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-700"></div>
        </div>
      ) : error ? (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
          <strong className="font-bold">Error:</strong>
          <span className="block sm:inline"> {error}</span>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortPizzaPlaces(pizzaPlaces).map((pizzaPlace) => (
            <PizzaCard key={pizzaPlace.id} pizzaPlace={pizzaPlace} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;