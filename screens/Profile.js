import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Modal, TextInput, Button } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { auth, firebase } from '../firebase';
import { collection, setDoc, doc, getDoc, Firestore } from 'firebase/firestore'

export default function Profile() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [availableAmount, setAvailableAmount] = useState('');

  const handleCardPress = (cardName) => {
    if (cardName === 'Profile Update') {
      setIsModalVisible(true);
    } else {
      console.log(`Clicked on ${cardName} card!`);
      // Handle the click event for each card
    }
  };

  const pass = auth.currentUser;
  const uid = pass.uid;
  const [current, setCurrent] = useState('');
  const todoRef = firebase.firestore().collection('Users');

  const loadData = () => {
    todoRef
      .doc(uid)
      .get()
      .then((documentSnapshot) => {
        console.log('user exists:', documentSnapshot.exists);

        if (documentSnapshot.exists) {
          console.log('User data:', documentSnapshot.data());
          setCurrent(documentSnapshot.data());
        }
      });
  };

  useEffect(() => {
    loadData();
  }, []);

  const updateProfile = () => {
    const updatedData = {
      firstName: firstName,
      lastName: lastName,
    };

    todoRef.doc(uid).update(updatedData).then(() => {
      console.log('Profile updated successfully!');
      setIsModalVisible(false);
      loadData(); // Reload the updated data
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cash System</Text>

      <View style={styles.userInfo}>
        <Text style={styles.userName}>{current.firstName}</Text>
        <Text style={styles.userName}>{current.lastName}</Text>
        <Text style={styles.balance}>{current.availableAmount}</Text>
      </View>

      <View style={styles.cardContainer}>
        <TouchableOpacity style={styles.card} onPress={() => handleCardPress('Card 1')}>
          <Ionicons name="ios-speedometer" size={60} color="white" />
          <Text style={styles.cardText}>Card 1</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.card} onPress={() => handleCardPress('Card 2')}>
          <Ionicons name="ios-alarm" size={60} color="white" />
          <Text style={styles.cardText}>Card 2</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.card} onPress={() => handleCardPress('Card 3')}>
          <Ionicons name="ios-wallet" size={60} color="white" />
          <Text style={styles.cardText}>Card 3</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.card} onPress={() => handleCardPress('Profile Update')}>
          <Ionicons name="ios-person" size={60} color="white" />
          <Text style={styles.cardText}>Update Profile</Text>
        </TouchableOpacity>
      </View>

      {/* Profile Update Modal */}
      <Modal visible={isModalVisible} animationType="slide">
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>Update Profile</Text>
          <TextInput
            style={styles.input}
            placeholder="First Name"
            value={firstName}
            onChangeText={(text) => setFirstName(text)}
          />
          { <TextInput
            style={styles.input}
            placeholder="Last Name"
            value={lastName}
            onChangeText={(text) => setLastName(text)}
          />}

          
          <Button title="Save" onPress={updateProfile} />
          <Button title="Cancel" onPress={() => setIsModalVisible(false)} />
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F1F3F6',
  },
  logoutButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    padding: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    position: 'absolute',
    top: 10,
    left: 10,
  },
  userInfo: {
    marginBottom: 20,
  },
  userName: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
    color: '#333',
  },
  balance: {
    fontSize: 18,
    textAlign: 'center',
    color: '#555',
  },
  cardContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 10,
  },
  card: {
    width: 150,
    height: 150,
    backgroundColor: '#4F6D7A',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
    shadowColor: 'rgba(0, 0, 0, 0.3)',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 4,
    elevation: 5,
  },
  cardText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    marginTop: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '80%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
});
