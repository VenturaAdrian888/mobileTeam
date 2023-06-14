import { useNavigation } from '@react-navigation/core'
import React, { useEffect, useState } from 'react'
import { KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { auth, firebase } from '../firebase'
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, updateCurrentUser } from "firebase/auth";
import { updateDoc, doc, setDoc } from 'firebase/firestore';
import { Ionicons } from '@expo/vector-icons';

const Login = () => {
  const todoRef = firebase.firestore().collection('Users');

  const navigation = useNavigation()


  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        navigation.replace("Main")
      }
    })

    return unsubscribe
  }, [])

  const handleSignUp = () => {
    navigation.navigate("Register")
  }

  const handleLogin = () => {
    auth
    signInWithEmailAndPassword(auth, email, password)
      .then(userCredentials => {
        const user = userCredentials.user;
        console.log('Logged in with:', user.email);


      })
      .catch(error => alert(error.message))

  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior="height" >

      <Text style={styles.headerText}> Welcome!</Text>
      <Text> Sign in to continue! </Text>

      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Email"
          
          value={email}
          onChangeText={text => setEmail(text)}
          style={styles.input}>
        </TextInput>

        <TextInput
          placeholder="Password"
          
          value={password}
          onChangeText={text => setPassword(text)}
          style={styles.input}
          secureTextEntry />
      </View>

      <View style={styles.buttonContainer}>

        <TouchableOpacity
          onPress={handleLogin}
          style={styles.button}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={handleSignUp}>
          <Text style={{ fontWeight: "bold" }}>Don't have an account? Register now</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  )
}

export default Login

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  inputContainer: {
    width: '70%',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 20,
  },
  input: {
    width: '100%',
    backgroundColor: 'white',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 5,
    borderWidth: 0.4
  },
  buttonContainer: {
    width: '70%',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10
  },
  button: {
    backgroundColor: '#2E7D32',
    width: '100%',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  headerText: {
    color: 'black',
    fontWeight: '700',
    fontSize: 40,
    textAlign: "center",
  },
  buttonText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 16,
  },
})