// login.ts
import { signOut, onAuthStateChanged, signInWithEmailAndPassword } from 'firebase/auth';

import { auth } from './firebase';

 // Import your initialized Firebase app
export const loginWithEmailPassword = async (email: string, password: string) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);

    const user = userCredential.user;

    return user;
  } catch (error) {
    // Handle errors here
    console.error('Error during login:', error);
    throw error;
  }
};

export const isLogin = (): boolean => {
  const user = auth.currentUser;

  return !!user;
};



export const logout = async () => {
  try {
    await signOut(auth);
    console.log('User logged out successfully');
  } catch (error) {
    console.error('Error during logout:', error);
    throw error;
  }
};
