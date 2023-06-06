// Import the functions you need from the SDKs you need
import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'
import 'firebase/compat/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB5xOJtmpNo91wYWedJZ50jO0Cyb4O4zPQ",
  authDomain: "digitalwallet-c7947.firebaseapp.com",
  projectId: "digitalwallet-c7947",
  storageBucket: "digitalwallet-c7947.appspot.com",
  messagingSenderId: "295763810520",
  appId: "1:295763810520:web:47e4b79485c18160af5fad",
  measurementId: "G-N7C7LPV6W9"
};

// Initialize Firebase
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig)
}

const auth = firebase.auth()

export { auth, firebase };