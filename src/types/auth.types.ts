export interface LoginRequest {
  email: string;
  password: string;
  role: 'admin' | 'student';
}

export interface GoogleSignupRequest {
  idToken: string;
  displayName?: string;
  photoURL?: string;
}

export interface LoginResponse {
  user: {
    uid: string;
    email: string;
    role: string;
    displayName?: string;
    photoURL?: string;
  };
  token: string;
}

export interface User {
  uid: string;
  email: string;
  role: 'admin' | 'student';
  displayName?: string;
  photoURL?: string;
  createdAt: string;
}
