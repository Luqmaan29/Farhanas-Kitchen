#!/bin/bash

# Cloud Kitchen Website Setup Script
echo "🍱 Cloud Kitchen Website Setup"
echo "=============================="

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js first."
    echo "   Visit: https://nodejs.org/"
    exit 1
fi

# Check if Python is installed
if ! command -v python3 &> /dev/null; then
    echo "❌ Python 3 is not installed. Please install Python 3 first."
    echo "   Visit: https://python.org/"
    exit 1
fi

echo "✅ Node.js and Python 3 are installed"

# Install Python dependencies
echo "📦 Installing Python dependencies..."
pip3 install PyPDF2

# Convert PDF menus to JSON
echo "🔄 Converting PDF menus to JSON..."
python3 scripts/convert_to_json.py

# Install backend dependencies
echo "📦 Installing backend dependencies..."
cd backend
npm install
cd ..

# Install frontend dependencies
echo "📦 Installing frontend dependencies..."
cd frontend
npm install
cd ..

echo ""
echo "🎉 Setup complete!"
echo ""
echo "📋 Next steps:"
echo "1. Edit frontend/src/pages/Checkout.js and update:"
echo "   - WHATSAPP_NUMBER (your WhatsApp number)"
echo "   - UPI_ID (your UPI ID)"
echo ""
echo "2. Add your QR code image to frontend/src/assets/qr_code.png"
echo ""
echo "3. Start the application:"
echo "   Terminal 1: cd backend && npm start"
echo "   Terminal 2: cd frontend && npm start"
echo ""
echo "4. Visit http://localhost:3000 to see your website!"
echo ""
echo "📖 For deployment instructions, see DEPLOYMENT.md"
