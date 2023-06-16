import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React, { useState, useEffect } from "react";
import { auth, firebase } from "../firebase";
import { collection, doc, getDoc, querySnapshot } from "firebase/firestore";
import { useNavigation } from "@react-navigation/core";
import { Ionicons } from "@expo/vector-icons";

const TransactionHistory = () => {
  const navigation = useNavigation();
  const user = auth.currentUser;
  const uid = user.uid;

  const todoRef = firebase.firestore().collection("Users");

  const [balance, setBalance] = useState("");

  const [users, setUsers] = useState([]);
  const toRef = todoRef.doc(uid).collection("sendTransaction");

  const [users1, setUsers1] = useState([]);
  const toReff = todoRef.doc(uid).collection("recieveTransaction");

  const rec = () => {
    navigation.navigate("TransactionReceived");
  };
  const send = () => {
    navigation.navigate("TransactionSend");
  };

  const loadData = () => {
    todoRef
      .doc(uid)
      .get()
      .then((documentSnapshot) => {
        if (documentSnapshot.exists) {
          console.log("User data: ", documentSnapshot.data());
          setBalance(documentSnapshot.data());
        }
      });
  };

  const sendTransaction = () => {
    toRef.limit(5).onSnapshot((querySnapshot) => {
      const users = [];
      querySnapshot.forEach((doc) => {
        const { amountSend, recieverName, senderName, timeStamp } = doc.data();
        users.push({
          amountSend,
          recieverName,
          senderName,
          timeStamp,
        });
      });
      users.sort((a, b) => b.timeStamp - a.timeStamp);
      setUsers(users);
    });
  };

  const recieveTransaction = () => {
    toReff.limit(5).onSnapshot((querySnapshot) => {
      const users1 = [];
      querySnapshot.forEach((doc1) => {
        const { amountRecieve, recieverName, senderName, timeStamp } =
          doc1.data();
        users1.push({
          amountRecieve,
          recieverName,
          senderName,
          timeStamp,
        });
      });
      users1.sort((a, b) => b.timeStamp - a.timeStamp);
      setUsers1(users1);
    });
  };

  useEffect(() => {
    loadData();
    sendTransaction();
    recieveTransaction();
  }, []);

  return (
    <ScrollView style={styles.container}>
      <View style={[styles.header, { justifyContent: "center" }]}>
        <Text style={{ color: "white" }}>Balance</Text>
        <Text style={[styles.headerText, { color: "white" }]}>
          $ {balance.availableAmount}
        </Text>
      </View>

      <View
        style={{
          borderBottomColor: "lightgray",
          borderBottomWidth: StyleSheet.hairlineWidth,
          margin: 30,
        }}
      />

      <Text style={styles.subHeaderText}>Transaction list</Text>

      <View>
        <View
          style={{
            marginTop: 10,
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Text style={{ fontSize: 17, fontWeight: "500" }}>Received</Text>
          <TouchableOpacity onPress={rec}>
            <Text style={{ fontWeight: "bold", color: "#2ecc71" }}>
              See all
            </Text>
          </TouchableOpacity>
        </View>

        <FlatList
          nestedScrollEnabled
          data={users1}
          renderItem={({ item }) => (
            <View>
              <View
                style={{
                  borderBottomColor: "lightgray",
                  borderBottomWidth: StyleSheet.hairlineWidth,
                  margin: 10,
                }}
              />
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: 5,
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <View style={styles.circle}>
                    <Ionicons name="cash-outline" size={20} color="white" />
                  </View>

                  <View style={{ marginStart: 10 }}>
                    <Text style={{ fontSize: 20, fontWeight: "bold" }}>
                      {item.senderName}
                    </Text>
                    <Text>
                      {new Date(item.timeStamp.seconds * 1000).toDateString()}
                      {new Date(
                        item.timeStamp.seconds * 1000
                      ).toLocaleTimeString()}
                    </Text>
                  </View>
                </View>

                <Text style={{ fontSize: 25, fontWeight: "bold" }}>
                  +${item.amountRecieve}
                </Text>
              </View>
            </View>
          )}
        />
      </View>

      <View>
        <View
          style={{
            borderBottomColor: "lightgray",
            borderBottomWidth: StyleSheet.hairlineWidth,
            margin: 10,
          }}
        />
        <View
          style={{
            marginTop: 30,
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Text style={{ fontSize: 17, fontWeight: "500" }}>Sent</Text>
          <TouchableOpacity onPress={send}>
            <Text style={{ fontWeight: "bold", color: "#2ecc71" }}>
              See all
            </Text>
          </TouchableOpacity>
        </View>

        <FlatList
          nestedScrollEnabled
          data={users}
          renderItem={({ item }) => (
            <View>
              <View
                style={{
                  borderBottomColor: "lightgray",
                  borderBottomWidth: StyleSheet.hairlineWidth,
                  margin: 10,
                }}
              />
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: 5,
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <View style={styles.circle}>
                    <Ionicons name="send-outline" size={20} color="white" />
                  </View>

                  <View style={{ marginStart: 10 }}>
                    <Text style={{ fontSize: 20, fontWeight: "bold" }}>
                      {item.recieverName}
                    </Text>
                    <Text>
                      {new Date(item.timeStamp.seconds * 1000).toDateString()}
                      {new Date(
                        item.timeStamp.seconds * 1000
                      ).toLocaleTimeString()}
                    </Text>
                  </View>
                </View>

                <Text style={{ fontSize: 25, fontWeight: "bold" }}>
                  -${item.amountSend}
                </Text>
              </View>
            </View>
          )}
        />
      </View>
      <View
        style={{
          borderBottomColor: "lightgray",
          borderBottomWidth: StyleSheet.hairlineWidth,
          margin: 10,
        }}
      />
    </ScrollView>
  );
};

export default TransactionHistory;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    padding: 20,
  },
  header: {
    height: 120,
    padding: 20,
    borderRadius: 25,
    alignItems: "center",
    backgroundColor: "#2ecc71",
  },
  headerText: {
    fontWeight: "500",
    fontSize: 50,
  },
  subHeaderText: {
    fontWeight: "500",
    fontSize: 25,
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
  circle: {
    width: 40,
    height: 40,
    borderRadius: 50,
    backgroundColor: "#2ecc71",
    justifyContent: "center",
    alignItems: "center",
  },
});
