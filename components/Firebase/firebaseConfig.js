import Firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/firestore';
import 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyCUiLsoeh4JFWxCS4BNX8-PqP0UNigO_IA",
  authDomain: "ldw-dindin.firebaseapp.com",
  databaseURL: "https://ldw-dindin-default-rtdb.asia-southeast1.firebasedatabase.app/",
  projectId: "ldw-dindin",
  storageBucket: "ldw-dindin.appspot.com",
  messagingSenderId:  "146255052197",
  appId: "1:146255052197:web:e64ed428d36c7b4e5ebc4c"
};

  const firebase=Firebase.initializeApp(firebaseConfig);
  const db=firebase.firestore();
  export{firebase,db};