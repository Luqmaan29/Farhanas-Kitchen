#!/bin/bash

# Script to update API URLs for production deployment
echo "🔧 Updating API URLs for Production"

# Check if backend URL is provided
if [ -z "$1" ]; then
    echo "❌ Please provide your backend URL as an argument"
    echo "Usage: ./update-api-urls.sh https://your-backend-url.onrender.com"
    echo ""
    echo "📋 Steps to get your backend URL:"
    echo "1. Deploy backend to Render"
    echo "2. Copy the URL from Render dashboard"
    echo "3. Run: ./update-api-urls.sh YOUR_BACKEND_URL"
    exit 1
fi

BACKEND_URL="$1"
echo "🔄 Updating API URLs to: $BACKEND_URL"

# Update Menu.js
if [ -f "src/pages/Menu.js" ]; then
    sed -i '' "s|fetch('/api/menu')|fetch('$BACKEND_URL/api/menu')|g" src/pages/Menu.js
    echo "✅ Updated Menu.js"
fi

# Update TestMenu.js
if [ -f "src/pages/TestMenu.js" ]; then
    sed -i '' "s|fetch('/api/menu')|fetch('$BACKEND_URL/api/menu')|g" src/pages/TestMenu.js
    echo "✅ Updated TestMenu.js"
fi

# Update Checkout.js
if [ -f "src/pages/Checkout.js" ]; then
    sed -i '' "s|fetch('/api/order'|fetch('$BACKEND_URL/api/order'|g" src/pages/Checkout.js
    echo "✅ Updated Checkout.js"
fi

echo ""
echo "🎉 API URLs updated successfully!"
echo "📝 Next steps:"
echo "1. Commit and push changes:"
echo "   git add ."
echo "   git commit -m 'Update API URLs for production'"
echo "   git push origin main"
echo "2. Redeploy frontend:"
echo "   npm run deploy"
echo ""
echo "🌐 Your website will be live at:"
echo "https://luqmaan29.github.io/Farhanas-Kitchen"
