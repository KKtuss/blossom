// Claude API Configuration Template
// Copy this file to config.js and replace with your actual API key

// Get your API key at: https://console.anthropic.com/
const CLAUDE_API_KEY = 'YOUR_CLAUDE_API_KEY_HERE';

// Export for use in main script
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { CLAUDE_API_KEY };
}
