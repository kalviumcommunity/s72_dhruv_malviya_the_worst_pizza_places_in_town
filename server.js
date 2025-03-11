require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 3000;

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;

// Event Listeners for Connection Status
db.on('error', (err) => console.log('❌ MongoDB Connection Error:', err));
db.once('open', () => console.log('✅ MongoDB Connected Successfully'));

// Home Route - Show DB Status
app.get('/', (req, res) => {
    const status = db.readyState === 1 ? 'Connected' : 'Disconnected';
    res.send(`Database Status: ${status}`);
});

// Start Server
app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});
