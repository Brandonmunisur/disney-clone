// Import the functions you need from the Firebase SDKs
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDCv3zw4yjpIFnVzaVD8-H8-it7ozuULpQ",
  authDomain: "disneyplus-clone-84335.firebaseapp.com",
  projectId: "disneyplus-clone-84335",
  storageBucket: "disneyplus-clone-84335.appspot.com",
  messagingSenderId: "1081649901729",
  appId: "1:1081649901729:web:26e89391816545bc6400e0",
  measurementId: "G-Y732ZKE654",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
const db = getFirestore(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const storage = getStorage(app);

export { auth, provider, storage };
export default db;
