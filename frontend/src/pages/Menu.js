import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../hooks/useCart';
import Cart from '../components/Cart';
import './Menu.css';

const Menu = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const { addItem } = useCart();

  const fetchMenuItems = async () => {
    try {
      console.log('Fetching menu items...');
      const API_URL = process.env.NODE_ENV === 'production' 
        ? 'https://farhanas-kitchen-backend.onrender.com/api/menu'
        : '/api/menu';
      const response = await fetch(API_URL);
      console.log('Response status:', response.status);
      const data = await response.json();
      console.log('Menu data received:', data);
      setMenuItems(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching menu:', error);
      setLoading(false);
    }
  };

  const filterItems = useCallback(() => {
    let filtered = menuItems;

    // Filter by category
    if (selectedCategory !== 'All') {
      filtered = filtered.filter(item => item.category === selectedCategory);
    }

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(item =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredItems(filtered);
  }, [menuItems, selectedCategory, searchTerm]);

  useEffect(() => {
    fetchMenuItems();
  }, []);

  useEffect(() => {
    filterItems();
  }, [menuItems, selectedCategory, searchTerm]);

  const categories = ['All', 'Veg', 'Non-Veg'];

  const handleAddToCart = (item) => {
    addItem(item);
  };

  if (loading) {
    return (
      <div className="menu-loading">
        <div className="spinner"></div>
        <p>Loading delicious menu...</p>
      </div>
    );
  }

  return (
    <div className="menu">
      <div className="container">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="menu-header"
        >
          <h1>Our Delicious Menu</h1>
          <p>Choose from our wide variety of fresh and tasty dishes</p>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="menu-filters"
        >
          <div className="search-bar">
            <input
              type="text"
              placeholder="Search dishes..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
            <span className="search-icon">🔍</span>
          </div>

          <div className="category-filters">
            {categories.map(category => (
              <button
                key={category}
                className={`category-btn ${selectedCategory === category ? 'active' : ''}`}
                onClick={() => setSelectedCategory(category)}
              >
                {category === 'All' ? '🍽️ All' : 
                 category === 'Veg' ? '🥬 Veg' : '🍗 Non-Veg'}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Menu Grid */}
        <motion.div
          layout
          className="menu-grid"
        >
          <AnimatePresence>
            {filteredItems.map((item, index) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className="menu-card"
              >
                <div className="card-image">
                  {item.image ? (
                    <img src={item.image} alt={item.name} />
                  ) : (
                    <div className="placeholder-image">
                      {item.category === 'Veg' ? '🥬' : '🍗'}
                    </div>
                  )}
                  <div className="category-badge">
                    {item.category}
                  </div>
                </div>

                <div className="card-content">
                  <h3 className="dish-name">{item.name}</h3>
                  <p className="dish-description">
                    {item.description || 'Delicious and freshly prepared'}
                  </p>
                  <div className="card-footer">
                    <div className="price">
                      ₹{item.price}
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="add-btn"
                      onClick={() => handleAddToCart(item)}
                    >
                      Add to Cart
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* No Results */}
        {filteredItems.length === 0 && !loading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="no-results"
          >
            <div className="no-results-icon">🔍</div>
            <h3>No dishes found</h3>
            <p>Try adjusting your search or filter criteria</p>
          </motion.div>
        )}
      </div>

      {/* Floating Cart */}
      <Cart />
    </div>
  );
};

export default Menu;
