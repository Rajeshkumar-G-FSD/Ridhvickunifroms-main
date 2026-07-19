import {
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
} from 'firebase/auth';
import { auth } from './firebase';

// The admin account is created once in the Firebase console
// (Authentication > Users) with this same email/password.
export async function loginAdmin(email: string, password: string) {
  const credential = await signInWithEmailAndPassword(auth, email.trim(), password);
  return credential.user;
}

export function logoutAdmin() {
  return firebaseSignOut(auth);
}
