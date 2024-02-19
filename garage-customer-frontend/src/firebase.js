import { initializeApp } from "firebase/app";
import env from "react-dotenv";
import { getStorage } from 'firebase/storage';


const firebaseConfig = {
  apiKey: env.REACT_APP_FIREBASE_API_KEY,

  authDomain: env.REACT_APP_FIREBASE_AUTH_DOMAIN,

  projectId: env.REACT_APP_FIREBASE_PROJECT_ID,

  storageBucket: "garage-customer-app-5b9b1.appspot.com",

  messagingSenderId: env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,

  appId: env.REACT_APP_FIREBASE_APP_ID

};


export const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);