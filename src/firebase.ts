import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDLiUyI1hEMCF6mfzZ7iG_5SP8s7fdg3TE",
  authDomain: "financial-tracker-app-web.firebaseapp.com",
  projectId: "financial-tracker-app-web",
  storageBucket: "financial-tracker-app-web.firebasestorage.app",
  messagingSenderId: "96746331254",
  appId: "1:96746331254:web:c369a1a6b335b1bfb09357"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app;


