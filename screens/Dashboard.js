import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { auth, firebase } from "../lib/Firebase";
import { useNavigation } from "@react-navigation/core";
import { Ionicons } from "@expo/vector-icons";

const Dashboard = () => {
  const navigation = useNavigation();

  const uid = auth.currentUser.uid;
  const [user, setUser] = useState({});
  const ref = firebase.firestore().collection("Users");

  // Function to handle logout
  const logout = () => {
    auth
      .signOut()
      .then(() => {
        navigation.replace("Login");
      })
      .catch((error) => alert(error.message));
  };

  // Function to load user data from Firestore
  const loadData = () => {
    ref.doc(uid).onSnapshot((documentSnapshot) => {
      if (documentSnapshot.exists) {
        console.log("User data: ", documentSnapshot.data());
        setUser(documentSnapshot.data());
      }
    });
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={[styles.titleText, { color: "white" }]}>Balance</Text>
          <Text style={styles.regularText}>{user.availableBalance}</Text>
        </View>

        <Pressable onPress={() => loadData()}>
          <Ionicons name="reload-outline" size={15} color="white" />
        </Pressable>
      </View>

      <View style={styles.divider} />

      <View style={styles.buttonsContainer}>
        <Pressable
          style={styles.mediumButtonContainer}
          onPress={() => navigation.navigate("Send")}
        >
          <View style={styles.circleContainer}>
            <View style={styles.circle}>
              <Ionicons name="send" size={20} color="white" />
            </View>
          </View>
          <Text style={styles.titleText}>Send</Text>
        </Pressable>

        <Pressable
          style={styles.mediumButtonContainer}
          onPress={() => navigation.navigate("QrCode")}
        >
          <View style={styles.circleContainer}>
            <View style={styles.circle}>
              <Ionicons name="qr-code" size={20} color="white" />
            </View>
          </View>
          <Text style={styles.titleText}>Scan</Text>
        </Pressable>

        <Pressable
          style={styles.mediumButtonContainer}
          onPress={() => console.log("pressed")}
        >
          <View style={styles.circleContainer}>
            <View style={styles.circle}>
              <Ionicons name="cash" size={20} color="white" />
            </View>
          </View>
          <Text style={styles.titleText}>Top up</Text>
        </Pressable>
      </View>

      <Text style={styles.label}>Shortcuts</Text>

      <View style={[styles.buttonsContainer, { justifyContent: "flex-start" }]}>
        <View>
          <Pressable
            style={{ alignItems: "center", gap: 5 }}
            onPress={() => navigation.navigate("Profile")}
          >
            <View style={styles.smallButtonContainer}>
              <Ionicons name="person" size={20} color="white" />
            </View>

            <Text style={styles.titleText}>Profile</Text>
          </Pressable>
        </View>

        <View>
          <Pressable
            style={{ alignItems: "center", gap: 5 }}
            onPress={() => navigation.navigate("CoinLists")}
          >
            <View style={styles.smallButtonContainer}>
              <Ionicons name="logo-bitcoin" size={20} color="white" />
            </View>

            <Text style={styles.titleText}>Crypto</Text>
          </Pressable>
        </View>

        <View>
          <Pressable
            style={{ alignItems: "center", gap: 5 }}
            onPress={() => navigation.navigate("TransactionHistory")}
          >
            <View style={styles.smallButtonContainer}>
              <Ionicons name="list" size={20} color="white" />
            </View>

            <Text style={styles.titleText}>Transactions</Text>
          </Pressable>
        </View>

        <View>
          <Pressable style={{ alignItems: "center", gap: 5 }} onPress={logout}>
            <View style={styles.smallButtonContainer}>
              <Ionicons name="log-out" size={20} color="white" />
            </View>

            <Text style={styles.titleText}>Logout</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
};

export default Dashboard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "white",
  },
  header: {
    height: 120,
    padding: 20,
    borderRadius: 25,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#2ecc71",
  },
  divider: {
    borderBottomColor: "lightgray",
    borderBottomWidth: StyleSheet.hairlineWidth,
    margin: 20,
  },
  titleText: {
    fontSize: 12,
  },
  label: {
    fontSize: 12,
    marginTop: 10,
    marginBottom: 10,
    color: "gray",
  },
  regularText: {
    fontSize: 30,
    color: "white",
    fontWeight: "bold",
  },
  buttonsContainer: {
    flexDirection: "row",
    marginBottom: 5,
    justifyContent: "space-evenly",
    gap: 20,
  },
  mediumButtonContainer: {
    height: 90,
    width: 90,
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    borderRadius: 20,
    alignContent: "center",
    flexWrap: "wrap",
    backgroundColor: "#EDf9EB",
  },
  circleContainer: {
    width: 40,
    height: 40,
    borderRadius: 100,
    backgroundColor: "#2E7D32",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 5,
  },
  smallButtonContainer: {
    height: 50,
    width: 50,
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    alignContent: "center",
    backgroundColor: "green",
  },
});
