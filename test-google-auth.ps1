# Google Auth Test Script for Campus Connect
# Usage: .\test-google-auth.ps1

Write-Host "🔐 Google Auth Test Script for Campus Connect" -ForegroundColor Green
Write-Host "=" * 50
Write-Host ""

# Test Health Check first
Write-Host "🩺 Testing Health Check..." -ForegroundColor Yellow
try {
    $healthResponse = Invoke-RestMethod -Uri "http://localhost:3001/api/v1/health" -Method GET
    Write-Host "✅ Health Check Successful!" -ForegroundColor Green
    Write-Host "📋 Response:" -ForegroundColor Cyan
    $healthResponse | ConvertTo-Json -Depth 3 | Write-Host
    Write-Host ""
} catch {
    Write-Host "❌ Health Check Failed!" -ForegroundColor Red
    Write-Host "💡 Make sure your server is running on localhost:3001" -ForegroundColor Yellow
    Write-Host "Error: $($_.Exception.Message)" -ForegroundColor Red
    exit 1
}

# Instructions for Google Auth testing
Write-Host "🔧 Google Auth Testing Instructions:" -ForegroundColor Yellow
Write-Host ""
Write-Host "To test Google Admin Signup, you have several options:" -ForegroundColor White
Write-Host ""
Write-Host "Option 1: Use Demo Page (Recommended)" -ForegroundColor Cyan
Write-Host "1. Update Firebase config in demo.html with your actual values"
Write-Host "2. Open demo.html in browser"
Write-Host "3. Click 'Sign Up with Google (Admin)'"
Write-Host "4. Complete OAuth flow"
Write-Host ""
Write-Host "Option 2: Manual API Test" -ForegroundColor Cyan
Write-Host "If you have a Google ID Token, run this command:"
Write-Host ""
Write-Host '$body = @{' -ForegroundColor Gray
Write-Host '    idToken = "YOUR_GOOGLE_ID_TOKEN_HERE"' -ForegroundColor Gray
Write-Host '    displayName = "Test Admin"' -ForegroundColor Gray
Write-Host '    photoURL = "https://example.com/photo.jpg"' -ForegroundColor Gray
Write-Host '} | ConvertTo-Json' -ForegroundColor Gray
Write-Host ""
Write-Host 'Invoke-RestMethod -Uri "http://localhost:3001/api/v1/signup/admin/google" -Method POST -Body $body -ContentType "application/json"' -ForegroundColor Gray
Write-Host ""

# Test student signup as example
Write-Host "🧪 Testing Student Signup (as example)..." -ForegroundColor Yellow

$studentBody = @{
    email = "test.admin.$(Get-Date -Format 'MMddHHmmss')@campus.edu"
    password = "testpassword123"
} | ConvertTo-Json

try {
    Write-Host "📤 Creating test student..." -ForegroundColor Cyan
    $studentResponse = Invoke-RestMethod -Uri "http://localhost:3001/api/v1/signup/student" -Method POST -Body $studentBody -ContentType "application/json"
    
    Write-Host "✅ Student Signup Successful!" -ForegroundColor Green
    Write-Host "📋 Response:" -ForegroundColor Cyan
    $studentResponse | ConvertTo-Json -Depth 3 | Write-Host
    Write-Host ""
    
    # Test student login
    Write-Host "🔑 Testing Student Login..." -ForegroundColor Yellow
    $loginBody = @{
        email = ($studentResponse.data.email)
        password = "testpassword123"
    } | ConvertTo-Json
    
    $loginResponse = Invoke-RestMethod -Uri "http://localhost:3001/api/v1/login/student" -Method POST -Body $loginBody -ContentType "application/json"
    
    Write-Host "✅ Student Login Successful!" -ForegroundColor Green
    Write-Host "🎫 JWT Token received: $($loginResponse.data.token.Substring(0, 50))..." -ForegroundColor Green
    Write-Host ""
    
} catch {
    Write-Host "❌ Student test failed!" -ForegroundColor Red
    Write-Host "Error: $($_.Exception.Message)" -ForegroundColor Red
}

Write-Host "📖 Next Steps for Google Auth:" -ForegroundColor Yellow
Write-Host "1. Check GOOGLE_AUTH_SETUP.md for detailed instructions"
Write-Host "2. Configure Firebase Web App in Firebase Console"
Write-Host "3. Update demo.html with your Firebase config"
Write-Host "4. Test using the demo page"
Write-Host ""
Write-Host "🌐 Demo page: file:///c:/Users/ajo586/Desktop/C2V1/demo.html" -ForegroundColor Cyan
Write-Host "📚 Setup guide: c:/Users/ajo586/Desktop/C2V1/GOOGLE_AUTH_SETUP.md" -ForegroundColor Cyan
