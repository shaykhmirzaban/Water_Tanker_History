// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBbtwq1wGLbU9Pp6NRWBtDQAat7iGaG6zs",
  authDomain: "water-tanker-history.firebaseapp.com",
  databaseURL: "https://water-tanker-history-default-rtdb.firebaseio.com",
  projectId: "water-tanker-history",
  storageBucket: "water-tanker-history.appspot.com",
  messagingSenderId: "895351580710",
  appId: "1:895351580710:web:a6335fd60e76e08fc89ee7",
  measurementId: "G-WZZ1Y7BQ2Y",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export default app;
