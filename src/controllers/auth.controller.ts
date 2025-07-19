import { Request, Response } from 'express';
import { LoginRequest, ApiResponse, LoginResponse, GoogleSignupRequest } from '../types';
import { AuthService } from '../services';

export class AuthController {
  public static async adminLogin(req: Request, res: Response): Promise<void> {
    try {
      const { email, password }: Omit<LoginRequest, 'role'> = req.body;
      
      if (!email || !password) {
        res.status(400).json({
          success: false,
          message: 'Email and password are required',
          timestamp: new Date().toISOString()
        });
        return;
      }
      
      const result = await AuthService.loginUser({ email, password, role: 'admin' });
      
      const response: ApiResponse<LoginResponse> = {
        success: true,
        data: {
          user: result.user,
          token: result.token
        },
        message: 'Admin login successful',
        timestamp: new Date().toISOString()
      };
      
      res.status(200).json(response);
      
    } catch (error) {
      res.status(401).json({
        success: false,
        message: error instanceof Error ? error.message : 'Admin login failed',
        timestamp: new Date().toISOString()
      });
    }
  }
  
  public static async studentLogin(req: Request, res: Response): Promise<void> {
    try {
      const { email, password }: Omit<LoginRequest, 'role'> = req.body;
      
      if (!email || !password) {
        res.status(400).json({
          success: false,
          message: 'Email and password are required',
          timestamp: new Date().toISOString()
        });
        return;
      }
      
      const result = await AuthService.loginUser({ email, password, role: 'student' });
      
      const response: ApiResponse<LoginResponse> = {
        success: true,
        data: {
          user: result.user,
          token: result.token
        },
        message: 'Student login successful',
        timestamp: new Date().toISOString()
      };
      
      res.status(200).json(response);
      
    } catch (error) {
      res.status(401).json({
        success: false,
        message: error instanceof Error ? error.message : 'Student login failed',
        timestamp: new Date().toISOString()
      });
    }
  }

  public static async adminSignup(req: Request, res: Response): Promise<void> {
    try {
      const { email, password }: Omit<LoginRequest, 'role'> = req.body;
      
      if (!email || !password) {
        res.status(400).json({
          success: false,
          message: 'Email and password are required',
          timestamp: new Date().toISOString()
        });
        return;
      }
      
      const user = await AuthService.createUser(email, password, 'admin');
      
      res.status(201).json({
        success: true,
        data: {
          user: {
            uid: user.uid,
            email: user.email,
            role: user.role
          }
        },
        message: 'Admin account created successfully',
        timestamp: new Date().toISOString()
      });
      
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error instanceof Error ? error.message : 'Admin signup failed',
        timestamp: new Date().toISOString()
      });
    }
  }
  
  public static async studentSignup(req: Request, res: Response): Promise<void> {
    try {
      const { email, password }: Omit<LoginRequest, 'role'> = req.body;
      
      if (!email || !password) {
        res.status(400).json({
          success: false,
          message: 'Email and password are required',
          timestamp: new Date().toISOString()
        });
        return;
      }
      
      const user = await AuthService.createUser(email, password, 'student');
      
      res.status(201).json({
        success: true,
        data: {
          user: {
            uid: user.uid,
            email: user.email,
            role: user.role
          }
        },
        message: 'Student account created successfully',
        timestamp: new Date().toISOString()
      });
      
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error instanceof Error ? error.message : 'Student signup failed',
        timestamp: new Date().toISOString()
      });
    }
  }

  public static async adminGoogleSignup(req: Request, res: Response): Promise<void> {
    try {
      const { idToken, displayName, photoURL }: GoogleSignupRequest = req.body;
      
      if (!idToken) {
        res.status(400).json({
          success: false,
          message: 'Google ID token is required',
          timestamp: new Date().toISOString()
        });
        return;      }
      
      const signupRequest: GoogleSignupRequest = { idToken };
      if (displayName) signupRequest.displayName = displayName;
      if (photoURL) signupRequest.photoURL = photoURL;
      
      const user = await AuthService.googleSignupAdmin(signupRequest);
      
      const response: ApiResponse = {
        success: true,
        data: user,
        message: 'Admin registration successful with Google',
        timestamp: new Date().toISOString()
      };
      
      res.status(201).json(response);
      
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error instanceof Error ? error.message : 'Admin Google signup failed',
        timestamp: new Date().toISOString()
      });
    }
  }
  
  public static async signupStudent(req: Request, res: Response): Promise<void> {
    try {
      const { email, password } = req.body;
      
      if (!email || !password) {
        res.status(400).json({
          success: false,
          message: 'Email and password are required',
          timestamp: new Date().toISOString()
        });
        return;
      }
      
      const user = await AuthService.createUser(email, password, 'student');
      
      const response: ApiResponse = {
        success: true,
        data: user,
        message: 'Student registration successful',
        timestamp: new Date().toISOString()
      };
      
      res.status(201).json(response);
      
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error instanceof Error ? error.message : 'Student signup failed',
        timestamp: new Date().toISOString()
      });
    }
  }
}
