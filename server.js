const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname)));

// Serve the main HTML file for root path
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});


// API endpoint to generate art using Claude
app.post('/api/generate-art', async (req, res) => {
    console.log('POST /api/generate-art endpoint hit');
    try {
        console.log('Received request:', req.body);
        const { prompt, apiKey } = req.body;
        
        // Use API key from request or environment variable
        const finalApiKey = apiKey || process.env.CLAUDE_API_KEY;
        
        if (!finalApiKey || finalApiKey === 'YOUR_CLAUDE_API_KEY_HERE') {
            return res.status(400).json({ 
                error: 'API key not provided or invalid' 
            });
        }
        
        if (!prompt) {
            return res.status(400).json({ 
                error: 'Prompt not provided' 
            });
        }

        // Make request to Claude API
        const claudeResponse = await fetch('https://api.anthropic.com/v1/messages', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-api-key': finalApiKey,
                'anthropic-version': '2023-06-01'
            },
            body: JSON.stringify({
                model: 'claude-3-5-haiku-20241022',
                max_tokens: 4000,
                messages: [{
                    role: 'user',
                    content: prompt
                }]
            })
        });

        if (!claudeResponse.ok) {
            const errorData = await claudeResponse.text();
            console.error('Claude API error:', errorData);
            return res.status(claudeResponse.status).json({ 
                error: `Claude API error: ${claudeResponse.status}` 
            });
        }

        const claudeData = await claudeResponse.json();
        const content = claudeData.content[0].text;
        
        console.log('Claude response content:', content);
        
        res.json({ 
            success: true, 
            content: content 
        });
        
    } catch (error) {
        console.error('Server error:', error);
        res.status(500).json({ 
            error: 'Internal server error: ' + error.message 
        });
    }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
    res.json({ 
        status: 'OK', 
        message: 'CanvAI Backend Server is running' 
    });
});

// Debug route to see all requests
app.use((req, res, next) => {
    console.log(`${req.method} ${req.path} - ${req.headers['content-type'] || 'no content-type'}`);
    next();
});

// Only start server if not running on Vercel
if (process.env.NODE_ENV !== 'production' || process.env.VERCEL !== '1') {
    app.listen(PORT, () => {
        console.log(`🚀 CanvAI Backend Server running on http://localhost:${PORT}`);
        console.log(`📱 Open your browser and navigate to http://localhost:${PORT}`);
        console.log(`🔑 Make sure your Claude API key is configured in environment variables`);
    });
}

// Export for Vercel
module.exports = app;
