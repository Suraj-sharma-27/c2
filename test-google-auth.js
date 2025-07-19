/**
 * Google Auth Test Script for Campus Connect
 * 
 * This script helps you test Google authentication by simulating
 * the ID token verification process.
 * 
 * Usage: node test-google-auth.js
 */

const https = require('https');

// Test data - replace with actual Google ID token
const testData = {
  // You can get this token from:
  // 1. Browser Developer Tools after Google sign-in
  // 2. Firebase Auth emulator
  // 3. Manual Google OAuth flow
  idToken: "REPLACE_WITH_ACTUAL_GOOGLE_ID_TOKEN",
  displayName: "Test Admin User",
  photoURL: "https://example.com/photo.jpg"
};

const apiUrl = 'http://localhost:3001/api/v1/signup/admin/google';

function testGoogleAuth() {
  console.log('🧪 Testing Google Admin Signup...\n');
  
  const postData = JSON.stringify(testData);
  
  const options = {
    hostname: 'localhost',
    port: 3001,
    path: '/api/v1/signup/admin/google',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': Buffer.byteLength(postData)
    }
  };

  const req = require('http').request(options, (res) => {
    console.log(`📡 Status Code: ${res.statusCode}`);
    console.log(`📋 Headers:`, res.headers);
    console.log('');

    let data = '';
    res.on('data', (chunk) => {
      data += chunk;
    });

    res.on('end', () => {
      try {
        const response = JSON.parse(data);
        console.log('✅ Response:');
        console.log(JSON.stringify(response, null, 2));
        
        if (response.success) {
          console.log('\n🎉 Google Admin Signup Successful!');
          console.log(`👤 User ID: ${response.data.uid}`);
          console.log(`📧 Email: ${response.data.email}`);
          console.log(`👨‍💼 Role: ${response.data.role}`);
        } else {
          console.log('\n❌ Google Admin Signup Failed!');
          console.log(`💬 Message: ${response.message}`);
        }
      } catch (error) {
        console.error('❌ Error parsing response:', error);
        console.log('Raw response:', data);
      }
    });
  });

  req.on('error', (error) => {
    console.error('❌ Request failed:', error);
  });

  req.write(postData);
  req.end();
}

function testHealthCheck() {
  console.log('🩺 Testing Health Check...\n');
  
  const options = {
    hostname: 'localhost',
    port: 3001,
    path: '/api/v1/health',
    method: 'GET'
  };

  const req = require('http').request(options, (res) => {
    let data = '';
    res.on('data', (chunk) => {
      data += chunk;
    });

    res.on('end', () => {
      try {
        const response = JSON.parse(data);
        console.log('✅ Health Check Response:');
        console.log(JSON.stringify(response, null, 2));
        console.log('\n🚀 Server is running!\n');
        
        // After health check, test Google auth
        testGoogleAuth();
      } catch (error) {
        console.error('❌ Health check failed:', error);
      }
    });
  });

  req.on('error', (error) => {
    console.error('❌ Health check request failed:', error);
    console.log('💡 Make sure your server is running on localhost:3001');
  });

  req.end();
}

// Instructions for getting Google ID Token
console.log('🔐 Google Auth Test Script for Campus Connect');
console.log('=' .repeat(50));
console.log('');
console.log('📋 To test Google Auth, you need a valid Google ID Token.');
console.log('');
console.log('🔧 How to get Google ID Token:');
console.log('1. Open demo.html in browser');
console.log('2. Open Developer Tools (F12)');
console.log('3. Click "Sign Up with Google"');
console.log('4. Complete Google OAuth');
console.log('5. In Network tab, find the API call');
console.log('6. Copy the idToken from request body');
console.log('7. Replace REPLACE_WITH_ACTUAL_GOOGLE_ID_TOKEN in this script');
console.log('');
console.log('🚀 Starting tests...');
console.log('');

// Start with health check
testHealthCheck();
