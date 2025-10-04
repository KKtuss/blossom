#!/usr/bin/env node

// CanvAI Deployment Verification Script
const https = require('https');
const http = require('http');

const DEPLOYMENT_URL = process.argv[2];

if (!DEPLOYMENT_URL) {
    console.log('❌ Please provide deployment URL');
    console.log('Usage: node verify-deployment.js https://your-app.vercel.app');
    process.exit(1);
}

console.log('🔍 Verifying CanvAI deployment...');
console.log(`📡 Testing: ${DEPLOYMENT_URL}`);

// Test main page
function testMainPage() {
    return new Promise((resolve, reject) => {
        const client = DEPLOYMENT_URL.startsWith('https') ? https : http;
        
        client.get(DEPLOYMENT_URL, (res) => {
            let data = '';
            res.on('data', chunk => data += chunk);
            res.on('end', () => {
                if (res.statusCode === 200 && data.includes('CanvAI')) {
                    console.log('✅ Main page loads correctly');
                    resolve(true);
                } else {
                    console.log(`❌ Main page failed: ${res.statusCode}`);
                    resolve(false);
                }
            });
        }).on('error', (err) => {
            console.log(`❌ Main page error: ${err.message}`);
            resolve(false);
        });
    });
}

// Test health endpoint
function testHealthEndpoint() {
    return new Promise((resolve, reject) => {
        const healthUrl = `${DEPLOYMENT_URL}/api/health`;
        const client = healthUrl.startsWith('https') ? https : http;
        
        client.get(healthUrl, (res) => {
            let data = '';
            res.on('data', chunk => data += chunk);
            res.on('end', () => {
                try {
                    const response = JSON.parse(data);
                    if (res.statusCode === 200 && response.status === 'OK') {
                        console.log('✅ Health endpoint working');
                        resolve(true);
                    } else {
                        console.log(`❌ Health endpoint failed: ${res.statusCode}`);
                        resolve(false);
                    }
                } catch (e) {
                    console.log(`❌ Health endpoint invalid JSON: ${data}`);
                    resolve(false);
                }
            });
        }).on('error', (err) => {
            console.log(`❌ Health endpoint error: ${err.message}`);
            resolve(false);
        });
    });
}

// Test static files
function testStaticFiles() {
    return new Promise((resolve, reject) => {
        const staticUrl = `${DEPLOYMENT_URL}/script.js`;
        const client = staticUrl.startsWith('https') ? https : http;
        
        client.get(staticUrl, (res) => {
            if (res.statusCode === 200) {
                console.log('✅ Static files serving correctly');
                resolve(true);
            } else {
                console.log(`❌ Static files failed: ${res.statusCode}`);
                resolve(false);
            }
        }).on('error', (err) => {
            console.log(`❌ Static files error: ${err.message}`);
            resolve(false);
        });
    });
}

// Run all tests
async function runTests() {
    const results = await Promise.all([
        testMainPage(),
        testHealthEndpoint(),
        testStaticFiles()
    ]);
    
    const passed = results.filter(r => r).length;
    const total = results.length;
    
    console.log('\n📊 Test Results:');
    console.log(`✅ Passed: ${passed}/${total}`);
    
    if (passed === total) {
        console.log('🎉 Deployment verification successful!');
        console.log('🚀 Your CanvAI is ready to use!');
    } else {
        console.log('⚠️  Some tests failed. Check the troubleshooting guide.');
        console.log('📖 See TROUBLESHOOTING.md for solutions');
    }
}

runTests().catch(console.error);
