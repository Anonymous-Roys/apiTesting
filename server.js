// server.js
const express = require('express');
const dotenv = require('dotenv');
const authenticate = require('./authMiddleware');
import { inject } from "@vercel/analytics"


dotenv.config();

const app = express();
app.use(express.json());

// Routes without API key authentication
app.get('/public', (req, res) => {
    res.status(200).json({ message: 'This is a public route' });
});

// Routes with API key authentication
app.get('/private', authenticate, (req, res) => {
    res.status(200).json({ message: 'This is a private route' });
});

app.get('/users', authenticate, (req, res) => {
    const users = [
        { firstname: 'John', lastname: 'Doe', ghanaCardNumber: 'GHA-123456', age: 30, location: 'Accra', housenumber: '123A' },
        { firstname: 'Jane', lastname: 'Smith', ghanaCardNumber: 'GHA-654321', age: 25, location: 'Kumasi', housenumber: '456B' },
        { firstname: 'Michael', lastname: 'Johnson', ghanaCardNumber: 'GHA-987654', age: 40, location: 'Cape Coast', housenumber: '789C' }
    ];
    res.status(200).json(users);
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
