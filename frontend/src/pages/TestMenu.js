import React from 'react';

const TestMenu = () => {
  const menuItems = [
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
      "name": "Chicken Biryani",
      "price": 250,
      "description": "Classic chicken biryani with tender pieces and aromatic rice",
      "category": "Non-Veg",
      "image": ""
    },
    {
      "id": 5,
      "name": "Mutton Biryani",
      "price": 300,
      "description": "Rich mutton biryani with succulent meat and flavorful rice",
      "category": "Non-Veg",
      "image": ""
    }
  ];

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>Test Menu - Farhana's Kitchen</h1>
      <p>This is a test page to verify menu items are displaying correctly.</p>
      
      <h2>Menu Items:</h2>
      {menuItems.map(item => (
        <div key={item.id} style={{ 
          border: '1px solid #ccc', 
          margin: '10px 0', 
          padding: '15px',
          borderRadius: '5px'
        }}>
          <h3>{item.name}</h3>
          <p><strong>Price:</strong> ₹{item.price}</p>
          <p><strong>Category:</strong> {item.category}</p>
          <p><strong>Description:</strong> {item.description}</p>
        </div>
      ))}
      
      <h2>Total Items: {menuItems.length}</h2>
    </div>
  );
};

export default TestMenu;