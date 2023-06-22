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
  apiKey: "AIzaSyBIgZeMeEBzh3mG2iA-Nqj8y0lVaJulK0U",
  authDomain: "goit-native-app.firebaseapp.com",
  databaseURL:
    "https://goit-native-app-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "goit-native-app",
  storageBucket: "goit-native-app.appspot.com",
  messagingSenderId: "66752003243",
  appId: "1:66752003243:web:da3e829a892f93d85ccbee",
};

// const firebaseConfig = {
//   apiKey: "AIzaSyB4ib9DVkgNpPyCb9Cx3WCl5Da4pcnJyPw",
//   authDomain: "reactnative-learn.firebaseapp.com",
//   databaseURL: "https://reactnative-learn-default-rtdb.firebaseio.com",
//   projectId: "reactnative-learn",
//   storageBucket: "reactnative-learn.appspot.com",
//   messagingSenderId: "251898464940",
//   appId: "1:251898464940:web:11b9cf96b32884ef832d09",
//   measurementId: "G-GJWGZXQFHF",
// };

const app = initializeApp(firebaseConfig);
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});
export const db = getFirestore(app);
export const storage = getStorage(app);
export default app;
