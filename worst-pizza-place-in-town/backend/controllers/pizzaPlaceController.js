// controllers/pizzaPlaceController.js
// Sample data (replace with DB integration)
let pizzaPlaces = [{ id: 1, name: 'Worst Pizza Place', reviews: [] }];

// Create
exports.createPizzaPlace = (req, res) => {
    const newPlace = { id: pizzaPlaces.length + 1, ...req.body };
    pizzaPlaces.push(newPlace);
    res.status(201).json(newPlace);
};

// Read (All)
exports.getAllPizzaPlaces = (req, res) => {
    res.json(pizzaPlaces);
};

// Read (One)
exports.getPizzaPlaceById = (req, res) => {
    const place = pizzaPlaces.find(p => p.id === parseInt(req.params.id));
    place ? res.json(place) : res.status(404).send('Pizza Place not found');
};

// Update
exports.updatePizzaPlace = (req, res) => {
    const index = pizzaPlaces.findIndex(p => p.id === parseInt(req.params.id));
    if (index !== -1) {
        pizzaPlaces[index] = { ...pizzaPlaces[index], ...req.body };
        res.json(pizzaPlaces[index]);
    } else {
        res.status(404).send('Pizza Place not found');
    }
};

// Delete
exports.deletePizzaPlace = (req, res) => {
    const index = pizzaPlaces.findIndex(p => p.id === parseInt(req.params.id));
    if (index !== -1) {
        pizzaPlaces.splice(index, 1);
        res.status(204).send();
    } else {
        res.status(404).send('Pizza Place not found');
    }
};