import { View, Text, StyleSheet, Image, FlatList, TouchableOpacity, SectionList, SafeAreaView } from 'react-native';
import React, { useState, useEffect } from 'react';
import { auth, firebase } from '../firebase';
import { collection, doc, getDoc, querySnapshot } from 'firebase/firestore';
import { db } from '../firebase';
import { getAuth } from 'firebase/auth';
import { LinearGradient } from 'expo-linear-gradient';
import moment from 'moment';

const ReceiveCash = () => {
  const user = auth.currentUser;
  const uid = user.uid;

  const todoRef = firebase.firestore().collection('Users');

  const [balance, setBalance] = useState('');
 

  const [users, setUsers] = useState([]);
    const toRef = todoRef.doc(uid).collection('sendTransaction');

const [users1, setUsers1] = useState([]);
    const toReff = todoRef.doc(uid).collection('recieveTransaction');



  const loadData = () => {
    todoRef
      .doc(uid)
      .get()
      .then(documentSnapshot => {
        if (documentSnapshot.exists) {
          console.log('User data: ', documentSnapshot.data());
          setBalance(documentSnapshot.data());
        }
      });
  };

  const sendTransaction = () =>{
    toRef
    .onSnapshot(
     querySnapshot => {
         const users = []
         querySnapshot.forEach((doc) => {
             const {amountSend,recieverName,senderName,timeStamp} = doc.data()
             users.push({
               amountSend,
               recieverName,
               senderName,
               timeStamp
               
             })
             
         })
         setUsers(users)
     }
    )
  }

  const recieveTransaction = () => {
    toReff
    .onSnapshot(
      querySnapshot => {
        const users1 = []
        querySnapshot.forEach((doc1) => {
          const {amountRecieve,recieverName,senderName,timeStamp} = doc1.data()
          users1.push({
            amountRecieve,
            recieverName,
            senderName,
            timeStamp
            
          })
          console.log(recieverName)
        })
        setUsers1(users1)
      }
    )
  }

  

  useEffect(() => {
    loadData()
    sendTransaction()
    recieveTransaction()
  }, []);



  const renderSeeAllButton = () => (
    <TouchableOpacity style={styles.seeAllButton}>
      <Text style={styles.seeAllButtonText}>See All</Text>
    </TouchableOpacity>
  );

  return (

    
    <View style={styles.container}>
       
        
      <View style={styles.header}>
        {/* Your header components here */}
      </View>
      <View style={styles.content}>
        <LinearGradient
          colors={['#75EE68', '#B2F3AB']}
          style={styles.userInfo}
          start={[0, 0]}
          end={[1, 1]}
        >
          <View style={styles.profileContainer}>
            <Image
              source={require('../assets/profile-icon.jpg')}
              style={styles.profileIcon}
            />
            <Text style={styles.welcomeText}>Welcome, {balance.email}</Text>
          </View>
          <Text style={styles.userId}>ID: {uid}</Text>
          <View style={styles.balanceContainer}>
            <Text style={styles.balanceText}>Current Balance</Text>
            <View style={styles.balanceAmountContainer}>
              <Text style={styles.balanceAmount}>{balance.availableAmount}</Text>
              <Text style={styles.moneyIcon}>$</Text>
            </View>
          </View>
          
        </LinearGradient>
      
        <View>

        <SafeAreaView>
        <Text style={styles.title}>Receive Transaction History</Text>
            <FlatList
              data={users1}
              numColumns={2}
              renderItem={({item}) => (
                <View style={styles.transactionItem1}>
                    
                  <Text style={styles.transactionTitle}>Time: {new Date(item.timeStamp.seconds*1000).toDateString()} {new Date(item.timeStamp.seconds*1000).toLocaleTimeString()} </Text>
                    <Text style={styles.transactionAmount}>{item.recieverName} recieved ${item.amountRecieve} from {item.senderName}</Text>
                </View>
              )}
            />

        <Text style={styles.title}>Sent Transaction History</Text>
            <FlatList
              data={users}
              numColumns={1}
              renderItem={({item}) => (
                <View style={styles.transactionItem}>
                    
                  <Text style={styles.transactionTitle}>Time: {new Date(item.timeStamp.seconds*1000).toDateString()} {new Date(item.timeStamp.seconds*1000).toLocaleTimeString()} </Text>
                    <Text style={styles.transactionAmount}>{item.senderName} sent ${item.amountSend} to {item.recieverName}</Text>
                </View>
              )}
            />
        </SafeAreaView>
        
        </View>
        
        
        {renderSeeAllButton()}
      </View>
    </View>
  );
};

export default ReceiveCash;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F1F3F6',
  },
  header: {
    // Your header styles here
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  userInfo: {
    borderRadius: 10,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  profileIcon: {
    width: 24,
    height: 24,
    marginRight: 10,
  },
  welcomeText: {
    fontSize: 16,
    color: '#333',
  },
  userId: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
    color: '#333',
  },
  balanceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  balanceText: {
    fontSize: 18,
    color: '#555',
    marginRight: 5,
  },
  balanceAmountContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  balanceAmount: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginRight: 5,
  },
  moneyIcon: {
    fontSize: 24,
    color: '#333',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 50,
    marginBottom: 10,
    textAlign: 'center',
  },
  transactionHistoryContainer: {
    flexGrow: 1,
    paddingTop: 10,
    paddingBottom: 20,
  },
  transactionItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  transactionItem1: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'start',
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  transactionTitle: {
    fontSize: 16,
    color: '#333',
  },
  transactionAmount: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  seeAllButton: {
    marginTop: 10,
    paddingHorizontal: 20,
  },
  seeAllButtonText: {
    fontSize: 16,
    color: '#333',
    fontWeight: 'bold',
  },
});