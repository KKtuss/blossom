const express = require('express');
const path = require('path');
const cors = require('cors');

const app = express();

// CORS configuration
app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'x-api-key']
}));

// Security headers
app.use((req, res, next) => {
    res.setHeader('Content-Security-Policy', 
        "default-src 'self'; " +
        "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; " +
        "font-src 'self' https://fonts.gstatic.com; " +
        "script-src 'self' 'unsafe-inline'; " +
        "img-src 'self' data:; " +
        "connect-src 'self' https://api.anthropic.com;"
    );
    next();
});

app.use(express.json());
app.use(express.static(path.join(__dirname)));

// Serve the main HTML file for root path
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Font test page removed

// Explicit routes for static files to ensure proper MIME types
app.get('/styles.css', (req, res) => {
    res.setHeader('Content-Type', 'text/css');
    res.sendFile(path.join(__dirname, 'styles.css'));
});

app.get('/script.js', (req, res) => {
    res.setHeader('Content-Type', 'application/javascript');
    res.sendFile(path.join(__dirname, 'script.js'));
});

app.get('/config.js', (req, res) => {
    res.setHeader('Content-Type', 'application/javascript');
    res.sendFile(path.join(__dirname, 'config.js'));
});

app.get('/blossompix.png', (req, res) => {
    res.setHeader('Content-Type', 'image/png');
    res.sendFile(path.join(__dirname, 'blossompix.png'));
});

app.get('/twitter button.png', (req, res) => {
    res.setHeader('Content-Type', 'image/png');
    res.sendFile(path.join(__dirname, 'twitter button.png'));
});

app.get('/Github button.png', (req, res) => {
    res.setHeader('Content-Type', 'image/png');
    res.sendFile(path.join(__dirname, 'Github button.png'));
});

// Serve font stylesheet
app.get('/QuanSlim/stylesheet.css', (req, res) => {
    console.log('📄 Serving QuanSlim stylesheet.css from:', path.join(__dirname, 'QuanSlim', 'stylesheet.css'));
    res.setHeader('Content-Type', 'text/css');
    res.setHeader('Cache-Control', 'public, max-age=3600');
    res.sendFile(path.join(__dirname, 'QuanSlim', 'stylesheet.css'));
});

// Serve QuanSlim font files
app.get('/QuanSlim/*', (req, res) => {
    console.log('🔤 Serving QuanSlim font file:', req.path);
    const filePath = path.join(__dirname, req.path);
    const ext = path.extname(filePath).toLowerCase();
    
    if (ext === '.woff') res.setHeader('Content-Type', 'font/woff');
    else if (ext === '.woff2') res.setHeader('Content-Type', 'font/woff2');
    else if (ext === '.ttf') res.setHeader('Content-Type', 'font/ttf');
    else if (ext === '.eot') res.setHeader('Content-Type', 'application/vnd.ms-fontobject');
    
    res.setHeader('Cache-Control', 'public, max-age=86400');
    res.sendFile(filePath);
});

// API route for art generation
app.post('/api/generate-art', async (req, res) => {
    const { apiKey, prompt } = req.body;
    
    // Use API key from request body or environment variable
    const finalApiKey = apiKey || process.env.CLAUDE_API_KEY;
    
    if (!finalApiKey) {
        return res.status(400).json({ 
            error: 'Claude API key required',
            message: 'Please provide your Claude API key'
        });
    }

    try {
        const response = await fetch('https://api.anthropic.com/v1/messages', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-api-key': finalApiKey,
                'anthropic-version': '2023-06-01'
            },
            body: JSON.stringify({
                model: 'claude-3-haiku-20240307',
                max_tokens: 4000,
                messages: [{
                    role: 'user',
                    content: prompt || 'Generate a new pixel art masterpiece with detailed instructions for a 32x32 canvas.'
                }]
            })
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(`API request failed: ${response.status} ${errorData.error?.message || response.statusText}`);
        }

        const data = await response.json();
        res.json({ 
            content: data.content[0].text,
            usage: data.usage 
        });

    } catch (error) {
        console.error('Claude API Error:', error);
        res.status(500).json({ 
            error: 'Failed to generate art',
            message: error.message 
        });
    }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
    res.json({ 
        status: 'healthy',
        timestamp: new Date().toISOString(),
        message: 'CanvAI Backend Server is running' 
    });
});

// Debug route to see all requests
app.use((req, res, next) => {
    console.log(`${req.method} ${req.path} - ${req.headers['content-type'] || 'no content-type'}`);
    if (req.path.includes('QuanSlim') || req.path.includes('static')) {
        console.log('🔍 Font/static request detected:', req.path);
    }
    next();
});

// Fallback route for debugging - catch any missed requests
app.get('*', (req, res) => {
    console.log('🚨 Fallback route hit for:', req.path);
    res.status(404).send('File not found: ' + req.path);
});

// Export for Vercel
module.exports = app;
