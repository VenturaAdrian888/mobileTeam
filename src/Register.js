import React, { useState } from 'react'
import { View, Text, TouchableOpacity, TextInput, StyleSheet } from 'react-native'
import { firebase } from '../config'
import { Ionicons } from "@expo/vector-icons"

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [availableBalance, useAvailableName] = useState('');

  registerUser = async (email, password, firstName, lastName, availableBalance) => {
    await firebase.auth().createUserWithEmailAndPassword(email, password)
      .then(() => {
        firebase.auth().currentUser.sendEmailVerification({
          handleCodeInApp: true,
          url: 'https://digitalwallet-4672b.firebaseapp.com',

        })
          .then(() => {
            alert('Verification email sent')
          }).catch((error) => {
            alert(error.message)
          })
          .then(() => {
            firebase.firestore().collection('users')
              .doc(firebase.auth().currentUser.uid)
              .set({
                firstName,
                lastName,
                email,
                password,

              }).setMaxUploadRetryTimeMillis(999999999999999999)
          })
          .catch((error) => {
            alert(error.message)
          })
      })
      .catch((error => {
        alert(error.message)
      }))

  }

  return (
    <View style={styles.container}>
      <View>
        <Text style={{ fontWeight: 'bold', fontSize: 40, textAlign: 'center' }}>
          Create an account
        </Text>

        <Text style={{ fontSize: 15, marginBottom: 30, textAlign: 'center' }}>
          Fill up required information
        </Text>

        <Text style={{ fontSize: 12, marginBottom: 5, textAlign: 'left' }}>
          Full name
        </Text>
        <View style={{ flexDirection: 'row' }}>
          <View style={[styles.textInputLayout, { width: 145, marginEnd: 5 }]}>
            <Ionicons name="person-outline" size={20} color="black" style={styles.icon} />
            <TextInput
              style={styles.textInput}
              placeholder='First Name'
              onChange={(firstName) => setFirstName(firstName)}
              autoCorrect={false}
            />
          </View>

          <View style={[styles.textInputLayout, { width: 145, marginStart: 5 }]}>
            <Ionicons name="person-outline" size={20} color='black' style={styles.icon} />
            <TextInput
              style={styles.textInput}
              placeholder='Last Name'
              onChange={(lastName) => setLastName(lastName)}
              autoCorrect={false}
            />
          </View>
        </View>

        <Text style={{ fontSize: 12, marginBottom: 5, textAlign: 'left' }}>
          Email
        </Text>
        <View style={styles.textInputLayout}>
          <Ionicons name="mail-outline" size={20} color="black" style={styles.icon} />
          <TextInput
            style={styles.textInput}
            placeholder='Type your email'
            onChange={(email) => setEmail(email)}
            autoCorrect={false}
            autoCapitalize='none'
            keyboardType='email-address'
          />
        </View>

        <Text style={{ fontSize: 12, marginBottom: 5, textAlign: 'left' }}>
          Password
        </Text>
        <View style={styles.textInputLayout}>
          <Ionicons name="lock-closed-outline" size={20} color="black" style={styles.icon} />
          <TextInput
            style={styles.textInput}
            placeholder='Enter password here'
            onChange={(password) => setPassword(password)}
            autoCorrect={(false)}
            autoCapitalize='none'
            secureTextEntry={true}
          />
        </View>


        <TouchableOpacity
          onPress={() => registerUser(email, password, firstName, lastName)}
          style={[styles.button, { marginTop: 10 }]} >
          <Text style={{ fontWeight: 'bold', fontSize: 20, color: 'white' }}>Create Account</Text>
        </TouchableOpacity>
      </View>
    </View >
  )
}

export default Register;
const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'white'
  },
  textInputLayout: {
    marginBottom: 10,
    borderWidth: 0.5,
    height: 45,
    width: 300,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    borderRadius: 5,
  },
  textInput: {
    flex: 1,
    flexWrap: 'nowrap',
  },
  icon: {
    padding: 5,
  },
  button: {
    height: 45,
    width: 300,
    backgroundColor: 'deepskyblue',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
  },
});