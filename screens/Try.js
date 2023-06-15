import { View, Text, FlatList } from 'react-native'
import React ,{useState, useEffect} from 'react';
import { auth, db, firebase } from '../firebase';
import {querySnapshot} from 'firebase/firestore';
import { SectionList } from 'react-native-web';




const Try = () => {
    const user = auth.currentUser;
  const ownid = user.uid;


    const [users, setUsers] = useState([]);
    const [users12, setUsers12] = useState([]);
    const todoRef = firebase.firestore().collection('Users').doc(ownid).collection('recieveTransaction');
    const todo = firebase.firestore().collection('Users').doc(ownid).collection('sendTransaction');

  
    
    
  useEffect(() => {
    todoRef
    .onSnapshot(
      querySnapshot => {
        const users = []
        querySnapshot.forEach((doc) => {
          const {amountSend} = doc.data()
          users.push({
            amountSend,
           
          })
          
        })
        setUsers(users)
      }
    )
   
   todoRef
    .onSnapshot(
      querySnapshot => {
        const users12 = []
        querySnapshot.forEach((doc) => {
          const {amountRecieve} = doc.data()
          users12.push({
            amountRecieve,
           
          })
          console.log(amountRecieve)
        })
        setUsers12(users12)
      }
    )
    console.log('users:', users);
console.log('users12:', users12);
  }, []);





  return (
    <View>
<View>
<FlatList
    data={users12}
    numColumns={1}
    keyExtractor={(item, index) => index.toString()}
    renderItem={({item}) => (
        <View>
            <Text>{item.amountRecieve}</Text>
        </View>
    )} 
    />

</View>
<View>

<SectionList
    data={users}
    numColumns={1}
    keyExtractor={(item, index) => index.toString()}
    renderItem={({item: item1}) => (
        <View>
            <Text>{item1.amountSend}</Text>

        </View>
    
    )}

    />
</View>

  
    
  </View>
  )
}

export default Try