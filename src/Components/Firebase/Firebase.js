// firebase.js or firebaseConfig.js

import { initializeApp } from "firebase/app";
import {getAuth,GoogleAuthProvider} from "firebase/auth";

// Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: "AIzaSyCcCVQtJi_TlH8babWUmaTk9RDfOfGS5ko",
//   authDomain: "easeshop-d9074.firebaseapp.com",
//   projectId: "easeshop-d9074",
//   storageBucket: "easeshop-d9074.appspot.com",
//   messagingSenderId: "943238333664",
//   appId: "1:943238333664:web:12ed8b082544d230fc3c85",
//   measurementId: "G-RSX8ZDGJP1"
// };

const firebaseConfig = {
  apiKey: "AIzaSyB322sTIw-jdV5YmDzJxswh5gG19WogDDw",
  authDomain: "easeshop-1b215.firebaseapp.com",
  projectId: "easeshop-1b215",
  storageBucket: "easeshop-1b215.appspot.com",
  messagingSenderId: "856877177561",
  appId: "1:856877177561:web:1432076f0989ffbfd9bcc8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and Google Auth Provider
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export default app;

