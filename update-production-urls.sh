#!/bin/bash

# Script to update API URLs for production deployment
# Run this after deploying backend to Render

echo "🔧 Updating API URLs for production..."

# Get the Render backend URL from user
echo "Enter your Render backend URL (e.g., https://your-app-name.onrender.com):"
read RENDER_URL

if [ -z "$RENDER_URL" ]; then
    echo "❌ No URL provided. Exiting."
    exit 1
fi

echo "📝 Updating frontend to use: $RENDER_URL"

# Update package.json homepage
cd frontend
sed -i '' "s|https://luqmaan29.github.io/Farhanas-Kitchen|https://luqmaan29.github.io/Farhanas-Kitchen|g" package.json

# Create environment file for production
cat > .env.production << EOF
REACT_APP_API_URL=$RENDER_URL
EOF

echo "✅ Configuration updated!"
echo "🚀 Now run: npm run deploy"
echo ""
echo "Your website will be available at:"
echo "Frontend: https://luqmaan29.github.io/Farhanas-Kitchen"
echo "Backend: $RENDER_URL"
