import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { auth, db, firebase } from "../firebase";
import {
  collection,
  setDoc,
  doc,
  getDoc,
  querySnapshot,
  documentSnapshot,
  getDocs,
  snapshotEqual,
  onSnapshot,
  runTransaction,
} from "firebase/firestore";
import { v4 as uuid } from "uuid";
import { useNavigation } from "@react-navigation/core";
import { Ionicons } from "@expo/vector-icons";

const uuu = uuid();
const uniqueId = uuu.slice(0, 8);

const SendCash = () => {
  const user = auth.currentUser;
  const ownid = user.uid;

  const todoRef = firebase.firestore().collection("Users");
  const tra = firebase.firestore().collection("Transactions");

  const [availableAmount1, setAvailableAmount1] = useState("");
  const [uid, setUid] = useState("");
  const [current1, setCurrent1] = useState("");
  const [getUser, setGetUser] = useState("");
  const [refreshkey, setRefreshkey] = useState("");
  const navigation = useNavigation();

  const timestamp = new Date().toLocaleString();

  const reload = () => {
    navigation.navigate("Dashboard");
    navigation.navigate("Send");
  };

  const loadData = () => {
    todoRef
      .doc(ownid)
      .get()
      .then((documentSnapshot) => {
        if (documentSnapshot.exists) {
          setCurrent1(documentSnapshot.data());
        }
      });
  };

  useEffect(() => {
    loadData();
  }, []);

  const upData = async () => {
    const sfDocRef = todoRef.doc(uid);
    const rfDocRef = todoRef.doc(ownid);
    const tran = todoRef.doc(ownid).collection("transaction");
    const his = rfDocRef.collection("transaction");
    try {
      await runTransaction(db, async (trans) => {
        const sfDoc = await trans.get(sfDocRef);
        if (!sfDoc.exists()) {
          throw "Documnet does not exixts";
        } //current data of receiver        input
        else if (Number(availableAmount1) > Number(current1.availableAmount)) {
          console.log("KULANG PERA MO PRE");
          alert("Insufficient Funds");
        } else {
          const ss = sfDoc.data().availableAmount + Number(availableAmount1);
          trans.update(sfDocRef, { availableAmount: ss });
          console.log("Transaction successfully committed!");

          await runTransaction(db, async (trap) => {
            const rfDoc = await trap.get(rfDocRef);
            if (!rfDoc.exists()) {
              throw "Documnet does not exixts";
            } //current data of  sender           input
            const rr = rfDoc.data().availableAmount - Number(availableAmount1);
            trap.update(rfDocRef, { availableAmount: rr });

            rfDocRef.collection("sendTransaction").add({
              senderName: rfDoc.data().firstName,
              senderUid: ownid,
              recieverName: sfDoc.data().firstName,
              recieverUid: uid,
              timeStamp: firebase.firestore.FieldValue.serverTimestamp(),
              amountSend: Number(availableAmount1),
            });

            sfDocRef.collection("recieveTransaction").add({
              senderName: rfDoc.data().firstName,
              senderUid: ownid,
              recieverName: sfDoc.data().firstName,
              recieverUid: uid,
              timeStamp: firebase.firestore.FieldValue.serverTimestamp(),
              amountRecieve: Number(availableAmount1),
            });
          });
        }
      });
    } catch (e) {
      console.log("Transaction failed: ", e);
    }
  };

  const handle = () => {
    reload();
    upData();
  };

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.headerText}>Send money</Text>

        <View>
          <Text style={{ fontWeight: "bold" }}>Recent Contacts </Text>
          <View style={styles.recentContactsContainer}></View>
        </View>

        <View style={styles.inputContainer}>
          <Text style={{ fontWeight: "bold" }}>Recipient</Text>
          <TextInput
            value={uid}
            onChangeText={setUid}
            placeholder="Enter account number"
            style={styles.input}
          />
          <Text style={{ fontWeight: "bold" }}>Amount</Text>
          <TextInput
            value={availableAmount1}
            onChangeText={setAvailableAmount1}
            placeholder="Enter amount"
            style={styles.input}
          />
          <Text style={{ marginStart: 10 }}>
            You have{" "}
            <Text style={{ fontWeight: "bold" }}>
              {current1.availableAmount}
            </Text>{" "}
            in your wallet.
          </Text>
        </View>
      </View>
      <TouchableOpacity onPress={handle} style={styles.button}>
        <Text style={styles.buttonText}>Send</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SendCash;

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
    borderRadius: 10,
    height: 80,
    alignItems: "center",
    padding: 16,
  },
  headerText: {
    fontWeight: "500",
    fontSize: 40,
    marginBottom: 20,
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
