// firebaseTest.js
import firebase from 'firebase/app';
import 'firebase/database';
import { firebaseConfig } from './firebaseConfig';

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const firebaseTest = () => {
  const dbRef = firebase.database().ref();
  dbRef.set('Merhaba, Dünya!');
}

export default firebaseTest;
