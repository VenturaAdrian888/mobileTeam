import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig ={
  apiKey: "AIzaSyCr9Fyaz1-w9-NKhwNNODcGOF7hRMnjuMQ",
  authDomain: "digitalwallet-4672b.firebaseapp.com",
  projectId: "digitalwallet-4672b",
  storageBucket: "digitalwallet-4672b.appspot.com",
  messagingSenderId: "651585453330",
  appId: "1:651585453330:web:d6bd360f4e685b6db8c7cb",
  measurementId: "G-WLQSVELYEL"
}

if(!firebase.apps.length){
    firebase.initializeApp(firebaseConfig);
}
export {firebase};