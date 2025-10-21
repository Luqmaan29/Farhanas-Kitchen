# Cloud Kitchen Website

A modern, responsive food ordering website for cloud kitchens with WhatsApp integration and UPI payments.

## 🚀 Quick Start

### Prerequisites
- Node.js 16+ installed
- npm or yarn package manager

### Installation
```bash
# Clone the repository
git clone https://github.com/YOUR_USERNAME/cloud-kitchen.git
cd cloud-kitchen

# Install all dependencies
npm run install-all

# Start development servers
npm run dev
```

### Development
- Frontend: http://localhost:3000
- Backend: http://localhost:3001

## 📱 Features

- **🍽️ Complete Menu:** 176+ items (Veg & Non-Veg)
- **🛒 Shopping Cart:** Add/remove items with quantities
- **💳 UPI Payments:** Direct Google Pay integration
- **📱 WhatsApp Orders:** Automatic order forwarding
- **📄 PDF Menus:** View original PDF menus
- **📱 Mobile Responsive:** Works on all devices
- **🎨 Modern UI:** Beautiful, food-focused design

## 🛠️ Tech Stack

- **Frontend:** React.js, Framer Motion, CSS3
- **Backend:** Node.js, Express.js
- **Payment:** UPI/Google Pay integration
- **Communication:** WhatsApp API
- **Deployment:** Vercel + Render

## 📁 Project Structure

```
cloud-kitchen/
├── frontend/           # React frontend
│   ├── src/
│   │   ├── components/ # Reusable components
│   │   ├── pages/      # Page components
│   │   ├── hooks/      # Custom React hooks
│   │   ├── styles/     # CSS files
│   │   └── data/       # Menu data
├── backend/            # Node.js backend
│   ├── server.js       # Express server
│   └── package.json    # Backend dependencies
├── scripts/            # Utility scripts
└── public/             # Static files
```

## 🔧 Configuration

### Update Your Details
1. **WhatsApp Number:** Update in `frontend/src/pages/Checkout.js` and `PaymentReturn.js`
2. **UPI ID:** Update in `frontend/src/pages/Checkout.js`
3. **QR Code:** Replace `frontend/src/assets/qr_code.png`

### Environment Variables
Create `.env` files for production:

**Frontend/.env:**
```
REACT_APP_API_URL=https://your-backend-url.com
```

**Backend/.env:**
```
NODE_ENV=production
PORT=3001
```

## 🚀 Deployment

### Free Hosting (Recommended)
1. **Frontend:** Deploy to Vercel
2. **Backend:** Deploy to Render
3. **Domain:** Connect custom domain (optional)

### Paid Hosting
- **DigitalOcean:** $5/month droplet
- **AWS:** Pay-as-you-scale
- **Heroku:** $7/month

See `DEPLOYMENT_GUIDE.md` for detailed instructions.

## 📱 Mobile App

The website is PWA-ready and can be installed as a mobile app:
1. Open website on mobile
2. Tap "Add to Home Screen"
3. Use like a native app

## 🔒 Security

- HTTPS enabled on all hosting platforms
- Input validation and sanitization
- CORS protection
- Environment variable protection

## 📊 Analytics

- Google Analytics integration ready
- Built-in Vercel analytics
- Custom order tracking

## 🆘 Support

- **Documentation:** See `DEPLOYMENT_GUIDE.md`
- **Issues:** Create GitHub issue
- **Email:** your-email@example.com

## 📄 License

MIT License - feel free to use for your cloud kitchen!

## 🙏 Credits

- React.js team for the amazing framework
- Framer Motion for smooth animations
- Express.js for the backend
- All open source contributors

---

**Made with ❤️ for Cloud Kitchens**