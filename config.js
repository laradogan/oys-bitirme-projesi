
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage'

const firebaseConfig = {
  apiKey: "AIzaSyAZ5syTpejRVgECFL1TkseQTi5xtizG0zY",
  authDomain: "obs-mobil-b3bcd.firebaseapp.com",
  projectId: "obs-mobil-b3bcd",
  storageBucket: "obs-mobil-b3bcd.appspot.com",
  messagingSenderId: "57355916282",
  appId: "1:57355916282:web:90b3a3a96ac6b57198ca43",
  measurementId: "G-LF2SP7RBJ0"
};

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

export { firebase };