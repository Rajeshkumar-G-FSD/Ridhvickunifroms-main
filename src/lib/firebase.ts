import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Firebase web config is public by design (it ships in the client bundle and
// access is enforced by Firestore/Auth rules), so the production project's
// values are kept here as a fallback. This lets hosts like Vercel build the
// site without any env setup; VITE_FIREBASE_* env vars still override it.
const DEFAULT_FIREBASE_CONFIG = {
  apiKey: 'AIzaSyCcWxYCwjiWMchsnTqAC-VQxZeJ-MBNWGk',
  authDomain: 'ridhvickniforms.firebaseapp.com',
  projectId: 'ridhvickniforms',
  storageBucket: 'ridhvickniforms.firebasestorage.app',
  messagingSenderId: '461001816312',
  appId: '1:461001816312:web:413ac3a7c4d755541ce30d',
  measurementId: 'G-MDE51QJYEJ',
};

const env = import.meta.env;

const firebaseConfig = {
  apiKey: env.VITE_FIREBASE_API_KEY || DEFAULT_FIREBASE_CONFIG.apiKey,
  authDomain: env.VITE_FIREBASE_AUTH_DOMAIN || DEFAULT_FIREBASE_CONFIG.authDomain,
  projectId: env.VITE_FIREBASE_PROJECT_ID || DEFAULT_FIREBASE_CONFIG.projectId,
  storageBucket: env.VITE_FIREBASE_STORAGE_BUCKET || DEFAULT_FIREBASE_CONFIG.storageBucket,
  messagingSenderId: env.VITE_FIREBASE_MESSAGING_SENDER_ID || DEFAULT_FIREBASE_CONFIG.messagingSenderId,
  appId: env.VITE_FIREBASE_APP_ID || DEFAULT_FIREBASE_CONFIG.appId,
  measurementId: env.VITE_FIREBASE_MEASUREMENT_ID || DEFAULT_FIREBASE_CONFIG.measurementId,
};

export const firebaseApp = initializeApp(firebaseConfig);
export const auth = getAuth(firebaseApp);
export const db = getFirestore(firebaseApp);
