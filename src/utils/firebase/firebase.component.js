import { initializeApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithRedirect,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";

import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAuuyuglPRXG3Oq2y8BuZJqOelrC4c6QaA",
  authDomain: "secret-collection-697b6.firebaseapp.com",
  projectId: "secret-collection-697b6",
  storageBucket: "secret-collection-697b6.appspot.com",
  messagingSenderId: "868345711649",
  appId: "1:868345711649:web:cfd147dee60139d83a2760",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const provider = new GoogleAuthProvider();

provider.setCustomParameters({
  prompt: "select_account",
});

export const auth = getAuth();
// export const singInWithGooglePopup = () => signInWithPopup(auth, provider);
export const singInWithGoogleRedirect = () =>
  signInWithRedirect(auth, provider);
export const db = getFirestore();

export const createUserFirebase = async (userAuth, moreInfo = {}) => {
  const userReference = doc(db, "users", userAuth.uid);
  // console.log(userReference);
  const userSnapshot = await getDoc(userReference);
  // console.log(userSnapshot);

  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const signInDate = new Date();
    try {
      await setDoc(userReference, {
        displayName,
        email,
        signInDate,
        ...moreInfo,
      });
    } catch (e) {
      console.log("Problem occurred creating user:" + e.message);
    }
  }
  return userReference;
};

export const createAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;

  return await createUserWithEmailAndPassword(auth, email, password);
};

export const signInAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;

  return await signInWithEmailAndPassword(auth, email, password);
};

export const singOutUser = async () => await signOut(auth);
