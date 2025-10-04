// Claude API Configuration
// Replace 'YOUR_CLAUDE_API_KEY_HERE' with your actual Claude API key from Anthropic Console
// Get your API key at: https://console.anthropic.com/

const CLAUDE_API_KEY = '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';

// Export for use in main script
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { CLAUDE_API_KEY };
}
