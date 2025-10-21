# Cloud Kitchen Website - Setup & Deployment Guide

## 🚀 Quick Start (Local Development)

### Prerequisites
- Node.js (v16 or higher)
- Python 3.x
- Your PDF menu files (`veg.pdf` and `nonveg.pdf`)

### 1. Convert Your PDF Menus
```bash
# Install Python dependencies
pip3 install PyPDF2

# Convert PDFs to JSON
python3 scripts/convert_to_json.py
```

### 2. Install Dependencies
```bash
# Backend
cd backend
npm install

# Frontend (in new terminal)
cd frontend
npm install
```

### 3. Configure Your Details
Edit `frontend/src/pages/Checkout.js`:
```javascript
const WHATSAPP_NUMBER = '919876543210'; // Your WhatsApp number (no + sign)
const UPI_ID = 'yourname@paytm';        // Your UPI ID
```

### 4. Add Your QR Code
Replace `frontend/src/assets/qr_code.png` with your actual Google Pay/UPI QR code.

### 5. Run the Application
```bash
# Terminal 1 - Backend
cd backend
npm start

# Terminal 2 - Frontend
cd frontend
npm start
```

Visit `http://localhost:3000` to see your website!

---

## 🌐 Deployment Options

### Option 1: Vercel + Render (Recommended)

#### Frontend (Vercel)
1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com) and sign up
3. Click "New Project" and import your GitHub repo
4. Configure build settings:
   - **Framework Preset**: Create React App
   - **Root Directory**: `frontend`
   - **Build Command**: `npm run build`
   - **Output Directory**: `build`
5. Deploy!

#### Backend (Render)
1. Go to [render.com](https://render.com) and sign up
2. Click "New" → "Web Service"
3. Connect your GitHub repo
4. Configure settings:
   - **Root Directory**: `backend`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Environment**: Node
5. Deploy!

#### Update Frontend for Production
Update `frontend/package.json`:
```json
{
  "proxy": "https://your-backend-url.onrender.com"
}
```

### Option 2: Netlify + Railway

#### Frontend (Netlify)
1. Push to GitHub
2. Go to [netlify.com](https://netlify.com)
3. Connect GitHub repo
4. Build settings:
   - **Base directory**: `frontend`
   - **Build command**: `npm run build`
   - **Publish directory**: `frontend/build`

#### Backend (Railway)
1. Go to [railway.app](https://railway.app)
2. Connect GitHub repo
3. Select `backend` folder
4. Deploy!

### Option 3: Heroku (Full Stack)

#### Create Heroku Apps
```bash
# Install Heroku CLI
# Create two apps
heroku create your-cloud-kitchen-frontend
heroku create your-cloud-kitchen-backend

# Backend deployment
cd backend
heroku git:remote -a your-cloud-kitchen-backend
git add .
git commit -m "Deploy backend"
git push heroku main

# Frontend deployment
cd frontend
heroku git:remote -a your-cloud-kitchen-frontend
git add .
git commit -m "Deploy frontend"
git push heroku main
```

---

## ⚙️ Configuration Checklist

Before going live, ensure you've completed:

### ✅ Basic Setup
- [ ] Converted PDF menus to JSON
- [ ] Updated WhatsApp number in `Checkout.js`
- [ ] Updated UPI ID in `Checkout.js`
- [ ] Added your actual QR code image
- [ ] Tested the complete order flow locally

### ✅ Customization
- [ ] Updated colors/branding in CSS variables
- [ ] Added your restaurant name/logo
- [ ] Customized menu descriptions
- [ ] Tested on mobile devices

### ✅ Production Deployment
- [ ] Set up production environment variables
- [ ] Updated API endpoints for production
- [ ] Tested WhatsApp integration
- [ ] Verified payment flow
- [ ] Set up domain (optional)

---

## 🔧 Environment Variables

### Backend (.env)
```env
PORT=5000
NODE_ENV=production
```

### Frontend (.env)
```env
REACT_APP_API_URL=https://your-backend-url.onrender.com
```

---

## 📱 Mobile Optimization

The website is fully responsive and optimized for mobile:
- Touch-friendly buttons and interactions
- Mobile-first design approach
- Optimized images and loading
- WhatsApp integration works on mobile browsers

---

## 🛠️ Troubleshooting

### Common Issues

#### Menu Not Loading
- Check if `menu.json` exists in `frontend/src/data/`
- Verify PDF conversion worked correctly
- Check browser console for API errors

#### WhatsApp Not Opening
- Ensure WhatsApp number format: `919876543210` (no + sign)
- Test the wa.me link manually
- Check if WhatsApp is installed on device

#### Payment Issues
- Verify UPI ID format
- Ensure QR code image is accessible
- Test payment flow on mobile device

#### Deployment Issues
- Check build logs for errors
- Verify all dependencies are installed
- Ensure environment variables are set

### Getting Help
1. Check browser console for errors
2. Verify all configuration steps
3. Test locally before deploying
4. Check deployment platform logs

---

## 🎉 Success!

Once deployed, your cloud kitchen website will:
- Display your menu dynamically
- Handle orders with cart functionality
- Process payments via UPI/QR code
- Send orders directly to your WhatsApp
- Work perfectly on all devices

Your customers can now order food online with a professional, modern experience!

---

## 📞 Support

For additional help or customization requests, refer to the main README.md file or check the code comments for detailed explanations of each component.
