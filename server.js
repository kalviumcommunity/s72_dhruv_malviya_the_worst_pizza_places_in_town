// Importing the Express module
const express = require('express');

// Creating an instance of Express
const app = express();

// Defining a port number
const PORT = 3000;

// Defining the /ping route
app.get('/ping', (req, res) => {
    res.send('Pong!');
});

// Starting the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${3000}`);
});
