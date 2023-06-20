import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { auth, firebase } from "../lib/Firebase";
import { useNavigation } from "@react-navigation/core";
import { Ionicons } from "@expo/vector-icons";

const TransactionHistory = () => {
  const navigation = useNavigation();

  const currentUserUID = auth.currentUser.uid;

  const [currentUser, setCurrentUser] = useState("");
  const [sentTransactions, setSentTransactions] = useState([]);
  const [receivedTransactions, setReceivedTransactions] = useState([]);

  const currentUserRef = firebase.firestore().collection("Users");
  const sentTransactionRef = currentUserRef
    .doc(currentUserUID)
    .collection("sentTransaction");
  const receivedTransactionRef = currentUserRef
    .doc(currentUserUID)
    .collection("receivedTransaction");

  const loadData = () => {
    currentUserRef
      .doc(currentUserUID)
      .get()
      .then((documentSnapshot) => {
        if (documentSnapshot.exists) {
          console.log("User data: ", documentSnapshot.data());
          setCurrentUser(documentSnapshot.data());
        }
      });
  };

  const loadSentTransactions = () => {
    sentTransactionRef.limit(5).onSnapshot((querySnapshot) => {
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

  const loadReceivedTransactions = () => {
    receivedTransactionRef.limit(5).onSnapshot((querySnapshot) => {
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
    loadSentTransactions();
    loadReceivedTransactions();
  }, []);

  return (
    <ScrollView style={styles.container}>
      {/* Balance */}
      <View style={[styles.header, styles.centeredContainer]}>
        <Text style={styles.whiteText}>Balance</Text>
        <Text style={[styles.headerText, styles.whiteText]}>
          $ {currentUser.availableBalance}
        </Text>
      </View>

      {/* Divider */}
      <View style={styles.divider}></View>

      {/* Transaction List */}
      <Text style={styles.subHeaderText}>Transaction list</Text>

      {/* Received Transactions */}
      <View>
        <View style={styles.rowContainer}>
          <Text style={styles.sectionTitle}>Received</Text>
          <TouchableOpacity
            onPress={() => navigation.navigate("TransactionReceived")}
          >
            <Text style={styles.sectionLink}>See all</Text>
          </TouchableOpacity>
        </View>

        <FlatList
          nestedScrollEnabled
          data={receivedTransactions}
          renderItem={({ item }) => (
            <View>
              <View style={styles.transactionDivider} />
              <View style={styles.transactionRow}>
                <View style={styles.transactionInfo}>
                  <View style={styles.circle}>
                    <Ionicons name="cash-outline" size={20} color="white" />
                  </View>
                  <View style={styles.transactionDetails}>
                    <Text style={styles.transactionTitle}>
                      {item.senderName}
                    </Text>
                    <Text>
                      {new Date(item.timeStamp.seconds * 1000).toLocaleString()}
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

      {/* Sent Transactions */}
      <View>
        <View style={styles.transactionDivider} />
        <View style={styles.rowContainer}>
          <Text style={styles.sectionTitle}>Sent</Text>
          <TouchableOpacity
            onPress={() => navigation.navigate("TransactionSent")}
          >
            <Text style={styles.sectionLink}>See all</Text>
          </TouchableOpacity>
        </View>

        <FlatList
          nestedScrollEnabled
          data={sentTransactions}
          renderItem={({ item }) => (
            <View>
              <View style={styles.transactionDivider} />
              <View style={styles.transactionRow}>
                <View style={styles.transactionInfo}>
                  <View style={styles.circle}>
                    <Ionicons name="send-outline" size={20} color="white" />
                  </View>
                  <View style={styles.transactionDetails}>
                    <Text style={styles.transactionTitle}>
                      {item.receiverName}
                    </Text>
                    <Text>
                      {new Date(item.timeStamp.seconds * 1000).toLocaleString()}
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

export default TransactionHistory;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    padding: 20,
  },
  centeredContainer: {
    justifyContent: "center",
  },
  whiteText: {
    color: "white",
  },
  header: {
    height: 120,
    padding: 20,
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#2ecc71",
  },
  divider: {
    borderBottomColor: "lightgray",
    borderBottomWidth: StyleSheet.hairlineWidth,
    margin: 30,
  },
  headerText: {
    fontWeight: "500",
    fontSize: 50,
  },
  subHeaderText: {
    fontWeight: "500",
    fontSize: 25,
  },
  rowContainer: {
    marginTop: 10,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  sectionTitle: {
    fontSize: 17,
    fontWeight: "500",
  },
  sectionLink: {
    fontWeight: "bold",
    color: "#2ecc71",
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
    width: 40,
    height: 40,
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
