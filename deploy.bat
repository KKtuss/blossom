@echo off
echo 🚀 Preparing CanvAI for Vercel deployment...

REM Check if Vercel CLI is installed
where vercel >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo ❌ Vercel CLI not found. Installing...
    npm install -g vercel
)

REM Check if user is logged in to Vercel
vercel whoami >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo 🔐 Please login to Vercel:
    vercel login
)

REM Deploy to Vercel
echo 📦 Deploying to Vercel...
vercel --prod

echo.
echo 🔧 Setting up environment variables...
echo Please enter your Claude API key:
set /p api_key=

if not "%api_key%"=="" (
    echo %api_key% | vercel env add CLAUDE_API_KEY production
    echo ✅ Environment variable added!
) else (
    echo ⚠️  Skipping API key setup. You can add it later in Vercel dashboard.
)

echo.
echo 🎉 Deployment complete!
echo Visit your deployed app at the URL shown above.
echo.
echo 📋 Next steps:
echo 1. Test your deployment
echo 2. Set up custom domain (optional)
echo 3. Monitor performance in Vercel dashboard
echo.
echo Happy creating! 🎨
pause
