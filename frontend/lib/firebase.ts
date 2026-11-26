import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup, UserCredential } from "firebase/auth";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || "",
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || "",
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "",
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || "",
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || "",
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || "",
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID || "",
};

const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
  prompt: "select_account",
});

/**
 * Triggers real Google OAuth popup via Firebase,
 * returns the authenticated Google user details.
 */
export async function signInWithGooglePopup() {
  if (!firebaseConfig.apiKey) {
    throw new Error("Firebase API key is not configured. Set NEXT_PUBLIC_FIREBASE_API_KEY in .env.local.");
  }

  const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
  const auth = getAuth(app);

  const result: UserCredential = await signInWithPopup(auth, googleProvider);
  const user = result.user;

  if (!user.email) {
    throw new Error("Unable to retrieve an email address from your Google account.");
  }

  const idToken = await user.getIdToken();
  const avatar = user.photoURL || user.providerData?.[0]?.photoURL || undefined;

  return {
    email: user.email,
    name: user.displayName || user.email.split("@")[0],
    avatar,
    idToken,
    user,
  };
}

export { googleProvider, signInWithPopup };
export type { UserCredential };
