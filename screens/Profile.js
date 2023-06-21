import React, { useState, useEffect } from "react";
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  Modal,
  TextInput,
  Button,
  Image,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { auth, firebase } from "../lib/Firebase";

export default function Profile() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const handleCardPress = () => {
    setIsModalVisible(true);
  };

  const pass = auth.currentUser;
  const uid = pass.uid;
  const [current, setCurrent] = useState("");
  const todoRef = firebase.firestore().collection("Users");

  const loadData = () => {
    todoRef
      .doc(uid)
      .get()
      .then((documentSnapshot) => {
        console.log("user exists:", documentSnapshot.exists);

        if (documentSnapshot.exists) {
          console.log("User data:", documentSnapshot.data());
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

    todoRef
      .doc(uid)
      .update(updatedData)
      .then(() => {
        console.log("Profile updated successfully!");
        setIsModalVisible(false);
        loadData(); // Reload the updated data
      });
  };

  return (
    <View style={styles.container}>
      <View style={styles.profileContainer}>
        <Image
          source={require("../assets/profile-icon.jpg")}
          style={styles.profileImage}
        />
        <Text style={styles.userName}>
          {current.firstName} {current.lastName}
        </Text>
        <View style={styles.accountNumberContainer}>
          <Text style={styles.accountNumberTitle}>Account Number</Text>
          <Text style={styles.accountNumber}>{uid}</Text>
        </View>
      </View>

      <TouchableOpacity style={styles.card} onPress={handleCardPress}>
        <Ionicons name="ios-person" size={60} color="white" />
        <Text style={styles.cardText}>Update Profile</Text>
      </TouchableOpacity>

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
  profileContainer: {
    alignItems: "center",
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
  accountNumberContainer: {
    alignItems: "center",
  },
  accountNumberTitle: {
    fontSize: 18,
    color: "#666",
    marginBottom: 5,
  },
  accountNumber: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#222",
  },
  card: {
    width: 150,
    height: 150,
    backgroundColor: "#2E7D32",
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
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    width: "80%",
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
});
