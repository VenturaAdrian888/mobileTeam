import { useNavigation } from '@react-navigation/core'
import React, { useEffect, useState } from 'react'
import { KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
// import { auth } from '../firebase'
import { firebase } from '../firebase'
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, updateCurrentUser  } from "firebase/auth";
import { updateDoc } from 'firebase/firestore';



const LoginScreen = () => {
  const todoRef = firebase.firestore().collection('Users');
  const auth = getAuth();
  const navigation = useNavigation()
  
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [availableAmount, setAvailableAmount] = useState('0')

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        navigation.navigate("Main")
      }
    })

    return unsubscribe
  }, [])

//sign up 
  const handleSignUp = async () => {
    const querySnapshot = await todoRef.get();
    const users = [email];
      querySnapshot.forEach((documentSnapshot)=>{
          const userdata = documentSnapshot.data();
      })

    if (email.length == 0) {
      alert("Please Enter Email");
    }
    //validate if meron ng existing user
    // else if ('auth/email-already-in-use'){
    //   alert("Email is already used")
    // }
    else if  (password.length == 0){
      alert("Please Enter Password")
    }
    
    else{
      const data ={
        email: email,
        password: password,
        availableAmount: Number( availableAmount),
         
      }
      todoRef // To Save inputed credentials in firestore
          .add(data).then(()=>{
            setEmail('');
            setPassword('');
            setAvailableAmount('0')
          }).catch((error)=>{
            alert(error)
          })
      createUserWithEmailAndPassword(auth, email, password)
      .then((userCredentials) => {
        const user = userCredentials.user;
      
        console.log('Registered with:', user.email);
      }).catch((error)=>{
        const errorMessage = error.message;
        console.log(errorMessage);
      })
    }
  }
//Sign in..



  const handleLogin = () => {
      

    if(email.length == 0){
      alert("Please Enter Email!");
    }
    
    else {
      signInWithEmailAndPassword(auth, email, password)
      .then(userCredentials => {
        const user = userCredentials.user;
        console.log('Logged in with:', user.email);
        
      
      })
      .catch(error => alert(error.message))
    }
  };


  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior="padding"
    >
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={text => setEmail(text)}
          style={styles.input}
        />
        <TextInput
          placeholder="Password"
          value={password}
          onChangeText={text => setPassword(text)}
          style={styles.input}
          secureTextEntry
        />
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          onPress={handleLogin}
          style={styles.button}
        >
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handleSignUp}
          style={[styles.button, styles.buttonOutline]}
        >
          <Text style={styles.buttonOutlineText}>Register</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  )
}

export default LoginScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputContainer: {
    width: '80%'
  },
  input: {
    backgroundColor: 'white',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 5,
  },
  buttonContainer: {
    width: '60%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
  },
  button: {
    backgroundColor: '#0782F9',
    width: '100%',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonOutline: {
    backgroundColor: 'white',
    marginTop: 5,
    borderColor: '#0782F9',
    borderWidth: 2,
  },
  buttonText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 16,
  },
  buttonOutlineText: {
    color: '#0782F9',
    fontWeight: '700',
    fontSize: 16,
  },
})