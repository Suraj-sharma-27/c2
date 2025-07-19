# 🔐 Google Authentication Setup Guide for Campus Connect

## Prerequisites
You already have:
✅ Firebase project: `campus-connect-aab7a`
✅ Firebase Admin SDK configured
✅ Backend API running on `localhost:3001`

## Step 1: Get Firebase Web App Configuration

1. **Go to Firebase Console**: https://console.firebase.google.com/
2. **Select your project**: `campus-connect-aab7a`
3. **Go to Project Settings** (gear icon ⚙️)
4. **Scroll down to "Your apps" section**
5. **Click "Add app" > Web app (</>) if you don't have one**
6. **Copy the config object** that looks like this:

```javascript
const firebaseConfig = {
  apiKey: "AIzaSyC-XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  authDomain: "campus-connect-aab7a.firebaseapp.com",
  projectId: "campus-connect-aab7a",
  storageBucket: "campus-connect-aab7a.appspot.com",
  messagingSenderId: "123456789012",
  appId: "1:123456789012:web:abcdefghijklmnop"
};
```

## Step 2: Enable Google Sign-In

1. **In Firebase Console** > **Authentication**
2. **Click "Sign-in method" tab**
3. **Click "Google" provider**
4. **Enable the toggle**
5. **Add your email** as a test user
6. **Save**

## Step 3: Update Demo Page

Replace the Firebase config in `demo.html` (lines ~88-95) with your actual config from Step 1.

## Step 4: Test Google Auth

### Option A: Using Demo Page
1. **Open**: `file:///c:/Users/ajo586/Desktop/C2V1/demo.html`
2. **Click**: "🔐 Sign Up with Google (Admin)"
3. **Complete Google OAuth flow**
4. **Check the result** in the response area

### Option B: Using Postman/API Client
1. **Get Google ID Token** using Firebase Auth
2. **Send POST request** to: `http://localhost:3001/api/v1/signup/admin/google`
3. **Body**:
```json
{
  "idToken": "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9...",
  "displayName": "John Doe",
  "photoURL": "https://example.com/photo.jpg"
}
```

### Option C: Using Browser Console (Quick Test)
1. **Open demo page** in browser
2. **Open Developer Tools** (F12)
3. **Run this in console**:
```javascript
// This will trigger Google sign-in
signInWithGoogle();
```

## Step 5: Verify in Firestore

After successful signup:
1. **Go to Firebase Console** > **Firestore Database**
2. **Check "users" collection**
3. **You should see new admin user** with:
   - uid
   - email
   - role: "admin"
   - displayName
   - photoURL
   - createdAt

## Expected API Response

✅ **Success Response**:
```json
{
  "success": true,
  "data": {
    "uid": "google-user-id-123",
    "email": "admin@example.com",
    "role": "admin",
    "displayName": "John Doe",
    "photoURL": "https://lh3.googleusercontent.com/...",
    "createdAt": "2025-07-18T..."
  },
  "message": "Admin registration successful with Google",
  "timestamp": "2025-07-18T..."
}
```

❌ **Error Response** (if user already exists):
```json
{
  "success": false,
  "message": "Google admin signup failed: Admin already exists",
  "timestamp": "2025-07-18T..."
}
```

## Troubleshooting

### 🚨 Common Issues:

1. **"Firebase config not found"**
   - Make sure you replaced the config in `demo.html`

2. **"This domain is not authorized"**
   - Add `localhost` to authorized domains in Firebase Console
   - Go to: Authentication > Settings > Authorized domains

3. **"ID token verification failed"**
   - Check your Firebase project ID matches
   - Ensure service account has correct permissions

4. **CORS errors**
   - The backend has CORS enabled for development
   - Make sure you're using `http://localhost:3001`

### 🔧 Debug Steps:

1. **Check browser console** for JavaScript errors
2. **Check network tab** for API call details
3. **Check backend logs** in terminal
4. **Verify Firebase Admin SDK** credentials in `.env`

## Testing with Different Scenarios

### Test 1: New Admin Signup
- Use a Google account that hasn't signed up before
- Should create new user in Firestore

### Test 2: Existing Admin Signup
- Use same Google account again
- Should return "Admin already exists" error

### Test 3: Admin Login (after signup)
- Test admin login endpoint with email/password
- Use email from Google account and any password

## Next Steps

After Google Auth works:
1. **Create a proper frontend** (React, Vue, etc.)
2. **Add JWT token validation** middleware
3. **Implement protected routes**
4. **Add role-based authorization**
5. **Deploy to production**

## Need Help?

If you encounter issues:
1. Check the Firebase Console for error logs
2. Look at browser developer tools
3. Check the backend terminal for error messages
4. Verify all environment variables are set correctly
