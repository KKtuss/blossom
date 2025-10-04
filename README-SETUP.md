# CanvAI Setup Instructions

## Quick Start

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Start the Backend Server**
   ```bash
   npm start
   ```

3. **Open Your Browser**
   Navigate to: `http://localhost:3001`

## Development Mode

For development with auto-restart:
```bash
npm run dev
```

## How It Works

- The backend server runs on port 3001
- It serves your HTML/CSS/JS files
- It handles Claude API calls to avoid CORS issues
- Your API key is securely handled on the server side

## Troubleshooting

### CORS Issues Fixed
The original CORS error has been resolved by:
- Creating a Node.js backend server
- Moving API calls to the server side
- Using proper CORS headers

### API Key Configuration
Your Claude API key is configured in `config.js` and will be used by the backend server.

### Port Issues
If port 3001 is in use, the server will automatically use the next available port.

## File Structure
```
CanvAI/
├── index.html          # Main application
├── script.js           # Frontend JavaScript
├── styles.css          # Styling
├── config.js           # API key configuration
├── server.js           # Backend server
├── package.json        # Dependencies
└── README-SETUP.md     # This file
```

