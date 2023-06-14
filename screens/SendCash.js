import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { auth, db, firebase } from '../firebase';
import { collection, setDoc, doc, getDoc, querySnapshot, documentSnapshot, getDocs, snapshotEqual, onSnapshot, runTransaction } from 'firebase/firestore';
import { v4 as uuid } from 'uuid';
import { useNavigation } from '@react-navigation/core'

const uuu = uuid();
const uniqueId = uuu.slice(0,8)



const SendCash = () => {
  const user = auth.currentUser;
  const ownid = user.uid;

  const todoRef = firebase.firestore().collection('Users');
  const tra = firebase.firestore().collection('Transactions');
  const [availableAmount1, setAvailableAmount1] = useState("");
  const [uid, setUid] = useState("");
  const [current1, setCurrent1] = useState("");
  const [ getUser, setGetUser] = useState("")
  const [refreshkey, setRefreshkey] = useState("")
  const navigation = useNavigation()

  

  const reload = () => {
      navigation.navigate("Main")
      navigation.navigate("Send")
  }

  const loadData = () => {
    todoRef
      .doc(ownid)
      .get()
      .then(documentSnapshot => {
        if (documentSnapshot.exists) {
          console.log('User data: ', documentSnapshot.data());
          setCurrent1(documentSnapshot.data());
        }
      });
   
  };

  useEffect(() => {
    loadData();
  }, []);


  const upData = async () =>{
    const sfDocRef = todoRef.doc(uid);
    const rfDocRef = todoRef.doc(ownid);
    try{
      await runTransaction( db , async (trans) => {
        const sfDoc = await trans.get(sfDocRef)
        if(!sfDoc.exists()){
          throw "Documnet does not exixts"
        }              //current data of receiver        input
       else if(Number(availableAmount1) > Number(current1.availableAmount)){
          console.log('KULANG PERA MO PRE');
          alert("Insufficient Funds")
        }
        else {
          const ss = sfDoc.data().availableAmount + Number(availableAmount1)
        trans.update(sfDocRef, {availableAmount: ss})
        console.log("Transaction successfully committed!");
        // window.location.reload(true)

        await runTransaction(db, async (trap) => {
          const rfDoc = await trap.get(rfDocRef)
          if(!rfDoc.exists()){
            throw "Documnet does not exixts"
          }             //current data of  sender           input
          const rr = rfDoc.data().availableAmount - Number(availableAmount1)
          trap.update(rfDocRef, {availableAmount: rr}) 
        })

        tra
        .doc(uniqueId)
        .set({senderName: current1.firstNamae})
      
          
        
        }     
      })

    } catch (e) {
      console.log("Transaction failed: ", e);
    }
  
  }
  
 const handle = () => {
     reload();
     upData();
    }
    



  // const updateData = async () => {

  //   //get inputed uid 
  //   todoRef
  //   .doc(uid)
  //   .get()
  //   .then(documentSnapshot => {
  //     if (documentSnapshot.exists) {
  //       // console.log('User data: ', documentSnapshot.data());
  //       setGetUser(documentSnapshot.data());
  //     }
  //     });

  //             // input                               from firebase
  //   if (Number(availableAmount1) < Number(getUser.availableAmount)) {
  //     todoRef
  //     .doc(uid) // to reciever
  //     .update({           //input                         from firebase
  //       availableAmount: Number(availableAmount1) + Number(getUser.availableAmount)
  //     })
  //     .then(() => {

  //       //for sender
  //       todoRef
  //         .doc(ownid)
  //         .update({           //fireabse                  from input
  //           availableAmount: Number(current1.availableAmount) - Number(availableAmount1)
  //         })

  //   })
  //   console.log('You have sent: ', availableAmount1, 'to', uid);
  //     alert('Successful Transaction');
      
      

  // }else if (Number(availableAmount1) > Number(getUser.availableAmount)){
  //   todoRef
  //     .doc(uid) // to reciever
  //     .update({           //input                         from firebase
  //       availableAmount: Number(availableAmount1) + Number(getUser.availableAmount)
  //     })
  //     .then(() => {

  //       //for sender
  //       todoRef
  //         .doc(ownid)
  //         .update({           //fireabse                  from input
  //           availableAmount: Number(current1.availableAmount) - Number(availableAmount1)
  //         })

  //   })
  //   console.log('You have sent: ', availableAmount1, 'to', uid);
  //     alert('Successful Transaction');
      
  // }else if (Number(availableAmount1) > Number(current1.availableAmount)) {
  //     console.log('KULANG PERA MO PRE');
  //     alert('Insufficient funds');
  //   } else if (Number(availableAmount1) === Number(current1.availableAmount)) {
  //     todoRef
  //       .doc(uid)
  //       .update({           //from input                      from firebase
  //         availableAmount: Number(availableAmount1) + Number(current1.availableAmount)
  //       })
  //       .then(() => {
  //         todoRef
  //           .doc(ownid)
  //           .update({           //from input                      from firebase
  //             availableAmount: Number(current1.availableAmount) - Number(availableAmount1)
  //           });
  //       });
  //     console.log('You have sent: ', availableAmount1, 'to', uid);
  //     alert('Successful Transaction');
  //   }
  // };

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Send Cash</Text>
      
      <View style={styles.inputContainer}>
        <Text style={styles.balanceText}>Wallet Balance: {current1.availableAmount}</Text>
        <TextInput
          value={uid}
          onChangeText={setUid}
          placeholder="Enter User UID"
          style={styles.input}
        />
        <TextInput
          value={availableAmount1}

          onChangeText={setAvailableAmount1}
          placeholder="How much do you wish to send"
          style={styles.input}
        />
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
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  inputContainer: {
    width: '80%',
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    marginBottom: 20,
  },
  balanceText: {
    fontSize: 16,
    marginBottom: 10,
  },
  input: {
    backgroundColor: '#F2F2F2',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#0782F9',
    width: '80%',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 16,
  },
});