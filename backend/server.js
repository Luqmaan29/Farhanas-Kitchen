const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '../frontend/build')));

// Serve PDF files from the public directory
app.use('/pdfs', express.static(path.join(__dirname, '../frontend/public')));

// Serve menu data
app.get('/api/menu', (req, res) => {
  try {
    const menuPath = path.join(__dirname, 'menu.json');
    console.log('Reading menu from:', menuPath);
    const menuData = JSON.parse(fs.readFileSync(menuPath, 'utf8'));
    console.log('Menu data loaded:', menuData.length, 'items');
    res.json(menuData);
  } catch (error) {
    console.error('Error reading menu:', error);
    res.status(500).json({ error: 'Failed to load menu' });
  }
});

// Log order requests
app.post('/api/order', (req, res) => {
  try {
    const orderData = {
      timestamp: new Date().toISOString(),
      ...req.body
    };
    
    // Log to file
    const logPath = path.join(__dirname, 'orders.log');
    fs.appendFileSync(logPath, JSON.stringify(orderData) + '\n');
    
    console.log('New order received:', orderData);
    res.json({ success: true, message: 'Order logged successfully' });
  } catch (error) {
    console.error('Error logging order:', error);
    res.status(500).json({ error: 'Failed to log order' });
  }
});

// Serve React app for all other routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/build/index.html'));
});

app.listen(PORT, () => {
  console.log(`🍱 Cloud Kitchen Server running on port ${PORT}`);
  console.log(`📱 API available at http://localhost:${PORT}/api`);
});
