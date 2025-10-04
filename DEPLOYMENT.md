# CanvAI - Vercel Deployment Guide

## 🚀 Quick Deploy to Vercel

### Prerequisites
- [Vercel account](https://vercel.com)
- [Claude API key](https://console.anthropic.com/)

### Method 1: Deploy with Vercel CLI

1. **Install Vercel CLI**
   ```bash
   npm i -g vercel
   ```

2. **Login to Vercel**
   ```bash
   vercel login
   ```

3. **Deploy**
   ```bash
   vercel
   ```

4. **Set Environment Variables**
   ```bash
   vercel env add CLAUDE_API_KEY
   # Enter your Claude API key when prompted
   ```

### Method 2: Deploy with GitHub Integration

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Prepare for Vercel deployment"
   git push origin main
   ```

2. **Connect to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository
   - Set environment variables in Vercel dashboard

## 🔧 Environment Variables

Set these in your Vercel dashboard:

| Variable | Description | Required |
|----------|-------------|----------|
| `CLAUDE_API_KEY` | Your Claude API key from Anthropic | ✅ Yes |
| `NODE_ENV` | Set to `production` | ✅ Yes |

## 📁 Project Structure

```
canvai/
├── server.js          # Main Express server
├── index.html         # Frontend application
├── script.js          # Client-side JavaScript
├── styles.css         # CSS styles
├── vercel.json        # Vercel configuration
├── package.json       # Node.js dependencies
└── env.example        # Environment variables template
```

## 🌐 Custom Domain (Optional)

1. In Vercel dashboard, go to your project
2. Click "Domains"
3. Add your custom domain
4. Configure DNS records as instructed

## 🔍 Troubleshooting

### Common Issues

**1. API Key Not Working**
- Ensure `CLAUDE_API_KEY` is set in Vercel environment variables
- Verify the API key is valid and has sufficient credits

**2. Static Files Not Loading**
- Check that all static files (HTML, CSS, JS) are in the root directory
- Verify `vercel.json` routing configuration

**3. CORS Issues**
- The server includes CORS middleware for cross-origin requests
- Check browser console for specific error messages

### Debug Mode

To debug locally with production settings:
```bash
NODE_ENV=production npm start
```

## 📊 Performance Optimization

- **Static Assets**: All frontend files are served as static assets
- **API Routes**: Backend API routes are serverless functions
- **Caching**: Vercel automatically caches static assets
- **CDN**: Global CDN distribution for fast loading

## 🔒 Security Notes

- API keys are stored as environment variables (not in code)
- CORS is configured for cross-origin requests
- Input validation on API endpoints
- Rate limiting handled by Vercel

## 📈 Monitoring

Vercel provides built-in monitoring:
- Function execution logs
- Performance metrics
- Error tracking
- Analytics dashboard

## 🔄 Updates

To update your deployment:
```bash
git add .
git commit -m "Update CanvAI"
git push origin main
```

Vercel will automatically redeploy on every push to main branch.

## 📞 Support

- [Vercel Documentation](https://vercel.com/docs)
- [Claude API Documentation](https://docs.anthropic.com/)
- [Project Issues](https://github.com/your-repo/canvai/issues)
