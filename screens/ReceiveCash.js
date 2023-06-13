import { View, Text, StyleSheet, Image, FlatList, TouchableOpacity } from 'react-native';
import React, { useState, useEffect } from 'react';
import { auth, firebase } from '../firebase';
import { collection, doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { getAuth } from 'firebase/auth';
import { LinearGradient } from 'expo-linear-gradient';

const ReceiveCash = () => {
<<<<<<< HEAD
    const user = auth.currentUser;
    const uid = user.uid;
=======
  const user = auth.currentUser;
  const uid = user.uid;

  const todoRef = firebase.firestore().collection('Users');
>>>>>>> 620055a0c73f4989e2dce3f5dcbc26a51ddf24c3

  const [balance, setBalance] = useState('');
  const [transactionHistory, setTransactionHistory] = useState([]);

<<<<<<< HEAD
    const [balance, setBalance] = useState('');
    const [transactionHistory, setTransactionHistory] = useState([]);

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

        // Fetch transaction history
        // Replace the following with your own logic to fetch transaction history data
        const fetchTransactionHistory = async () => {
            try {
                // Fetch transaction history data
                const historyData = await fetchTransactionHistoryData();

                // Set the transaction history state
                setTransactionHistory(historyData);
            } catch (error) {
                console.error('Error fetching transaction history:', error);
            }
        };

        fetchTransactionHistory();
    };

    useEffect(() => {
        loadData();
    }, []);

    const fetchTransactionHistoryData = () => {
        // Dito mo lagay logic 
        // Example lang andito 
        return [
            { id: '1', title: 'Transaction 1', amount: 100 },
            { id: '2', title: 'Transaction 2', amount: 200 },
            { id: '3', title: 'Transaction 3', amount: 300 },
            { id: '4', title: 'Transaction 4', amount: 400 },
            { id: '5', title: 'Transaction 5', amount: 500 },
        ];
    };

    const renderTransactionItem = ({ item }) => (
        <View style={styles.transactionItem}>
            <Text style={styles.transactionTitle}>{item.title}</Text>
            <Text style={styles.transactionAmount}>${item.amount}</Text>
        </View>
    );

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
                    <Text style={styles.title}>Transaction History</Text>
                </LinearGradient>
                <FlatList
                    data={transactionHistory}
                    renderItem={renderTransactionItem}
                    keyExtractor={item => item.id}
                    contentContainerStyle={styles.transactionHistoryContainer}
                />
                {renderSeeAllButton()}
            </View>
        </View>
    );
=======
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

    // Fetch transaction history
    // Replace the following with your own logic to fetch transaction history data
    const fetchTransactionHistory = async () => {
      try {
        // Fetch transaction history data
        const historyData = await fetchTransactionHistoryData();

        // Set the transaction history state
        setTransactionHistory(historyData);
      } catch (error) {
        console.error('Error fetching transaction history:', error);
      }
    };

    fetchTransactionHistory();
  };

  useEffect(() => {
    loadData();
  }, []);

  const fetchTransactionHistoryData = () => {
    // Dito mo lagay logic 
    // Example lang andito 
    return [
      { id: '1', title: 'Transaction 1', amount: 100 },
      { id: '2', title: 'Transaction 2', amount: 200 },
      { id: '3', title: 'Transaction 3', amount: 300 },
      { id: '4', title: 'Transaction 4', amount: 400 },
      { id: '5', title: 'Transaction 5', amount: 500 },
    ];
  };

  const renderTransactionItem = ({ item }) => (
    <View style={styles.transactionItem}>
      <Text style={styles.transactionTitle}>{item.title}</Text>
      <Text style={styles.transactionAmount}>${item.amount}</Text>
    </View>
  );

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
          <Text style={styles.title}>Transaction History</Text>
        </LinearGradient>
        <FlatList
          data={transactionHistory}
          renderItem={renderTransactionItem}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.transactionHistoryContainer}
        />
        {renderSeeAllButton()}
      </View>
    </View>
  );
>>>>>>> 620055a0c73f4989e2dce3f5dcbc26a51ddf24c3
};

export default ReceiveCash;

const styles = StyleSheet.create({
<<<<<<< HEAD
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
        marginTop: 20,
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
=======
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
    marginTop: 20,
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
>>>>>>> 620055a0c73f4989e2dce3f5dcbc26a51ddf24c3
