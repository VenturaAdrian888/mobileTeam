// Import the functions you need from the SDKs you need
import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'
import 'firebase/compat/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCr9Fyaz1-w9-NKhwNNODcGOF7hRMnjuMQ",
  authDomain: "digitalwallet-4672b.firebaseapp.com",
  projectId: "digitalwallet-4672b",
  storageBucket: "digitalwallet-4672b.appspot.com",
  messagingSenderId: "651585453330",
  appId: "1:651585453330:web:d6bd360f4e685b6db8c7cb",
  measurementId: "G-WLQSVELYEL"
}

// Initialize Firebase
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig)
}

const auth = firebase.auth()
const db = firebase.firestore();

export { auth, firebase, db};