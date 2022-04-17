import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyC5SMQydiZuZAm6u47bEstEKJoeZ48qN64",
    authDomain: "cpwe-storage.firebaseapp.com",
    projectId: "cpwe-storage",
    storageBucket: "cpwe-storage.appspot.com",
    messagingSenderId: "211136242213",
    appId: "1:211136242213:web:64f723d85c83165b60d5cc",
    measurementId: "G-3GEHWKL7WS",
};

const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
