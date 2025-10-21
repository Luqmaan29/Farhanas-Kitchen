# 🍽️ Farhana's Kitchen

A modern, responsive cloud kitchen website with online ordering, payment integration, and WhatsApp notifications.

## 🌟 Features

- **📱 Responsive Design** - Works perfectly on mobile and desktop
- **🍽️ Complete Menu** - 176+ items (Veg & Non-Veg) with categories
- **🛒 Shopping Cart** - Add items with quantities
- **📅 Delivery Scheduling** - Choose date and time slots
- **💳 Payment Integration** - Google Pay/UPI integration
- **📱 WhatsApp Integration** - Automatic order forwarding
- **📄 PDF Menu Viewer** - View original PDF menus
- **🔍 Search & Filter** - Find items quickly

## 🚀 Quick Start

### Prerequisites
- Node.js (v14 or higher)
- npm

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Luqmaan29/Farhanas-Kitchen.git
   cd Farhanas-Kitchen
   ```

2. **Install dependencies**
   ```bash
   # Install backend dependencies
   cd backend
   npm install
   
   # Install frontend dependencies
   cd ../frontend
   npm install
   ```

3. **Run the application**
   ```bash
   # Terminal 1 - Start backend server
   cd backend
   node server.js
   
   # Terminal 2 - Start frontend server
   cd frontend
   npm start
   ```

4. **Open your browser**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:3001

## 📁 Project Structure

```
Farhanas-Kitchen/
├── backend/                 # Node.js/Express backend
│   ├── server.js           # Main server file
│   ├── menu.json           # Menu data
│   └── package.json        # Backend dependencies
├── frontend/               # React.js frontend
│   ├── public/             # Static files
│   │   ├── veg.pdf         # Veg menu PDF
│   │   └── nonveg.pdf      # Non-veg menu PDF
│   ├── src/                # React source code
│   │   ├── components/     # Reusable components
│   │   ├── pages/          # Page components
│   │   ├── hooks/          # Custom React hooks
│   │   ├── styles/         # CSS files
│   │   └── data/           # Data files
│   └── package.json        # Frontend dependencies
├── scripts/                # Utility scripts
│   └── convert_to_json.py  # PDF to JSON converter
└── README.md               # This file
```

## ⚙️ Configuration

### Update Your Details

1. **WhatsApp Number** (in `frontend/src/pages/Checkout.js`):
   ```javascript
   const WHATSAPP_NUMBER = '9739998398'; // Your WhatsApp number
   ```

2. **UPI ID** (in `frontend/src/pages/Checkout.js`):
   ```javascript
   const UPI_ID = 'salt20293@okhdfcbank'; // Your UPI ID
   ```

### Menu Management

- **Update Menu**: Edit `backend/menu.json`
- **Add PDFs**: Place new PDFs in `frontend/public/`
- **Convert PDFs**: Use `scripts/convert_to_json.py`

## 🌐 Deployment

### GitHub Pages (Frontend)
```bash
cd frontend
npm run deploy
```

### Render (Backend)
1. Connect your GitHub repository to Render
2. Deploy the backend folder
3. Update API URLs in frontend

## 🧪 Testing

1. **Local Testing**: http://localhost:3000
2. **Menu Loading**: Check if all 176 items load
3. **Cart Functionality**: Add/remove items
4. **Checkout Flow**: Test form validation
5. **Payment Integration**: Test Google Pay redirect
6. **WhatsApp Integration**: Verify order messages

## 📱 Mobile Features

- Responsive design for all screen sizes
- Touch-friendly interface
- Mobile-optimized PDF viewer
- Easy navigation

## 🔧 Troubleshooting

### Common Issues

1. **Port Already in Use**
   ```bash
   # Kill existing processes
   pkill -f "node server.js"
   pkill -f "react-scripts start"
   ```

2. **Menu Not Loading**
   - Check if backend is running on port 3001
   - Verify `backend/menu.json` exists
   - Check browser console for errors

3. **Payment Not Working**
   - Verify UPI ID is correct
   - Check if Google Pay is installed
   - Test with different browsers

## 📞 Support

For issues or questions:
- Check the browser console for errors
- Verify all dependencies are installed
- Ensure both servers are running

## 🎉 Features Overview

- ✅ **Complete Menu System** (176 items)
- ✅ **Shopping Cart** with quantities
- ✅ **Delivery Scheduling** (date & time)
- ✅ **Payment Integration** (Google Pay/UPI)
- ✅ **WhatsApp Notifications**
- ✅ **PDF Menu Viewer**
- ✅ **Search & Filter**
- ✅ **Mobile Responsive**
- ✅ **Modern UI/UX**

---

**Built with ❤️ for Farhana's Cloud Kitchen**