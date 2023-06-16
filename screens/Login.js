import { useNavigation } from "@react-navigation/core";
import React, { useEffect, useState } from "react";
import {
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  View,
} from "react-native";
import { auth } from "../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";

const Login = () => {
  const navigation = useNavigation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        navigation.replace("Dashboard");
      }
    });

    return unsubscribe;
  }, []);

  const handleSignUp = () => {
    navigation.navigate("Register");
  };

  const handleLogin = () => {
    auth;
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredentials) => {
        const user = userCredentials.user;
        console.log("Logged in with:", user.email);
      })
      .catch((error) => alert(error.message));
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior="height">
      <View>
        <Text style={styles.headerText}>Welcome!</Text>
        <Text>Start your journey here</Text>
      </View>

      <Image
        style={styles.imageContainer}
        resizeMode="center"
        source={require("../assets/login-image.png")}
      />

      <View>
        <View style={styles.inputContainer}>
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

          <TouchableOpacity
            onPress={() => {
              console.log = "fp btn pressed";
            }}
          >
            <Text
              style={{
                fontWeight: "bold",
                color: "#2ecc71",
                textAlign: "right",
              }}
            >
              Forgot Password?
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={handleLogin} style={styles.button}>
            <Text style={styles.buttonText}>Get Started</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={handleSignUp}>
            <Text style={{ fontWeight: "bold" }}>
              Don't have an account?{" "}
              <Text style={{ color: "#2ecc71" }}> Register Now</Text>
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

export default Login;

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
  input: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 5,
    marginBottom: 10,
    borderWidth: 0.4,
  },
  buttonContainer: {
    alignItems: "center",
    gap: 15,
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
