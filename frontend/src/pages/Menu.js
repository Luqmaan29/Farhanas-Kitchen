import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../hooks/useCart';
import Cart from '../components/Cart';
import './Menu.css';

// Fallback menu data - hardcoded for reliability
const fallbackMenuData = [
  // Veg Items
  {
    "id": 1,
    "name": "Bengaluru Vegetable Biryani",
    "price": 180,
    "description": "Authentic Bengaluru style vegetable biryani with aromatic spices",
    "category": "Veg",
    "image": ""
  },
  {
    "id": 2,
    "name": "Donne Veg Biryani",
    "price": 180,
    "description": "Traditional Donne style vegetable biryani served in eco-friendly leaf bowls",
    "category": "Veg",
    "image": ""
  },
  {
    "id": 3,
    "name": "Hyderabadi Vegetable Biryani",
    "price": 200,
    "description": "Famous Hyderabadi style vegetable biryani with rich flavors",
    "category": "Veg",
    "image": ""
  },
  {
    "id": 4,
    "name": "Paneer Biryani",
    "price": 220,
    "description": "Delicious paneer biryani with soft cottage cheese and aromatic rice",
    "category": "Veg",
    "image": ""
  },
  {
    "id": 5,
    "name": "Mushroom Biryani",
    "price": 190,
    "description": "Flavorful mushroom biryani with fresh mushrooms and spices",
    "category": "Veg",
    "image": ""
  },
  {
    "id": 6,
    "name": "Dal Khichdi",
    "price": 120,
    "description": "Comforting dal khichdi with rice, lentils and vegetables",
    "category": "Veg",
    "image": ""
  },
  {
    "id": 7,
    "name": "Vegetable Pulao",
    "price": 150,
    "description": "Light and fragrant vegetable pulao with mixed vegetables",
    "category": "Veg",
    "image": ""
  },
  {
    "id": 8,
    "name": "Jeera Rice",
    "price": 100,
    "description": "Simple and aromatic jeera rice with cumin seeds",
    "category": "Veg",
    "image": ""
  },
  // Non-Veg Items
  {
    "id": 9,
    "name": "Chicken Biryani",
    "price": 250,
    "description": "Classic chicken biryani with tender pieces and aromatic rice",
    "category": "Non-Veg",
    "image": ""
  },
  {
    "id": 10,
    "name": "Mutton Biryani",
    "price": 300,
    "description": "Rich mutton biryani with succulent meat and flavorful rice",
    "category": "Non-Veg",
    "image": ""
  },
  {
    "id": 11,
    "name": "Fish Biryani",
    "price": 280,
    "description": "Delicious fish biryani with fresh fish and aromatic spices",
    "category": "Non-Veg",
    "image": ""
  },
  {
    "id": 12,
    "name": "Egg Biryani",
    "price": 200,
    "description": "Flavorful egg biryani with boiled eggs and spices",
    "category": "Non-Veg",
    "image": ""
  },
  {
    "id": 13,
    "name": "Chicken Pulao",
    "price": 220,
    "description": "Light chicken pulao with tender chicken pieces",
    "category": "Non-Veg",
    "image": ""
  },
  {
    "id": 14,
    "name": "Mutton Pulao",
    "price": 280,
    "description": "Rich mutton pulao with succulent mutton pieces",
    "category": "Non-Veg",
    "image": ""
  }
];

const Menu = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const { addItem } = useCart();

  const fetchMenuItems = async () => {
    // Always use fallback data for now to ensure menu shows
    console.log('Using fallback menu data:', fallbackMenuData);
    setMenuItems(fallbackMenuData);
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
