// Configuration Template for Cloud Kitchen Website
// Copy this file to config.js and update with your details

export const CONFIG = {
  // WhatsApp Configuration
  WHATSAPP_NUMBER: '919876543210', // Your WhatsApp number (no + sign, include country code)
  
  // Payment Configuration
  UPI_ID: 'yourname@paytm', // Your UPI ID (e.g., yourname@paytm, yourname@ybl, etc.)
  
  // Restaurant Information
  RESTAURANT_NAME: 'Cloud Kitchen',
  RESTAURANT_TAGLINE: 'Delicious Food Delivered Fresh',
  
  // Contact Information
  CONTACT_PHONE: '+91 98765 43210',
  CONTACT_EMAIL: 'contact@cloudkitchen.com',
  
  // Delivery Information
  DELIVERY_TIME: '30-45 minutes',
  DELIVERY_CHARGES: 0, // Set to 0 for free delivery
  
  // Social Media (optional)
  INSTAGRAM: 'https://instagram.com/yourcloudkitchen',
  FACEBOOK: 'https://facebook.com/yourcloudkitchen',
  
  // Colors (optional - you can also edit CSS variables)
  PRIMARY_COLOR: '#dc2626',
  SECONDARY_COLOR: '#ea580c',
  
  // Features
  FEATURES: {
    ENABLE_CART: true,
    ENABLE_SEARCH: true,
    ENABLE_CATEGORIES: true,
    ENABLE_WHATSAPP: true,
    ENABLE_UPI_PAYMENT: true,
  }
};

// Example usage in your components:
// import { CONFIG } from './config';
// const whatsappUrl = `https://wa.me/${CONFIG.WHATSAPP_NUMBER}?text=${message}`;
