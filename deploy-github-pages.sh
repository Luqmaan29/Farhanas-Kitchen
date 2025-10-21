#!/bin/bash

# GitHub Pages Deployment Script for Cloud Kitchen
echo "🚀 Cloud Kitchen - GitHub Pages Deployment"
echo "=========================================="

# Check if we're in the right directory
if [ ! -f "frontend/package.json" ]; then
    echo "❌ Error: Please run this script from the project root directory"
    exit 1
fi

# Install gh-pages if not already installed
echo "📦 Installing gh-pages..."
cd frontend
if ! npm list gh-pages > /dev/null 2>&1; then
    npm install --save-dev gh-pages
fi

# Build the project
echo "🔨 Building frontend..."
npm run build

# Deploy to GitHub Pages
echo "🚀 Deploying to GitHub Pages..."
npm run deploy

echo ""
echo "✅ Frontend deployed to GitHub Pages!"
echo ""
echo "📋 Next Steps:"
echo "1. Deploy backend to Render/Railway"
echo "2. Update API URLs in frontend"
echo "3. Test your live website!"
echo ""
echo "🌐 Your website will be available at:"
echo "https://YOUR_USERNAME.github.io/cloud-kitchen"
echo ""
echo "📖 See GITHUB_PAGES_GUIDE.md for detailed instructions"
