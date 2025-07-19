import { auth, firestore } from '../config/firebase';
import { LoginRequest, User, GoogleSignupRequest } from '../types';

export class AuthService {
  static async loginUser(loginData: LoginRequest): Promise<{ user: User; token: string }> {
    try {
      const userRecord = await auth.getUserByEmail(loginData.email);
      
      const userDoc = await firestore.collection('users').doc(userRecord.uid).get();
      
      if (!userDoc.exists) {
        throw new Error('User profile not found');
      }
      
      const userData = userDoc.data() as User;
      
      if (userData.role !== loginData.role) {
        throw new Error(`Access denied. Invalid role for ${loginData.role} login`);
      }
      
      const customToken = await auth.createCustomToken(userRecord.uid, {
        role: userData.role,
        email: userData.email
      });
      
      const userResponse: User = {
        uid: userRecord.uid,
        email: userRecord.email || '',
        role: userData.role,
        createdAt: userData.createdAt
      };
      
      if (userData.displayName) {
        userResponse.displayName = userData.displayName;
      }
      
      if (userData.photoURL) {
        userResponse.photoURL = userData.photoURL;
      }
      
      return {
        user: userResponse,
        token: customToken
      };
      
    } catch (error) {
      throw new Error(`Authentication failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }
  
  static async googleSignupAdmin(signupData: GoogleSignupRequest): Promise<User> {
    try {
      const decodedToken = await auth.verifyIdToken(signupData.idToken);
      
      const existingUserDoc = await firestore.collection('users').doc(decodedToken.uid).get();
      if (existingUserDoc.exists) {
        throw new Error('Admin already exists');
      }
      
      const userData: User = {
        uid: decodedToken.uid,
        email: decodedToken.email || '',
        role: 'admin',
        createdAt: new Date().toISOString()
      };
      
      if (signupData.displayName || decodedToken['name']) {
        userData.displayName = signupData.displayName || (decodedToken['name'] as string) || '';
      }
      
      if (signupData.photoURL || decodedToken['picture']) {
        userData.photoURL = signupData.photoURL || (decodedToken['picture'] as string) || '';
      }
      
      await firestore.collection('users').doc(decodedToken.uid).set(userData);
      
      return userData;
      
    } catch (error) {
      throw new Error(`Google admin signup failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }
  
  static async createUser(email: string, password: string, role: 'admin' | 'student'): Promise<User> {
    try {
      const userRecord = await auth.createUser({
        email,
        password,
      });
      
      const userData: User = {
        uid: userRecord.uid,
        email: email,
        role: role,
        createdAt: new Date().toISOString()
      };
      
      await firestore.collection('users').doc(userRecord.uid).set(userData);
      
      return userData;
      
    } catch (error) {
      throw new Error(`User creation failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }
}