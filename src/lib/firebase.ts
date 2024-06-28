import config from "@/lib/config";

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  GithubAuthProvider,
  signInWithPopup,
  signInWithRedirect,
  sendEmailVerification,
  updateProfile
} from "firebase/auth";
// import firebase from 'firebase';
import { getDatabase } from "firebase/database";

import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: config.firebase.apiKey,
  authDomain: config.firebase.authDomain,
  databaseURL: config.firebase.databaseURL,
  projectId: config.firebase.projectId,
  storageBucket: config.firebase.storageBucket,
  messagingSenderId: config.firebase.messagingSenderId,
  appId: config.firebase.appId,
  measurementId: config.firebase.measurementId
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

const googleProvider = new GoogleAuthProvider();

googleProvider.addScope("profile");
googleProvider.addScope("email");
googleProvider.setCustomParameters({ prompt: "select_account" });

const githubProvider = new GithubAuthProvider();
githubProvider.addScope("read:user");
githubProvider.addScope("user:email");
// githubProvider.setCustomParameters({ allow_signup: "false" });

const auth = getAuth();

const login = async (email: string, password: string) => {
  const userCredential = await signInWithEmailAndPassword(
    auth,
    email,
    password
  );
  return userCredential.user;
};

const signUp = async (email: string, password: string, userName: string) => {
  const userCredential = await createUserWithEmailAndPassword(
    auth,
    email,
    password
  );
  await updateProfile(userCredential.user, { displayName: userName });
  return userCredential.user;
};

const signUpWithGoogle = async () => {
  const userCredential = await signInWithPopup(auth, googleProvider);
  return userCredential.user;
};

const signUpWithGithub = async () => {
  const userCredential = await signInWithPopup(auth, githubProvider);
  return userCredential.user;
};

const logout = async () => {
  await auth.signOut();
};

function mapAuthCodeToMessage(authCode: string) {
  switch (authCode) {
    case "auth/invalid-password":
      return "Password provided is not corrected";

    case "auth/invalid-email":
      return "Email provided is invalid";

    case "auth/invalid-credential":
      return "Email or password is invalid";

    case "auth/user-not-found":
      return "User not found";

    case "auth/wrong-password":
      return "Password provided is not corrected";

    case "auth/email-already-in-use":
      return "Email already in use";

    case "auth/weak-password":
      return "Password is too weak";

    case "auth/too-many-requests":
      return "Too many requests. Please try again later";

    case "auth/account-exists-with-different-credential":
      return "Already have existed account with different provider";
    // Many more authCode mapping here...

    default:
      return authCode;
  }
}

const sendVerificationEmail = async (emailVerificationId: string) => {
  if (!auth.currentUser) {
    throw new Error("User not found");
  }
  // auth.currentUser.sendEmailVerification(actionCodeSettings);
  const actionCodeSettings = {
    url: "http://localhost:8080/verify-email?id=" + emailVerificationId,

    handleCodeInApp: true
  };
  const res = await sendEmailVerification(
    auth.currentUser!,
    actionCodeSettings
  );
  return res;
};

export {
  googleProvider,
  githubProvider,
  login,
  signUp,
  signUpWithGoogle,
  signUpWithGithub,
  logout,
  auth,
  mapAuthCodeToMessage,
  sendVerificationEmail,
  database
};

export default () => {
  return app;
};
