import { View, Text, FlatList } from 'react-native'
import React ,{useState, useEffect} from 'react';
import { auth, db, firebase } from '../firebase';
import {querySnapshot} from 'firebase/firestore';




const Try = () => {
    const user = auth.currentUser;
  const ownid = user.uid;


    const [users, setUsers] = useState([]);
    const todoRef = firebase.firestore().collection('Users').doc(ownid).collection('transaction');

  
    
    
  useEffect(() => {
   todoRef
   .onSnapshot(
    querySnapshot => {
        const users = []
        querySnapshot.forEach((doc) => {
            const {amountSend} = doc.data()
            users.push({
              amountSend
            })
        })
        setUsers(users)
    }
   )
  }, []);





  return (
    <View>
    <FlatList
    data={users}
    numColumns={1}
    renderItem={({item}) => (
        <View>
            <Text>{item.amountSend}</Text>

        </View>
    
    )}
    />
  </View>
  )
}

export default Try