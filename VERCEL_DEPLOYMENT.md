# Vercel Deployment Guide

## Quick Deploy

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/your-username/canvai)

## Manual Deployment

### 1. Prepare Your Repository

1. **Commit all your changes:**
   ```bash
   git add .
   git commit -m "Ready for Vercel deployment"
   git push origin main
   ```

### 2. Deploy to Vercel

1. **Install Vercel CLI (if not already installed):**
   ```bash
   npm install -g vercel
   ```

2. **Login to Vercel:**
   ```bash
   vercel login
   ```

3. **Deploy your project:**
   ```bash
   vercel
   ```

4. **Follow the prompts:**
   - Link to existing project? **No**
   - Project name: **canvai** (or your preferred name)
   - Directory: **./** (current directory)
   - Override settings? **No**

### 3. Set Environment Variables

**CRITICAL STEP:** You must set your Claude API key as an environment variable.

1. **Go to your Vercel dashboard:**
   - Visit [vercel.com/dashboard](https://vercel.com/dashboard)
   - Click on your project

2. **Add Environment Variable:**
   - Go to **Settings** → **Environment Variables**
   - Click **Add New**
   - **Name:** `CLAUDE_API_KEY`
   - **Value:** Your actual Claude API key (starts with `sk-ant-api03-...`)
   - **Environment:** Production, Preview, Development (check all)
   - Click **Save**

3. **Redeploy:**
   - Go to **Deployments** tab
   - Click the **⋯** menu on your latest deployment
   - Click **Redeploy**

### 4. Test Your Deployment

1. **Visit your Vercel URL** (provided after deployment)
2. **Test artwork generation** - it should work without errors
3. **Check the console** - no CORS or API errors should appear

## How It Works

### Local Development
- **API Endpoint:** `http://localhost:3001/api/generate-art`
- **API Key:** From `config.js` file
- **Server:** Local Node.js server running on port 3001

### Vercel Production
- **API Endpoint:** `/api/generate-art` (same domain)
- **API Key:** From environment variable `CLAUDE_API_KEY`
- **Server:** Vercel serverless functions

### Auto-Detection
The app automatically detects the environment:
- **localhost/127.0.0.1:** Uses local server
- **Any other domain:** Uses Vercel serverless functions

## Troubleshooting

### 401 Unauthorized Error
- **Cause:** API key not set in Vercel environment variables
- **Fix:** Set `CLAUDE_API_KEY` in Vercel dashboard and redeploy

### CORS Errors
- **Cause:** Frontend trying to call wrong endpoint
- **Fix:** The app auto-detects environment, but check console for endpoint being used

### 404 Not Found
- **Cause:** Vercel routing issue
- **Fix:** Ensure `vercel.json` is properly configured

### Artworks Not Loading
- **Cause:** Gallery format compatibility
- **Fix:** Already handled in the code - should work automatically

## Files Needed for Deployment

### Required Files
- ✅ `package.json` - Dependencies and scripts
- ✅ `server.js` - Main server file
- ✅ `vercel.json` - Vercel configuration
- ✅ `index.html` - Main HTML file
- ✅ `script.js` - Frontend JavaScript
- ✅ `styles.css` - Styling
- ✅ `config.js` - API key configuration (for local dev)

### Static Assets
- ✅ `blossompix.png` - Logo
- ✅ `alibannor.png` - Logo
- ✅ `twitter button.png` - Social button
- ✅ `Github button.png` - Social button
- ✅ `Fonts/QuanSlim/` - Custom fonts

### Optional Files
- ✅ `README.md` - Documentation
- ✅ `DEPLOYMENT.md` - Deployment instructions
- ✅ `.gitignore` - Git ignore rules

## Environment Variables Reference

| Variable | Required | Description | Example |
|----------|----------|-------------|---------|
| `CLAUDE_API_KEY` | ✅ Yes | Your Claude API key from Anthropic | `sk-ant-api03-...` |
| `NODE_ENV` | Auto-set | Environment type | `production` |

## Security Notes

- ✅ **API Key:** Never commit your real API key to Git
- ✅ **Environment Variables:** Use Vercel's secure environment variable system
- ✅ **CORS:** Handled automatically by same-domain requests on Vercel
- ✅ **Rate Limiting:** Handled by your Claude API key limits

## Local Development After Deployment

Your local development setup remains **completely unchanged**:

1. **Run locally:** `npm start`
2. **Visit:** `http://localhost:3001`
3. **API calls:** Automatically use local server
4. **No conflicts:** Vercel deployment doesn't affect local development

The beauty of this setup is that you can continue developing locally exactly as before, while having a production deployment that works seamlessly on Vercel!
