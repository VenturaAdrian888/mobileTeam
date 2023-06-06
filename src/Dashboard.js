import React, { useState, useEffect } from 'react'
import { Text, StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native'
import { firebase } from '../config'

const Dashboard = () => {

  const [name, setName] = useState('')

  useEffect(() => {
    firebase.firestore().collection('users')
      .doc(firebase.auth().currentUser.uid).get()
      .then((snapshot) => {
        if (snapshot.exists) {
          setName(snapshot.data())
        }
        else {
          console.log('User does not exist')
        }
      })
  }, [])
  return (
    <SafeAreaView style={StyleSheet.container}>
      <Text style={{ fontWeight: 'bold', fontSize: 20 }}>
        Hello, {name.firsName}
      </Text>

      <TouchableOpacity
        onPress={() => { firebase.auth().signOut }}
        style={styles.button}
      >
        <Text style={{ fontSize: 22, fontWeight: 'bold' }}>
          Sign out
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  )
}

export default Dashboard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    marginTop: 100,
  },
  button: {
    marginTop: 50,
    height: 70,
    width: 250,
    backgroundColor: '#026efd',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50,
  }
});
