import { auth } from '../firebase';
import { UserModel } from '../models/User';
import { User, Role } from '../types';
import jwt from 'jsonwebtoken';
import { env } from '../config/env';

export class AuthService {
  static async registerUser(data: { email: string; password?: string; name: string; role?: Role }): Promise<{ token: string; user: Omit<User, 'password'> }> {
    // 1. Create user in Firebase Auth
    const userRecord = await auth.createUser({
      email: data.email,
      password: data.password, // Only if using password auth
      displayName: data.name,
    });

    // 2. Save user profile in Firestore
    const role = data.role || Role.CITIZEN;
    const userData: Partial<User> = {
      name: data.name,
      email: data.email,
      role: role,
    };
    
    await UserModel.create(userRecord.uid, userData);

    // 3. Generate custom JWT token for our backend
    const token = this.generateToken(userRecord.uid, role);

    return {
      token,
      user: { id: userRecord.uid, ...userData } as Omit<User, 'password'>,
    };
  }

  static async loginUser(uid: string): Promise<{ token: string; user: Omit<User, 'password'> }> {
    // The client typically authenticates directly with Firebase, and sends an ID token to our backend.
    // Or we just issue our own JWT based on the UID.
    
    const user = await UserModel.findById(uid);
    if (!user) {
      throw new Error('User not found');
    }

    const token = this.generateToken(uid, user.role);

    return {
      token,
      user,
    };
  }

  static generateToken(userId: string, role: Role): string {
    return jwt.sign({ id: userId, role }, env.JWT_SECRET, {
      expiresIn: '7d', // 7 days
    });
  }
}
