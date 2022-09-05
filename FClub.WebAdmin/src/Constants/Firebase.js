import * as firebase from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBqDw1-2F_ycVi-Y6VTztrfekcl3WBbs9I",
  authDomain: "auth-club-management-dev.firebaseapp.com",
  databaseURL:
    "https://auth-club-management-dev-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "auth-club-management-dev",
  storageBucket: "auth-club-management-dev.appspot.com",
  messagingSenderId: "200059558387",
  appId: "1:200059558387:web:9ca9d25db8839b96531a86",
};

firebase.initializeApp(firebaseConfig);

export const auth = getAuth();

export const storage = getStorage();

export default firebase;
