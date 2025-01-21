const express = require('express');
const app = express();
const port = 3000;

app.get('/greet', (req, res) => {
  res.send('Welcome to the Worst pizza places!');
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});