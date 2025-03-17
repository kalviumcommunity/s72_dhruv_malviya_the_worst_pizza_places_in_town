const express = require('express');
const router = express.Router();
const PizzaPlace = require('../models/PizzaPlace');
const auth = require('../middleware/auth');

// Get all pizza places
router.get('/', async (req, res) => {
  try {
    const pizzaPlaces = await PizzaPlace.find()
      .populate('submittedBy', 'username')
      .sort({ createdAt: -1 });
    res.json(pizzaPlaces);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get single pizza place
router.get('/:id', async (req, res) => {
  try {
    const pizzaPlace = await PizzaPlace.findById(req.params.id)
      .populate('submittedBy', 'username');
    if (!pizzaPlace) {
      return res.status(404).json({ message: 'Pizza place not found' });
    }
    res.json(pizzaPlace);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get pizza places submitted by the user
router.get('/user/submissions', auth, async (req, res) => {
  try {
    const pizzaPlaces = await PizzaPlace.find({ submittedBy: req.user.userId })
      .populate('submittedBy', 'username')
      .sort({ createdAt: -1 });
    res.json(pizzaPlaces);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get pizza places the user has voted on
router.get('/user/voted', auth, async (req, res) => {
  try {
    const pizzaPlaces = await PizzaPlace.find({
      $or: [
        { 'votes.upvotes': req.user.userId },
        { 'votes.downvotes': req.user.userId }
      ]
    })
      .populate('submittedBy', 'username')
      .sort({ createdAt: -1 });
    res.json(pizzaPlaces);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create pizza place
router.post('/', auth, async (req, res) => {
  try {
    const pizzaPlace = new PizzaPlace({
      ...req.body,
      submittedBy: req.user.userId
    });
    await pizzaPlace.save();
    res.status(201).json(pizzaPlace);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Vote on pizza place
router.post('/:id/vote', auth, async (req, res) => {
  try {
    const { vote } = req.body;
    const pizzaPlace = await PizzaPlace.findById(req.params.id);
    
    if (!pizzaPlace) {
      return res.status(404).json({ message: 'Pizza place not found' });
    }

    const userId = req.user.userId;
    const hasUpvoted = pizzaPlace.votes.upvotes.includes(userId);
    const hasDownvoted = pizzaPlace.votes.downvotes.includes(userId);

    if (vote === 'up') {
      if (hasDownvoted) {
        pizzaPlace.votes.downvotes = pizzaPlace.votes.downvotes.filter(id => id.toString() !== userId);
      }
      if (!hasUpvoted) {
        pizzaPlace.votes.upvotes.push(userId);
      }
    } else if (vote === 'down') {
      if (hasUpvoted) {
        pizzaPlace.votes.upvotes = pizzaPlace.votes.upvotes.filter(id => id.toString() !== userId);
      }
      if (!hasDownvoted) {
        pizzaPlace.votes.downvotes.push(userId);
      }
    }

    await pizzaPlace.save();
    res.json(pizzaPlace);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router; 