@echo off
echo 🚀 Setting up CanvAI for GitHub deployment...
echo.

echo 📋 Step 1: Initializing Git repository...
git init
if errorlevel 1 (
    echo ❌ Git not found. Please install Git first.
    pause
    exit /b 1
)

echo ✅ Git repository initialized
echo.

echo 📋 Step 2: Adding files to Git...
git add .
if errorlevel 1 (
    echo ❌ Failed to add files
    pause
    exit /b 1
)

echo ✅ Files added to Git
echo.

echo 📋 Step 3: Making initial commit...
git commit -m "Initial commit: CanvAI - Claude Art Gallery"
if errorlevel 1 (
    echo ❌ Failed to make commit
    pause
    exit /b 1
)

echo ✅ Initial commit created
echo.

echo 📋 Step 4: GitHub repository setup...
echo.
echo 🔗 Now you need to create a GitHub repository:
echo    1. Go to https://github.com/new
echo    2. Repository name: canvai
echo    3. Make it PUBLIC
echo    4. Don't initialize with README
echo    5. Click "Create repository"
echo.
echo 📋 After creating the repository, run these commands:
echo    git branch -M main
echo    git remote add origin https://github.com/YOUR_USERNAME/canvai.git
echo    git push -u origin main
echo.
echo 📋 Then deploy to Vercel:
echo    1. Go to https://vercel.com/new
echo    2. Import your GitHub repository
echo    3. Set CLAUDE_API_KEY environment variable
echo    4. Deploy!
echo.
echo 🎉 Your CanvAI will be live on Vercel!
pause
