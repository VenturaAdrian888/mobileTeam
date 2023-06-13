import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { auth, firebase } from '../firebase';
import { collection, setDoc, doc, getDoc, querySnapshot, documentSnapshot, getDocs, snapshotEqual, onSnapshot } from 'firebase/firestore';

const SendCash = () => {
  const user = auth.currentUser;
  const ownid = user.uid;

  const todoRef = firebase.firestore().collection('Users');

  const [availableAmount1, setAvailableAmount1] = useState('');
  const [uid, setUid] = useState('');
  const [current1, setCurrent1] = useState('');

  const loadData = () => {
    todoRef
      .doc(ownid)
      .get()
      .then(documentSnapshot => {
        if (documentSnapshot.exists) {
          console.log('User data: ', documentSnapshot.data());
          setCurrent1(documentSnapshot.data());
        }
      });
  };

  useEffect(() => {
    loadData();
  }, []);

  const updateData = () => {

    //input                               from firebase
    if (Number(availableAmount1) < Number(current1.availableAmount)) {
      todoRef
        .doc(uid)
        .update({           //input                         from firebase
          availableAmount: Number(availableAmount1) + Number(current1.availableAmount)
        })
        .then(() => {
          todoRef
            .doc(ownid)
            .update({           //input                         from firebase
              availableAmount: Number(current1.availableAmount) - Number(availableAmount1)
            });
        });
      console.log('You have sent: ', availableAmount1, 'to', uid);
      alert('Successful Transaction');
    } else if (Number(availableAmount1) > Number(current1.availableAmount)) {
      console.log('KULANG PERA MO PRE');
      alert('Insufficient funds');
    } else if (Number(availableAmount1) === Number(current1.availableAmount)) {
      todoRef
        .doc(uid)
        .update({           //from input                      from firebase
          availableAmount: Number(availableAmount1) + Number(current1.availableAmount)
        })
        .then(() => {
          todoRef
            .doc(ownid)
            .update({           //from input                      from firebase
              availableAmount: Number(current1.availableAmount) - Number(availableAmount1)
            });
        });
      console.log('You have sent: ', availableAmount1, 'to', uid);
      alert('Successful Transaction');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Send Cash</Text>
      <View style={styles.inputContainer}>
        <Text style={styles.balanceText}>Wallet Balance: {current1.availableAmount}</Text>
        <TextInput
          value={uid}
          onChangeText={setUid}
          placeholder="Enter User UID"
          style={styles.input}
        />
        <TextInput
          value={availableAmount1}
          onChangeText={setAvailableAmount1}
          placeholder="How much do you wish to send"
          style={styles.input}
        />
      </View>
      <TouchableOpacity onPress={updateData} style={styles.button}>
        <Text style={styles.buttonText}>Send</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SendCash;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  inputContainer: {
    width: '80%',
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    marginBottom: 20,
  },
  balanceText: {
    fontSize: 16,
    marginBottom: 10,
  },
  input: {
    backgroundColor: '#F2F2F2',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#0782F9',
    width: '80%',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 16,
  },
<<<<<<< HEAD
});
=======
});
>>>>>>> 620055a0c73f4989e2dce3f5dcbc26a51ddf24c3
