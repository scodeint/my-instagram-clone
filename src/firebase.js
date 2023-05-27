import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';

const firebaseConfig = {
    apiKey: "AIzaSyB5kuq6JirPNomCzqdlSwauJOwZMUXDLZs",
    authDomain: "instagram-clone-react-8994e.firebaseapp.com",
    projectId: "instagram-clone-react-8994e",
    storageBucket: "instagram-clone-react-8994e.appspot.com",
    messagingSenderId: "506322765014",
    appId: "1:506322765014:web:eb8e1be60887d1dd8a3577",
    measurementId: "G-GW73MXD5E5"
  };

  const firebaseApp = firebase.initializeApp(firebaseConfig);
  const db = firebaseApp.firestore();
  const auth = firebase.auth();
  const storage =  firebase.storage();

  export  {db, auth, storage};


