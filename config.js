// Claude API Configuration
// This file will be populated by Vercel environment variables in production
const CLAUDE_API_KEY = 'YOUR_CLAUDE_API_KEY_HERE';

// Export for use in main script
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { CLAUDE_API_KEY };
}
