@echo off
echo 🚀 Deploying CanvAI to Vercel...
echo.

echo 📋 Step 1: Checking Vercel CLI...
vercel --version >nul 2>&1
if errorlevel 1 (
    echo ❌ Vercel CLI not found. Installing...
    npm install -g vercel
    if errorlevel 1 (
        echo ❌ Failed to install Vercel CLI
        pause
        exit /b 1
    )
) else (
    echo ✅ Vercel CLI found
)

echo.
echo 📋 Step 2: Deploying to Vercel...
vercel --prod

echo.
echo 📋 Step 3: Deployment Complete!
echo.
echo 🔑 IMPORTANT: Don't forget to set your CLAUDE_API_KEY in Vercel dashboard:
echo    1. Go to your project on vercel.com/dashboard
echo    2. Settings → Environment Variables
echo    3. Add CLAUDE_API_KEY with your actual API key
echo    4. Redeploy your project
echo.
echo 🎨 Your CanvAI app should now be live on Vercel!
pause
