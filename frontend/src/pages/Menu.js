import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../hooks/useCart';
import Cart from '../components/Cart';
import completeMenuData from '../data/completeMenu.json';
import './Menu.css';


const Menu = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const { addItem } = useCart();

  // Fun function to get emojis based on dish names
  const getDishEmoji = (dishName) => {
    const name = dishName.toLowerCase();
    
    if (name.includes('biryani')) return '🍛';
    if (name.includes('rice') || name.includes('pulao')) return '🍚';
    if (name.includes('noodles')) return '🍜';
    if (name.includes('chicken')) return '🍗';
    if (name.includes('mutton') || name.includes('lamb')) return '🥩';
    if (name.includes('fish')) return '🐟';
    if (name.includes('egg')) return '🥚';
    if (name.includes('paneer')) return '🧀';
    if (name.includes('mushroom')) return '🍄';
    if (name.includes('dal') || name.includes('lentil')) return '🫘';
    if (name.includes('curry')) return '🍲';
    if (name.includes('soup')) return '🍵';
    if (name.includes('salad')) return '🥗';
    if (name.includes('bread') || name.includes('roti')) return '🍞';
    if (name.includes('sweet') || name.includes('dessert')) return '🍰';
    if (name.includes('drink') || name.includes('juice')) return '🥤';
    if (name.includes('tea') || name.includes('coffee')) return '☕';
    if (name.includes('pizza')) return '🍕';
    if (name.includes('burger')) return '🍔';
    if (name.includes('sandwich')) return '🥪';
    if (name.includes('pasta')) return '🍝';
    if (name.includes('taco')) return '🌮';
    if (name.includes('sushi')) return '🍣';
    if (name.includes('fried')) return '🍤';
    if (name.includes('grilled')) return '🔥';
    if (name.includes('spicy')) return '🌶️';
    if (name.includes('cheese')) return '🧀';
    if (name.includes('vegetable') || name.includes('veg')) return '🥬';
    if (name.includes('non') || name.includes('meat')) return '🍖';
    
    // Default emojis based on category
    return '🍽️';
  };

  const fetchMenuItems = async () => {
    // Always use complete menu data to ensure all items show
    console.log('Using complete menu data:', completeMenuData.length, 'items');
    setMenuItems(completeMenuData);
    setLoading(false);
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
                <div className={`card-content ${item.category.toLowerCase()}`}>
                  <div className="category-badge">
                    {item.category === 'Veg' ? '🥬 Veg' : '🍗 Non-Veg'}
                  </div>
                  <div className="dish-icon">
                    {getDishEmoji(item.name)}
                  </div>
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
