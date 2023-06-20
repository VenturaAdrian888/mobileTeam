import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, FlatList, ScrollView } from "react-native";
import { auth, firebase } from "../lib/Firebase";
import { Ionicons } from "@expo/vector-icons";

const TransactionSent = () => {
  const uid = auth.currentUser.uid;

  const [currentUser, setCurrentUser] = useState("");
  const [sentTransactions, setSentTransactions] = useState([]);

  const currentUserRef = firebase.firestore().collection("Users");
  const sentTransactionRef = currentUserRef
    .doc(uid)
    .collection("sentTransaction");

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

  // Load sent transactions
  const loadSentTransactions = () => {
    sentTransactionRef.onSnapshot((querySnapshot) => {
      const sent = [];
      querySnapshot.forEach((doc) => {
        const { amountSent, receiverName, senderName, timeStamp } = doc.data();
        sent.push({
          amountSent,
          receiverName,
          senderName,
          timeStamp,
        });
      });
      sent.sort((a, b) => b.timeStamp - a.timeStamp);
      setSentTransactions(sent);
    });
  };

  useEffect(() => {
    loadData();
    loadSentTransactions();
  }, []);

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.subHeaderText}>Sent transaction lists</Text>

      {/* Transaction List */}
      <View>
        <FlatList
          nestedScrollEnabled
          data={sentTransactions}
          renderItem={({ item }) => (
            <View>
              {/* Divider */}
              <View style={styles.transactionDivider} />

              {/* Transaction Item */}
              <View style={styles.transactionRow}>
                <View style={styles.transactionInfo}>
                  <View style={styles.circle}>
                    <Ionicons name="send-outline" size={24} color="white" />
                  </View>
                  <View style={styles.transactionDetails}>
                    <Text style={styles.transactionTitle}>
                      {item.receiverName}
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
                  -${item.amountSent}
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

export default TransactionSent;

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
