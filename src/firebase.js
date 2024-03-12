
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import {getStorage} from 'firebase/storage';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: import.meta.env.VITE_authDomain,
  projectId: import.meta.env.VITE_projectId,
  storageBucket: import.meta.env.VITE_storageBucket,
  messagingSenderId: import.meta.env.VITE_messagingSenderId,
  appId: import.meta.env.VITE_appId,
  measurementId: import.meta.env.VITE_measurementId
};

const app = initializeApp(firebaseConfig);
const  auth = getAuth(app);
const storage = getStorage(app);
export {app,auth,storage};


