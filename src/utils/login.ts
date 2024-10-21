// login.ts
import { signOut, signInWithEmailAndPassword } from 'firebase/auth';

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

export async function isLogin() {
  const user = auth.currentUser;

  if (user) {
    // User is signed in
    console.log("User is signed in:", user.email);

    return true;
  } else {
    // No user is signed in
    console.log("No user is signed in");

    return false;
  }
}


export const logout = async () => {
  try {
    await signOut(auth);
    console.log('User logged out successfully');
  } catch (error) {
    console.error('Error during logout:', error);
    throw error;
  }
};
