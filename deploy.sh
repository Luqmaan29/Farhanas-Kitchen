#!/bin/bash

# Cloud Kitchen Deployment Script
echo "🚀 Cloud Kitchen Deployment Script"
echo "=================================="

# Check if git is initialized
if [ ! -d ".git" ]; then
    echo "📁 Initializing Git repository..."
    git init
    git branch -M main
fi

# Add all files
echo "📝 Adding files to Git..."
git add .

# Commit changes
echo "💾 Committing changes..."
git commit -m "Deploy Cloud Kitchen Website - $(date)"

# Check if remote exists
if ! git remote get-url origin > /dev/null 2>&1; then
    echo "🔗 Please add your GitHub repository URL:"
    echo "git remote add origin https://github.com/YOUR_USERNAME/cloud-kitchen.git"
    echo "git push -u origin main"
else
    echo "🚀 Pushing to GitHub..."
    git push origin main
fi

echo ""
echo "✅ Files ready for deployment!"
echo ""
echo "📋 Next Steps:"
echo "1. Go to https://vercel.com and deploy frontend"
echo "2. Go to https://render.com and deploy backend"
echo "3. Update API URLs in frontend"
echo "4. Test your live website!"
echo ""
echo "📖 See DEPLOYMENT_GUIDE.md for detailed instructions"
