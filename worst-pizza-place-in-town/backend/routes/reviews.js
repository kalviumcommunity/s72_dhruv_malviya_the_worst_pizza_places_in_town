const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const PizzaPlace = require('../models/PizzaPlace');

// Get reviews for a pizza place
router.get('/:pizzaPlaceId', async (req, res) => {
  try {
    const pizzaPlace = await PizzaPlace.findById(req.params.pizzaPlaceId)
      .populate('submittedBy', 'username');
    
    if (!pizzaPlace) {
      return res.status(404).json({ message: 'Pizza place not found' });
    }
    
    res.json({
      ratings: pizzaPlace.ratings,
      description: pizzaPlace.description,
      submittedBy: pizzaPlace.submittedBy
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router; 