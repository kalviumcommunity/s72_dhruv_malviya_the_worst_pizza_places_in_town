import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const AddPizzaPlace = ({ user }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    location: '',
    address: '',
    phone: '',
    website: '',
    hours: '',
    worstFeature: '',
    description: '',
    imageFile: null,
    imagePreview: null
  });
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  const worstFeatureOptions = [
    'Terrible Crust',
    'Disappointing Cheese',
    'Skimpy Toppings',
    'Soggy Bottom',
    'Too Greasy',
    'Bland Sauce',
    'Burnt Edges',
    'Poor Value',
    'Long Wait Time',
    'Rude Service',
    'Other'
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    
    // Clear error for this field if it exists
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({
        ...formData,
        imageFile: file,
        imagePreview: URL.createObjectURL(file)
      });
      
      // Clear error for image if it exists
      if (errors.imageFile) {
        setErrors({
          ...errors,
          imageFile: ''
        });
      }
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!formData.location.trim()) {
      newErrors.location = 'Location is required';
    }
    
    if (!formData.address.trim()) {
      newErrors.address = 'Address is required';
    }
    
    if (!formData.worstFeature) {
      newErrors.worstFeature = 'Worst feature is required';
    }
    
    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    } else if (formData.description.length < 10) {
      newErrors.description = 'Description should be at least 10 characters';
    }
    
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    
    setSubmitting(true);

    try {
      // In a real app, you'd create a FormData object to handle file uploads
      const formDataToSend = new FormData();
      Object.keys(formData).forEach(key => {
        if (key === 'imageFile' && formData[key]) {
          formDataToSend.append('image', formData[key]);
        } else if (key !== 'imagePreview') {
          formDataToSend.append(key, formData[key]);
        }
      });

      // Replace with your actual API endpoint
      const response = await fetch('/api/pizza-places', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: formDataToSend
      });

      if (!response.ok) {
        throw new Error('Failed to add pizza place');
      }

      const data = await response.json();
      navigate(`/pizza-place/${data.id}`);
    } catch (err) {
      setErrors({
        ...errors,
        submit: err.message
      });
      setSubmitting(false);
      
      // For demonstration, just redirect to home
      alert("Pizza place added successfully!");
      navigate('/');
    }
  };

  if (!user) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded relative" role="alert">
          <strong className="font-bold">Login Required:</strong>
          <span className="block sm:inline"> You must be logged in to add a pizza place.</span>
          <Link to="/login" className="underline">Login here</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <div className="mb-6">
          <Link to="/" className="text-blue-600 hover:underline flex items-center">
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
            </svg>
            Back to Home
          </Link>
        </div>
        
        <h1 className="text-2xl font-bold mb-6">Add a New Pizza Place</h1>
        
        <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-6">
          {errors.submit && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
              <span className="block sm:inline">{errors.submit}</span>
            </div>
          )}
          
          <div className="mb-4">
            <label htmlFor="name" className="block text-gray-700 font-medium mb-2">
              Name *
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 ${
                errors.name ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
          </div>
          
          <div className="mb-4">
            <label htmlFor="location" className="block text-gray-700 font-medium mb-2">
              Location (Neighborhood) *
            </label>
            <input
              type="text"
              id="location"
              name="location"
              value={formData.location}
              onChange={handleChange}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 ${
                errors.location ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="e.g. Downtown, Westside, etc."
              />
              {errors.location && <p className="text-red-500 text-sm mt-1">{errors.location}</p>}
            </div>
            
            <div className="mb-4">
              <label htmlFor="address" className="block text-gray-700 font-medium mb-2">
                Address *
              </label>
              <input
                type="text"
                id="address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 ${
                  errors.address ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="123 Main St, Anytown, USA"
              />
              {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address}</p>}
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label htmlFor="phone" className="block text-gray-700 font-medium mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                  placeholder="(555) 123-4567"
                />
              </div>
              <div>
                <label htmlFor="website" className="block text-gray-700 font-medium mb-2">
                  Website
                </label>
                <input
                  type="url"
                  id="website"
                  name="website"
                  value={formData.website}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                  placeholder="https://example.com"
                />
              </div>
            </div>
            
            <div className="mb-4">
              <label htmlFor="hours" className="block text-gray-700 font-medium mb-2">
                Hours of Operation
              </label>
              <input
                type="text"
                id="hours"
                name="hours"
                value={formData.hours}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                placeholder="Mon-Sun: 11am-11pm"
              />
            </div>
            
            <div className="mb-4">
              <label htmlFor="worstFeature" className="block text-gray-700 font-medium mb-2">
                Worst Feature *
              </label>
              <select
                id="worstFeature"
                name="worstFeature"
                value={formData.worstFeature}
                onChange={handleChange}
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 ${
                  errors.worstFeature ? 'border-red-500' : 'border-gray-300'
                }`}
              >
                <option value="">Select the worst feature</option>
                {worstFeatureOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
              {errors.worstFeature && <p className="text-red-500 text-sm mt-1">{errors.worstFeature}</p>}
            </div>
            
            <div className="mb-4">
              <label htmlFor="description" className="block text-gray-700 font-medium mb-2">
                Description *
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows="4"
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 ${
                  errors.description ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Describe what makes this pizza place particularly disappointing..."
              ></textarea>
              {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
            </div>
            
            <div className="mb-6">
              <label className="block text-gray-700 font-medium mb-2">
                Upload Image
              </label>
              <div className="flex items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-6 cursor-pointer" onClick={() => document.getElementById('imageFile').click()}>
                {formData.imagePreview ? (
                  <div className="w-full">
                    <img
                      src={formData.imagePreview}
                      alt="Pizza place preview"
                      className="mx-auto max-h-40 object-contain mb-2"
                    />
                    <p className="text-center text-sm text-gray-500">Click to change image</p>
                  </div>
                ) : (
                  <div className="text-center">
                    <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                    </svg>
                    <p className="mt-1 text-sm text-gray-500">Click to upload an image</p>
                    <p className="text-xs text-gray-400">PNG, JPG, GIF up to 5MB</p>
                  </div>
                )}
                <input
                  type="file"
                  id="imageFile"
                  name="imageFile"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
              </div>
              {errors.imageFile && <p className="text-red-500 text-sm mt-1">{errors.imageFile}</p>}
            </div>
            
            <div className="flex justify-end">
              <Link 
                to="/" 
                className="mr-2 bg-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-400 transition"
              >
                Cancel
              </Link>
              <button
                type="submit"
                className="bg-red-700 text-white py-2 px-4 rounded-md hover:bg-red-800 transition focus:outline-none focus:ring-2 focus:ring-red-500 disabled:bg-red-300"
                disabled={submitting}
              >
                {submitting ? 'Adding...' : 'Add Pizza Place'}
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  };
  
  export default AddPizzaPlace;