import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, FlatList, ScrollView } from "react-native";
import { auth, firebase } from "../lib/Firebase";
import { Ionicons } from "@expo/vector-icons";

const TransactionReceived = () => {
  const uid = auth.currentUser.uid;

  const [currentUser, setCurrentUser] = useState("");
  const [receivedTransactions, setReceivedTransactions] = useState([]);

  const currentUserRef = firebase.firestore().collection("Users");
  const receivedTransactionRef = currentUserRef
    .doc(uid)
    .collection("receivedTransaction");

  // Load current user data
  const loadData = () => {
    currentUserRef
      .doc(uid)
      .get()
      .then((documentSnapshot) => {
        if (documentSnapshot.exists) {
          console.log("User data: ", documentSnapshot.data());
          setCurrentUser(documentSnapshot.data());
        }
      });
  };

  // Load received transactions
  const loadReceivedTransactions = () => {
    receivedTransactionRef.onSnapshot((querySnapshot) => {
      const received = [];
      querySnapshot.forEach((doc) => {
        const { amountReceived, receiverName, senderName, timeStamp } =
          doc.data();
        received.push({
          amountReceived,
          receiverName,
          senderName,
          timeStamp,
        });
      });
      received.sort((a, b) => b.timeStamp - a.timeStamp);
      setReceivedTransactions(received);
    });
  };

  useEffect(() => {
    loadData();
    loadReceivedTransactions();
  }, []);

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.subHeaderText}>Received transaction list</Text>

      <View>
        {/* Transaction List */}
        <FlatList
          nestedScrollEnabled
          data={receivedTransactions}
          renderItem={({ item }) => (
            <View>
              {/* Divider */}
              <View style={styles.transactionDivider} />

              {/* Transaction Item */}
              <View style={styles.transactionRow}>
                <View style={styles.transactionInfo}>
                  <View style={styles.circle}>
                    <Ionicons name="cash-outline" size={24} color="white" />
                  </View>
                  <View style={styles.transactionDetails}>
                    <Text style={styles.transactionTitle}>
                      {item.senderName}
                    </Text>
                    <Text>
                      {new Date(item.timeStamp.seconds * 1000).toDateString()}
                    </Text>
                    <Text>
                      {new Date(
                        item.timeStamp.seconds * 1000
                      ).toLocaleTimeString()}
                    </Text>
                  </View>
                </View>
                <Text style={styles.transactionAmount}>
                  +${item.amountReceived}
                </Text>
              </View>
            </View>
          )}
        />
      </View>

      {/* Divider */}
      <View style={styles.transactionDivider} />
    </ScrollView>
  );
};

export default TransactionReceived;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    padding: 20,
  },
  subHeaderText: {
    fontWeight: "500",
    fontSize: 25,
  },
  transactionDivider: {
    borderBottomColor: "lightgray",
    borderBottomWidth: StyleSheet.hairlineWidth,
    margin: 10,
  },
  transactionRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 5,
  },
  transactionInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  circle: {
    width: 50,
    height: 50,
    borderRadius: 50,
    backgroundColor: "#2ecc71",
    justifyContent: "center",
    alignItems: "center",
  },
  transactionDetails: {
    marginStart: 10,
  },
  transactionTitle: {
    fontSize: 20,
    fontWeight: "bold",
  },
  transactionAmount: {
    fontSize: 25,
    fontWeight: "bold",
  },
});
