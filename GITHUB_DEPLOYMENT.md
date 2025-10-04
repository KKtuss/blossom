# GitHub + Vercel Deployment Guide

## 🚀 Deploy from GitHub Repository

This is the **recommended approach** for deploying to Vercel. It's more reliable, secure, and allows for easy updates.

## Step 1: Create GitHub Repository

### Option A: Using GitHub CLI (Recommended)
```bash
# Initialize git repository
git init

# Add all files
git add .

# Make initial commit
git commit -m "Initial commit: CanvAI - Claude Art Gallery"

# Create GitHub repository and push
gh repo create canvai --public --push
```

### Option B: Using GitHub Website
1. **Go to GitHub.com** and click "New repository"
2. **Repository name:** `canvai` (or your preferred name)
3. **Make it Public** (required for free Vercel deployment)
4. **Don't initialize** with README (you already have files)
5. **Click "Create repository"**

6. **Then run these commands in your project folder:**
```bash
git init
git add .
git commit -m "Initial commit: CanvAI - Claude Art Gallery"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/canvai.git
git push -u origin main
```

## Step 2: Deploy to Vercel from GitHub

### Option A: Vercel Dashboard (Easiest)
1. **Go to [vercel.com](https://vercel.com)**
2. **Click "New Project"**
3. **Import Git Repository:**
   - Select your GitHub account
   - Find and select your `canvai` repository
   - Click "Import"

4. **Configure Project:**
   - **Project Name:** `canvai` (or your preferred name)
   - **Framework Preset:** Other
   - **Root Directory:** `./` (default)
   - **Build Command:** Leave empty (no build needed)
   - **Output Directory:** Leave empty
   - **Install Command:** `npm install`

5. **Add Environment Variable:**
   - **Name:** `CLAUDE_API_KEY`
   - **Value:** Your actual Claude API key (starts with `sk-ant-api03-...`)
   - **Environment:** Production, Preview, Development (check all)

6. **Click "Deploy"**

### Option B: Vercel CLI
```bash
# Install Vercel CLI
npm install -g vercel

# Login to Vercel
vercel login

# Deploy and link to GitHub
vercel --prod

# Follow prompts:
# - Link to existing project? No
# - Project name: canvai
# - Directory: ./
# - Override settings? No
```

## Step 3: Set Environment Variables

**CRITICAL:** Your API key must be set in Vercel, not in the code.

### In Vercel Dashboard:
1. **Go to your project** on vercel.com/dashboard
2. **Settings** → **Environment Variables**
3. **Add New:**
   - **Name:** `CLAUDE_API_KEY`
   - **Value:** Your actual Claude API key (starts with `sk-ant-api03-...`)
   - **Environments:** Production ✅ Preview ✅ Development ✅
4. **Save**

### Redeploy:
- Go to **Deployments** tab
- Click **⋯** on latest deployment
- Click **Redeploy**

## Step 4: Test Your Deployment

1. **Visit your Vercel URL** (e.g., `https://canvai.vercel.app`)
2. **Test artwork generation** - should work without errors
3. **Check gallery** - should display previous artworks
4. **Test Q&A** - should work with Claude

## 🔄 Making Updates

### To update your deployed app:
1. **Make changes locally**
2. **Commit and push to GitHub:**
   ```bash
   git add .
   git commit -m "Update: description of changes"
   git push origin main
   ```
3. **Vercel automatically redeploys** when you push to GitHub!

## 🔒 Security Features

### ✅ What's Protected:
- **API Key:** Never committed to GitHub (in `.gitignore`)
- **Environment Variables:** Securely stored in Vercel
- **CORS:** Handled automatically by same-domain requests
- **HTTPS:** Automatic SSL certificate

### ✅ What's Public:
- **Source Code:** Public repository (required for free Vercel)
- **Static Assets:** Images, fonts, CSS, JS
- **No Sensitive Data:** API keys and secrets are safe

## 📁 Repository Structure

Your GitHub repository will contain:
```
canvai/
├── package.json          # Dependencies
├── server.js             # Main server file
├── vercel.json           # Vercel configuration
├── index.html            # Main HTML file
├── script.js             # Frontend JavaScript
├── styles.css            # Styling
├── config.js             # API key (LOCAL ONLY - not in GitHub)
├── .gitignore            # Git ignore rules
├── README.md             # Documentation
├── VERCEL_DEPLOYMENT.md  # Deployment guide
├── GITHUB_DEPLOYMENT.md  # This guide
├── deploy-vercel.bat     # Windows deployment script
├── Fonts/                # Custom fonts
├── blossompix.png        # Logo
├── alibannor.png         # Logo
├── twitter button.png    # Social button
└── Github button.png     # Social button
```

## 🎯 Benefits of GitHub Deployment

### ✅ Advantages:
- **Automatic Deployments:** Push to GitHub = auto-deploy to Vercel
- **Version Control:** Track all changes and rollback if needed
- **Collaboration:** Others can contribute or fork your project
- **Reliability:** More stable than CLI deployments
- **Free Hosting:** Vercel free tier with GitHub integration
- **Custom Domain:** Easy to add your own domain later

### ✅ Workflow:
1. **Develop locally:** `npm start` → `http://localhost:3001`
2. **Test everything:** Make sure it works locally
3. **Commit changes:** `git add . && git commit -m "message"`
4. **Push to GitHub:** `git push origin main`
5. **Auto-deploy:** Vercel automatically deploys your changes
6. **Live updates:** Your app is updated in seconds

## 🚨 Important Notes

### ⚠️ API Key Security:
- **Never commit** `config.js` to GitHub (already in `.gitignore`)
- **Never commit** actual API keys to any files
- **Always use** Vercel environment variables for production
- **Local development** still uses `config.js` (safe for local use)
- **GitHub Secret Scanning** will detect and flag any API keys in your code

### ⚠️ Repository Requirements:
- **Must be public** for free Vercel deployment
- **Must have** `package.json` and `vercel.json`
- **Must have** `server.js` as main entry point

### ⚠️ Troubleshooting 404 Errors:
If you see 404 errors for static files (CSS, JS, images):
1. **Check file names** - ensure no spaces in filenames
2. **Verify all files** are committed to GitHub
3. **Redeploy** - sometimes Vercel needs a fresh deployment
4. **Check console** - look for specific file paths causing issues

## 🎉 You're Done!

Once deployed, you'll have:
- ✅ **Live website** at your Vercel URL
- ✅ **Automatic deployments** from GitHub
- ✅ **Secure API key** handling
- ✅ **Local development** unchanged
- ✅ **Professional hosting** with SSL

Your CanvAI app will be live and automatically update whenever you push changes to GitHub!
