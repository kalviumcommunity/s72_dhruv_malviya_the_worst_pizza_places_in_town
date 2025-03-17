const mongoose = require('mongoose');

const pizzaPlaceSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Pizza place name is required'],
    trim: true
  },
  address: {
    type: String,
    required: [true, 'Address is required'],
    trim: true
  },
  description: {
    type: String,
    required: [true, 'Description is required'],
    trim: true
  },
  ratings: {
    cheeseToCrustRatio: {
      type: Number,
      min: 1,
      max: 5,
      required: true
    },
    toppingDisappointment: {
      type: Number,
      min: 1,
      max: 5,
      required: true
    },
    sauceQuality: {
      type: Number,
      min: 1,
      max: 5,
      required: true
    },
    overallExperience: {
      type: Number,
      min: 1,
      max: 5,
      required: true
    }
  },
  submittedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  votes: {
    upvotes: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }],
    downvotes: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }]
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Index for search functionality
pizzaPlaceSchema.index({ name: 'text', description: 'text' });

const PizzaPlace = mongoose.model('PizzaPlace', pizzaPlaceSchema);

module.exports = PizzaPlace; 