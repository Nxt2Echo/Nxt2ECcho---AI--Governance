import { db } from '../firebase';
import { User } from '../types';

export const UserCollection = db.collection('users');

export const UserModel = {
  async create(userId: string, data: Partial<User>): Promise<void> {
    const now = new Date().toISOString();
    await UserCollection.doc(userId).set({
      ...data,
      createdAt: now,
      updatedAt: now,
    });
  },

  async findById(userId: string): Promise<User | null> {
    const doc = await UserCollection.doc(userId).get();
    if (!doc.exists) return null;
    return { id: doc.id, ...doc.data() } as User;
  },

  async findByEmail(email: string): Promise<User | null> {
    const snapshot = await UserCollection.where('email', '==', email).limit(1).get();
    if (snapshot.empty) return null;
    const doc = snapshot.docs[0];
    return { id: doc.id, ...doc.data() } as User;
  },

  async update(userId: string, data: Partial<User>): Promise<void> {
    await UserCollection.doc(userId).update({
      ...data,
      updatedAt: new Date().toISOString(),
    });
  },
};
