import { useNavigation } from "@react-navigation/core";
import React, { useEffect, useState } from "react";
import {
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  Image,
  TextInput,
  Pressable,
  View,
} from "react-native";
import { auth, firebase } from "../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

const Register = () => {
  const navigation = useNavigation();

  const db = firebase.firestore();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [availableAmount] = useState("0");

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        navigation.replace("Dashboard");
      }
    });

    return unsubscribe;
  }, []);

  const handleSignUp = async () => {
    auth;
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredentials) => {
        const user = userCredentials.user;

        console.log("Registered with:", user.uid);

        setDoc(doc(db, "Users", user.uid), {
          firstName: firstName,
          lastName: lastName,
          email: email,
          password: password,
          availableAmount: Number(availableAmount),
        });
      })
      .catch((error) => alert(error.message));
  };

  const handleLogin = () => {
    navigation.navigate("Login");
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <View>
        <Text style={styles.headerText}>Register Now!</Text>
        <Text style={{ marginBottom: 15 }}>Fill up required information</Text>
      </View>

      <Image
        style={styles.imageContainer}
        resizeMode="contain"
        source={require("../assets/register-image.png")}
      />

      <View>
        <View style={styles.inputContainer}>
          <Text style={{ fontWeight: "bold" }}>Full Name</Text>
          <View style={styles.nameRowContainer}>
            <TextInput
              placeholder="First Name"
              value={firstName}
              onChangeText={(text) => setFirstName(text)}
              style={styles.inputName}
            ></TextInput>

            <TextInput
              placeholder="Last Name"
              value={lastName}
              onChangeText={(text) => setLastName(text)}
              style={styles.inputName}
            />
          </View>
          <Text style={{ fontWeight: "bold" }}>Email</Text>
          <TextInput
            placeholder="Enter your email"
            value={email}
            onChangeText={(text) => setEmail(text)}
            style={styles.input}
          ></TextInput>
          <Text style={{ fontWeight: "bold" }}>Password</Text>
          <TextInput
            placeholder="Enter your password"
            value={password}
            onChangeText={(text) => setPassword(text)}
            style={styles.input}
            secureTextEntry
          ></TextInput>
        </View>

        <View style={styles.buttonContainer}>
          <Pressable onPress={handleSignUp} style={styles.button}>
            <Text style={styles.buttonText}>Register</Text>
          </Pressable>

          <Pressable onPress={handleLogin}>
            <Text style={{ fontWeight: "bold" }}>
              Already have an account?
              <Text style={{ color: "#2ecc71" }}> Login</Text>
            </Text>
          </Pressable>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

export default Register;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    backgroundColor: "white",
    paddingTop: 30,
    padding: 16,
  },
  headerText: {
    fontWeight: "500",
    fontSize: 40,
  },
  inputContainer: {
    gap: 3,
    marginBottom: 30,
  },
  nameRowContainer: {
    width: "100%",
    justifyContent: "space-between",
    flexDirection: "row",
    marginBottom: 7,
    gap: 7,
  },
  input: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 5,
    marginBottom: 10,
    borderWidth: 0.4,
  },
  inputName: {
    width: "100%",
    flex: 1,
    backgroundColor: "white",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 5,
    borderWidth: 0.4,
  },
  buttonContainer: {
    alignItems: "center",
    gap: 10,
  },
  button: {
    backgroundColor: "#2ecc71",
    width: "100%",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontWeight: "500",
    fontSize: 15,
  },
  imageContainer: {
    flex: 1,
    width: undefined,
  },
});
