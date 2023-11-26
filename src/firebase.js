import "firebase/compat/auth";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAQX-Hdtnwr6ARCzW8To0tkhpVoUuUgA28",
  authDomain: "bigexpert-7ada2.firebaseapp.com",
  projectId: "bigexpert-7ada2",
  storageBucket: "bigexpert-7ada2.appspot.com",
  messagingSenderId: "472645230023",
  appId: "1:472645230023:web:6d7ec1f7302f8d114e8de2",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// export
export const auth = getAuth(app);
