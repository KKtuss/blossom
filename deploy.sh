#!/bin/bash

# CanvAI Deployment Script for Vercel

echo "🚀 Preparing CanvAI for Vercel deployment..."

# Check if Vercel CLI is installed
if ! command -v vercel &> /dev/null; then
    echo "❌ Vercel CLI not found. Installing..."
    npm install -g vercel
fi

# Check if user is logged in to Vercel
if ! vercel whoami &> /dev/null; then
    echo "🔐 Please login to Vercel:"
    vercel login
fi

# Deploy to Vercel
echo "📦 Deploying to Vercel..."
vercel --prod

# Prompt for environment variables
echo ""
echo "🔧 Setting up environment variables..."
echo "Please enter your Claude API key:"
read -s api_key

if [ ! -z "$api_key" ]; then
    vercel env add CLAUDE_API_KEY production
    echo "✅ Environment variable added!"
else
    echo "⚠️  Skipping API key setup. You can add it later in Vercel dashboard."
fi

echo ""
echo "🎉 Deployment complete!"
echo "Visit your deployed app at the URL shown above."
echo ""
echo "📋 Next steps:"
echo "1. Test your deployment"
echo "2. Set up custom domain (optional)"
echo "3. Monitor performance in Vercel dashboard"
echo ""
echo "Happy creating! 🎨"
