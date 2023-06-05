import React,{useState} from 'react'
import { View, Text, TouchableOpacity, TextInput, StyleSheet } from 'react-native'
import {firebase} from '../config'

const Regsiter =() =>{
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [availableBalance, useAvailableName] = useState('');

  registerUser = async (email, password, firstName, lastName, availableBalance)=> {
      await firebase.auth().createUserWithEmailAndPassword(email, password)
      .then(() => {
        firebase.auth().currentUser.sendEmailVerification({
          handleCodeInApp: true,
          url:'https://digitalwallet-4672b.firebaseapp.com',

        })
        .then (()=>{
        alert('Verification email sent')
      }).catch((error)=>{
      alert(error.message)
      })
      .then(()=> {
        firebase.firestore().collection('users')
        .doc(firebase.auth().currentUser.uid)
        .set({
          firstName,
          lastName,
          email,
          password,
          
        }).setMaxUploadRetryTimeMillis(999999999999999999)
      })
      .catch((error)=> {
        alert(error.message)
      })
      })
      .catch((error=>{
        alert(error.message)
      }))

  }

  return(
    <View style={styles.container}>
        <Text style={{fontWeight:'bold', fontSize:23}}>
          Register Here!
        </Text>
        <View style={{marginTop:40}}>
          <TextInput
              style={styles.textInput}
              placeholder='First Name'
              onChange={(firstName) => setFirstName(firstName)}
              autoCorrect={false}
          />
          <TextInput
              style={styles.textInput}
              placeholder='Last Name'
              onChange={(lastName) => setLastName(lastName)}
              autoCorrect={false}
          />
          <TextInput
              style={styles.textInput}
              placeholder='Email'
              onChange={(email) => setEmail(email)}
              autoCorrect={false}
              autoCapitalize='none'
              keyboardType='email-address'
          />
          <TextInput
              style={styles.textInput}
              placeholder='Password'
              onChange={(password) => setPassword(password)}
              autoCorrect={(false)}
              autoCapitalize='none'
              secureTextEntry={true}
          />
        </View>
        <TouchableOpacity 
            onPress={() => registerUser(email, password, firstName, lastName)}
            style={styles.button}
        >
          <Text style={{fontWeight:'bold', fontSize:22}}>Register</Text>
        </TouchableOpacity>
    </View>
  )
}

export default Regsiter;
const styles = StyleSheet.create({
  container:{
      flex:1,
      alignItems: 'center',
      marginTop:100,
  },
  textInput:{
      paddingTop:20,
      paddingBottom:10,
      width:400,
      fontSize:20,
      borderBottomWidth:1,
      borderBottomColor:'#000',
      marginBottom:10,
      textAlign:'center'
  },
  button:{
      marginTop: 50,
      height:70,
      width: 250,
      backgroundColor:'#026efd',
      alignItems:'center',
      justifyContent:'center',
      borderRadius:50,
  }
});
