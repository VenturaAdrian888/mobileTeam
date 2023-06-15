<<<<<<< HEAD
import React from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function Profile() {
  const handleLogout = () => {
    console.log("Logout button clicked!");
    // Implement logout logic here
  };
=======
import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Modal, TextInput, Button, Image, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { auth, firebase } from '../firebase';
import { collection, setDoc, doc, getDoc, Firestore } from 'firebase/firestore';

export default function Profile() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [availableAmount, setAvailableAmount] = useState('');
>>>>>>> 47586bb4bf8282d9d76c6233c5bb50a1831ebaf6

  const handleCardPress = (cardName) => {
    if (cardName === 'Profile Update') {
      setIsModalVisible(true);
    } else {
      console.log(`Clicked on ${cardName} card!`);
      // Handle the click event for each card
    }
  };

<<<<<<< HEAD
=======
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

>>>>>>> 47586bb4bf8282d9d76c6233c5bb50a1831ebaf6
  return (
    <View style={styles.container}>

      <View style={styles.profileContainer}>
        <Image
          source={require('../assets/profile-icon.jpg')}
          style={styles.profileImage}
        />
        <Text style={styles.userName}>{current.firstName} {current.lastName}</Text>
        <Text style={styles.balance}>{current.availableAmount}</Text>
      </View>

<<<<<<< HEAD
      <View style={styles.cardContainer}>
        <TouchableOpacity
          style={styles.card}
          onPress={() => handleCardPress("Card 1")}
        >
=======
      <ScrollView contentContainerStyle={styles.cardContainer}>
        <TouchableOpacity style={styles.card} onPress={() => handleCardPress('Card 1')}>
>>>>>>> 47586bb4bf8282d9d76c6233c5bb50a1831ebaf6
          <Ionicons name="ios-speedometer" size={60} color="white" />
          <Text style={styles.cardText}>Card 1</Text>
        </TouchableOpacity>

<<<<<<< HEAD
        <TouchableOpacity
          style={styles.card}
          onPress={() => handleCardPress("Card 2")}
        >
=======
        <TouchableOpacity style={styles.card} onPress={() => handleCardPress('Card 2')}>
>>>>>>> 47586bb4bf8282d9d76c6233c5bb50a1831ebaf6
          <Ionicons name="ios-alarm" size={60} color="white" />
          <Text style={styles.cardText}>Card 2</Text>
        </TouchableOpacity>

<<<<<<< HEAD
        <TouchableOpacity
          style={styles.card}
          onPress={() => handleCardPress("Card 3")}
        >
=======
        <TouchableOpacity style={styles.card} onPress={() => handleCardPress('Card 3')}>
>>>>>>> 47586bb4bf8282d9d76c6233c5bb50a1831ebaf6
          <Ionicons name="ios-wallet" size={60} color="white" />
          <Text style={styles.cardText}>Card 3</Text>
        </TouchableOpacity>

<<<<<<< HEAD
        <TouchableOpacity
          style={styles.card}
          onPress={() => handleCardPress("Card 4")}
        >
          <Ionicons name="ios-chatbubbles" size={60} color="white" />
          <Text style={styles.cardText}>Card 4</Text>
=======
        <TouchableOpacity style={styles.card} onPress={() => handleCardPress('Profile Update')}>
          <Ionicons name="ios-person" size={60} color="white" />
          <Text style={styles.cardText}>Update Profile</Text>
>>>>>>> 47586bb4bf8282d9d76c6233c5bb50a1831ebaf6
        </TouchableOpacity>
      </ScrollView>

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
          <TextInput
            style={styles.input}
            placeholder="Last Name"
            value={lastName}
            onChangeText={(text) => setLastName(text)}
          />

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
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F1F3F6",
  },
<<<<<<< HEAD
  logoutButton: {
    position: "absolute",
    top: 10,
    right: 10,
    padding: 10,
  },
=======
>>>>>>> 47586bb4bf8282d9d76c6233c5bb50a1831ebaf6
  title: {
    fontSize: 24,
    fontWeight: "bold",
    position: "absolute",
    top: 10,
    left: 10,
  },
  profileContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  userName: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
    color: "#333",
  },
  balance: {
    fontSize: 18,
    textAlign: "center",
    color: "#555",
  },
  cardContainer: {
<<<<<<< HEAD
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center",
=======
    flexGrow: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
>>>>>>> 47586bb4bf8282d9d76c6233c5bb50a1831ebaf6
    marginHorizontal: 10,
  },
  card: {
    width: 150,
    height: 150,
<<<<<<< HEAD
    backgroundColor: "#4F6D7A",
=======
    backgroundColor: '#2E7D32',
>>>>>>> 47586bb4bf8282d9d76c6233c5bb50a1831ebaf6
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    margin: 10,
    shadowColor: "rgba(0, 0, 0, 0.3)",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 4,
    elevation: 5,
  },
  cardText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
    marginTop: 10,
  },
<<<<<<< HEAD
=======
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
>>>>>>> 47586bb4bf8282d9d76c6233c5bb50a1831ebaf6
});
