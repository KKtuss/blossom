# CanvAI - Troubleshooting Guide

## 🚨 Common Issues and Solutions

### 404 NOT_FOUND Error

If you're getting a `404: NOT_FOUND` error, here are the most common causes and solutions:

#### 1. **Incorrect URL**
- **Problem**: You might be accessing the wrong URL
- **Solution**: Make sure you're using the correct Vercel deployment URL
- **Format**: `https://your-project-name.vercel.app` or `https://your-custom-domain.com`

#### 2. **Deployment Not Complete**
- **Problem**: The deployment might still be in progress
- **Solution**: 
  - Wait 2-3 minutes for deployment to complete
  - Check Vercel dashboard for deployment status
  - Look for the green "Ready" status

#### 3. **Environment Variables Missing**
- **Problem**: Required environment variables not set
- **Solution**:
  - Go to Vercel dashboard → Your Project → Settings → Environment Variables
  - Add `CLAUDE_API_KEY` with your Claude API key
  - Redeploy the project

#### 4. **Build Errors**
- **Problem**: Build failed during deployment
- **Solution**:
  - Check Vercel dashboard for build logs
  - Look for error messages in the Functions tab
  - Common issues: missing dependencies, syntax errors

#### 5. **Routing Configuration Issues**
- **Problem**: Vercel routing not configured correctly
- **Solution**: The `vercel.json` file should be in your project root with correct routing

## 🔧 Step-by-Step Debugging

### Step 1: Check Deployment Status
1. Go to [vercel.com](https://vercel.com)
2. Navigate to your project
3. Check the "Deployments" tab
4. Look for the latest deployment status

### Step 2: Test API Endpoints
Try accessing these URLs directly:
- `https://your-app.vercel.app/api/health`
- Should return: `{"status":"OK","message":"CanvAI Backend Server is running"}`

### Step 3: Check Environment Variables
1. Go to Project Settings → Environment Variables
2. Ensure `CLAUDE_API_KEY` is set
3. Ensure `NODE_ENV` is set to `production`

### Step 4: Check Build Logs
1. Go to the Functions tab in Vercel dashboard
2. Look for any error messages
3. Check the Runtime Logs for runtime errors

### Step 5: Test Locally
```bash
# Install dependencies
npm install

# Test locally
npm start

# Visit http://localhost:3001
```

## 🛠️ Quick Fixes

### Fix 1: Redeploy with Correct Configuration
```bash
# If using Vercel CLI
vercel --prod

# Or push to GitHub (if connected)
git add .
git commit -m "Fix deployment configuration"
git push origin main
```

### Fix 2: Update Environment Variables
1. Vercel Dashboard → Project → Settings → Environment Variables
2. Add/Update:
   - `CLAUDE_API_KEY`: Your Claude API key
   - `NODE_ENV`: `production`
3. Redeploy

### Fix 3: Check File Structure
Ensure your project has these files in the root:
```
canvai/
├── index.html
├── script.js
├── styles.css
├── server.js
├── package.json
├── vercel.json
└── api/
    ├── generate-art.js
    └── health.js
```

## 🔍 Advanced Debugging

### Check Function Logs
1. Vercel Dashboard → Functions tab
2. Click on `server.js`
3. Check "Runtime Logs" for errors

### Test API Directly
```bash
# Test health endpoint
curl https://your-app.vercel.app/api/health

# Test with your API key
curl -X POST https://your-app.vercel.app/api/generate-art \
  -H "Content-Type: application/json" \
  -d '{"prompt":"test","apiKey":"your-api-key"}'
```

### Check Browser Console
1. Open your deployed app
2. Press F12 to open Developer Tools
3. Check Console tab for JavaScript errors
4. Check Network tab for failed requests

## 📞 Getting Help

### Vercel Support
- [Vercel Documentation](https://vercel.com/docs)
- [Vercel Community](https://github.com/vercel/vercel/discussions)

### Claude API Support
- [Claude API Documentation](https://docs.anthropic.com/)
- [Anthropic Console](https://console.anthropic.com/)

### Project Issues
- Create an issue on GitHub
- Include:
  - Your Vercel deployment URL
  - Error messages
  - Browser console logs
  - Steps to reproduce

## ✅ Success Checklist

Your deployment is working if:
- [ ] `https://your-app.vercel.app` loads the CanvAI interface
- [ ] `https://your-app.vercel.app/api/health` returns OK status
- [ ] You can generate artworks with a valid API key
- [ ] Gallery displays generated artworks
- [ ] No console errors in browser

## 🔄 Common Solutions Summary

| Problem | Solution |
|---------|----------|
| 404 Error | Check URL, wait for deployment, verify routing |
| API Not Working | Check environment variables, test endpoints |
| Build Fails | Check dependencies, fix syntax errors |
| Static Files Not Loading | Verify file structure, check routing |
| CORS Errors | Check CORS configuration in server |

Remember: Most 404 errors are caused by deployment issues or incorrect URLs. Start with checking the deployment status and URL! 🚀
