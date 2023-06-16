import { View, Text, StyleSheet, FlatList, ScrollView } from "react-native";
import React, { useState, useEffect } from "react";
import { auth, firebase } from "../firebase";
import { Ionicons } from "@expo/vector-icons";

const TransactionListReceived = () => {
  const user = auth.currentUser;
  const uid = user.uid;

  const todoRef = firebase.firestore().collection("Users");

  const [balance, setBalance] = useState("");

  const [users, setUsers] = useState([]);

  const [users1, setUsers1] = useState([]);
  const toReff = todoRef.doc(uid).collection("recieveTransaction");

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

  const recieveTransaction = () => {
    toReff.onSnapshot((querySnapshot) => {
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

    recieveTransaction();
  }, []);

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.subHeaderText}>Received transaction list</Text>

      <View>
        <View
          style={{
            marginTop: 10,
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        ></View>

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
      </View>
    </ScrollView>
  );
};

export default TransactionListReceived;

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
