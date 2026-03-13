const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors()); // Mandatory for Vercel 
app.use(express.json());

// In-memory storage 
let messages = [
    { author: "System", content: "Welcome to the mini-chat!", time: new Date().toLocaleTimeString() }
];

// GET /api/messages: Returns all messages [cite: 36, 38]
app.get('/api/messages', (req, res) => {
    res.json(messages);
});

// POST /api/messages: Adds a message [cite: 37, 40]
app.post('/api/messages', (req, res) => {
    const { author, content } = req.body;
    if (author && content) {
        const newMessage = {
            author,
            content,
            time: new Date().toLocaleTimeString()
        };
        messages.push(newMessage);
        res.status(201).json(newMessage);
    } else {
        res.status(400).json({ error: "Missing author or content" });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});