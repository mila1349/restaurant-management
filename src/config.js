import firebase from "firebase" 
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAmnBWmcnL3rIJ8SSOX861WAdp_l7WIBcw",
    authDomain: "restaurant-8c9dd.firebaseapp.com",
    projectId: "restaurant-8c9dd",
    storageBucket: "restaurant-8c9dd.appspot.com",
    messagingSenderId: "877931064182",
    appId: "1:877931064182:web:1f8b2824be513862ea2857",
    measurementId: "G-E6HJ2VW0VS"
  };

  const firebaseApp=firebase.initializeApp(firebaseConfig);
  const db = firebaseApp.firestore();   
  const auth = firebase.auth(); 
  const storage = firebase.storage();
  const storageRef = storage.ref();     

  export {db, auth, storage, storageRef};