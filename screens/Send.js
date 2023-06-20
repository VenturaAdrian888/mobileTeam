import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  FlatList,
} from "react-native";
import { auth, db, firebase } from "../lib/Firebase";
import { runTransaction } from "firebase/firestore";
import { Ionicons } from "@expo/vector-icons";

const Send = () => {
  // Get the current user's UID
  const currentUserUID = auth.currentUser.uid;

  // State variables
  const [currentUser, setCurrentUser] = useState("");
  const [recentContactsList, setRecentContactsList] = useState([]);
  const [receiverUID, setReceiverUID] = useState("");
  const [amount, setAmount] = useState("");

  // Firebase references
  const currentUserRef = firebase.firestore().collection("Users");
  const sentTransactionRef = currentUserRef
    .doc(currentUserUID)
    .collection("sentTransaction");

  // Load current user data
  const loadData = () => {
    currentUserRef
      .doc(currentUserUID)
      .get()
      .then((documentSnapshot) => {
        if (documentSnapshot.exists) {
          setCurrentUser(documentSnapshot.data());
        }
      });
    setReceiverUID("");
    setAmount("");
  };

  // Retrieve recent contacts from sent transactions
  const getRecentContacts = () => {
    sentTransactionRef.onSnapshot((querySnapshot) => {
      const recentContactsMap = {};
      querySnapshot.forEach((doc) => {
        const { receiverUid, receiverName, timeStamp } = doc.data();

        if (!recentContactsMap[receiverName]) {
          recentContactsMap[receiverName] = {
            receiverName,
            receiverUid,
            timeStamp,
          };
        } else {
          const existingTransaction = recentContactsMap[receiverName];

          if (timeStamp > existingTransaction.timeStamp) {
            recentContactsMap[receiverName] = {
              receiverName,
              receiverUid,
              timeStamp,
            };
          }
        }
      });

      const sortedRecentContacts = Object.values(recentContactsMap)
        .sort((a, b) => b.timeStamp - a.timeStamp)
        .slice(0, 5);

      setRecentContactsList(sortedRecentContacts);
    });
  };

  useEffect(() => {
    loadData();
    getRecentContacts();
  }, []);

  // Update sender and receiver data in a transaction
  const updateData = async () => {
    // Get references to the sender and receiver documents
    const senderDocRef = currentUserRef.doc(receiverUID);
    const receiverDocRef = currentUserRef.doc(currentUserUID);

    try {
      await runTransaction(db, async (transaction) => {
        // Get the current data of the receiver
        const senderDoc = await transaction.get(senderDocRef);
        if (!senderDoc.exists()) {
          throw new Error("Document does not exist");
        }

        // Check if the sender has sufficient funds
        else if (Number(amount) > Number(currentUser.availableBalance)) {
          console.log("Insufficient Funds");
          alert("Insufficient Funds");
        } else {
          // Update the available balance of the receiver
          const updatedSenderBalance =
            senderDoc.data().availableBalance + Number(amount);
          transaction.update(senderDocRef, {
            availableBalance: updatedSenderBalance,
          });
          console.log("Transaction successfully committed!");

          await runTransaction(db, async (nestedTransaction) => {
            // Get the current data of the sender
            const receiverDoc = await nestedTransaction.get(receiverDocRef);
            if (!receiverDoc.exists()) {
              throw new Error("Document does not exist");
            }

            // Update the available balance of the sender
            const updatedReceiverBalance =
              receiverDoc.data().availableBalance - Number(amount);
            nestedTransaction.update(receiverDocRef, {
              availableBalance: updatedReceiverBalance,
            });

            // Add transaction details to the sender's sentTransaction collection
            receiverDocRef.collection("sentTransaction").add({
              senderName: receiverDoc.data().firstName,
              senderUid: currentUserUID,
              receiverName: senderDoc.data().firstName,
              receiverUid: receiverUID,
              timeStamp: firebase.firestore.FieldValue.serverTimestamp(),
              amountSent: Number(amount),
            });

            // Add transaction details to the receiver's receivedTransaction collection
            senderDocRef.collection("receivedTransaction").add({
              senderName: receiverDoc.data().firstName,
              senderUid: currentUserUID,
              receiverName: senderDoc.data().firstName,
              receiverUid: receiverUID,
              timeStamp: firebase.firestore.FieldValue.serverTimestamp(),
              amountReceived: Number(amount),
            });
          });
        }
      });
      loadData();
    } catch (error) {
      console.log("Transaction failed:", error);
    }
  };

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.headerText}>Send money</Text>
        <View>
          <Text style={styles.label}>Recent Contacts</Text>
          <View style={styles.recentContactsContainer}>
            <FlatList
              data={recentContactsList}
              horizontal={true}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={[
                    styles.mediumButtonContainer,
                    { marginLeft: 10, marginTop: 10, marginBottom: 10 },
                  ]}
                  onPress={() => setReceiverUID(item.receiverUid)}
                >
                  <View style={styles.circle}>
                    <Ionicons name="person" size={15} color="white" />
                  </View>
                  <Text numberOfLines={1} style={{ fontSize: 12 }}>
                    {item.receiverName}
                  </Text>
                </TouchableOpacity>
              )}
            />
          </View>
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Recipient</Text>
          <TextInput
            value={receiverUID}
            onChangeText={setReceiverUID}
            placeholder="Enter account number"
            style={styles.input}
          />
          <Text style={styles.label}>Amount</Text>
          <TextInput
            value={amount}
            keyboardType="numeric"
            onChangeText={setAmount}
            placeholder="Enter amount"
            style={styles.input}
          />
          <Text style={styles.balanceText}>
            You have{" "}
            <Text style={styles.balanceValue}>
              {currentUser.availableBalance}
            </Text>{" "}
            in your wallet.
          </Text>
        </View>
      </View>

      <TouchableOpacity onPress={() => updateData()} style={styles.button}>
        <Text style={styles.buttonText}>Send</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Send;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    backgroundColor: "white",
    padding: 16,
  },
  recentContactsContainer: {
    marginTop: 10,
    marginBottom: 30,
    borderStyle: "dashed",
    borderWidth: 0.4,
    borderRadius: 25,
    height: 95,
  },
  headerText: {
    fontWeight: "500",
    fontSize: 40,
    marginBottom: 20,
  },
  inputContainer: {
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
  label: {
    fontWeight: "bold",
    marginBottom: 5,
  },
  mediumButtonContainer: {
    height: 75,
    width: 75,
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    borderRadius: 15,
    backgroundColor: "#EDf9EB",
  },
  circle: {
    width: 30,
    height: 30,
    borderRadius: 100,
    backgroundColor: "#2E7D32",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 5,
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
  balanceText: {
    marginStart: 10,
  },
  balanceValue: {
    fontWeight: "bold",
  },
});
