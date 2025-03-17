// routes/pizzaPlaceRoutes.js
const express = require('express');
const router = express.Router();
const pizzaPlaceController = require('../controllers/pizzaPlaceController');
const auth = require('../middleware/auth');

// Create - Protected route requiring authentication
router.post('/pizza-places', auth, pizzaPlaceController.createPizzaPlace);

// Read (All) - Public route
router.get('/pizza-places', pizzaPlaceController.getAllPizzaPlaces);

// Read (One) - Public route
router.get('/pizza-places/:id', pizzaPlaceController.getPizzaPlaceById);

// Update - Protected route requiring authentication
router.put('/pizza-places/:id', auth, pizzaPlaceController.updatePizzaPlace);

// Delete - Protected route requiring authentication
router.delete('/pizza-places/:id', auth, pizzaPlaceController.deletePizzaPlace);

module.exports = router;