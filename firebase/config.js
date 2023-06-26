import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { initializeFirestore } from "firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  getReactNativePersistence,
  initializeAuth,
} from "firebase/auth/react-native";
import "firebase/auth";
import { getStorage } from "firebase/storage";

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

const app = initializeApp(firebaseConfig);
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});
const db = initializeFirestore(app, {
  experimentalForceLongPolling: true,
});
const storage = getStorage(app);

export { auth, db, storage };
export default app;
