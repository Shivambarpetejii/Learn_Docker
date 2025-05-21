const express = require('express');
const mongoose = require('mongoose');
const app = express();
const PORT = 3000;

// Middleware to parse JSON body
app.use(express.json());

// MongoDB connection string (Docker service name "mongo" used as hostname)
const MONGO_URL = 'mongodb://admin:qwerty@localhost:27017';

mongoose.connect(MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('✅ Connected to MongoDB'))
.catch((err) => console.error('❌ MongoDB connection error:', err));

// Define a Mongoose schema and model
const ItemSchema = new mongoose.Schema({
  name: String,
  quantity: Number
});
const Item = mongoose.model('Item', ItemSchema);

// Routes

// GET /items – return all items
app.get('/items', async (req, res) => {
  try {
    const items = await Item.find();
    res.json(items);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST /items – create a new item
app.post('/items', async (req, res) => {
  const { name, quantity } = req.body;
  const newItem = new Item({ name, quantity });

  try {
    const savedItem = await newItem.save();
    res.status(201).json(savedItem);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Root route
app.get('/', (req, res) => {
  res.send('🚀 Node.js + MongoDB API is running!');
});

// Start the server
app.listen(PORT, () => {
  console.log(`🚀 Server is listening on http://localhost:${PORT}`);
});
