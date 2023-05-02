import { initializeApp } from "firebase/app";
import AsyncStorage from "@react-native-async-storage/async-storage";

import {
  getReactNativePersistence,
  initializeAuth,
} from "firebase/auth/react-native";
import "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB4ib9DVkgNpPyCb9Cx3WCl5Da4pcnJyPw",
  authDomain: "reactnative-learn.firebaseapp.com",
  databaseURL: "https://reactnative-learn-default-rtdb.firebaseio.com",
  projectId: "reactnative-learn",
  storageBucket: "reactnative-learn.appspot.com",
  messagingSenderId: "251898464940",
  appId: "1:251898464940:web:11b9cf96b32884ef832d09",
  measurementId: "G-GJWGZXQFHF",
};

const app = initializeApp(firebaseConfig);
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});
export const db = getFirestore(app);
export const storage = getStorage(app);
export default app;
