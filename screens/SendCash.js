import { View, Text, FlatList, StyleSheet, Pressable, TextInput, Button, Touchable, TouchableOpacity, KeyboardAvoidingView } from 'react-native';
import React ,{useState, useEffect} from 'react';
import { auth, firebase } from '../firebase';
import {collection, setDoc, doc, getDoc, querySnapshot, DocumentSnapshot} from 'firebase/firestore'
import { db } from '../firebase'

const SendCash = () => {

    const todoRef = firebase.firestore().collection('Users');
    const todoRefq = firebase.firestore().collection('Users').doc(uid);
    const [ availableAmount, setAvailableAmount] = useState('')
    const [uid , setUid] = useState('')
    const [current , setCurrent] = useState([])
    const asd = 'ASGyWwAwDVgr6OBsBEYw'

    const returnValue = () => {
      todoRef
      .doc(firebase.auth().currentUser.uid)
      .get()
      .then((snapshot) => {
        if (snapshot.exists){
          setCurrent(snapshot.data());

        }else {
          alert('aasd')
        }
      })
    }
    
    // const returnValue = () => {
    //     useEffect(() => {
    //         ref('Users', asd);
    //     }, [])
    // }
    // const ref = async(Users, asd) =>{
    //     const documentSnapshot = await firestore()
    //     .collection(Users)
    //     .doc(asd)
    //     .get()

    //     if(documentSnapshot.exists){
    //         const data = documentSnapshot.data();
    //         setCurrent(data);
    //     }
    // }

    const updateData = () => {
       

        todoRef
        .doc(uid)
        .update({
          availableAmount:  Number(availableAmount + cur) 
        })
        .then (() =>{
          console.log(availableAmount);
        })
      };

  return (
    <KeyboardAvoidingView
    style={styles.container}
      behavior="padding"
    >
    <View style= {styles.inputContainer}>
    
        <View>
            <TextInput 
                value={uid} 
                onChangeText={setUid}
                placeholder="Enter User Uid: "
                style={styles.input}/>
                  
            <TextInput 
                value={availableAmount} 
                onChangeText={setAvailableAmount} 
                placeholder="How much do you wish to send: "
                style={styles.input}
            />
            <Text>asdasd{current.password}</Text>
            </View>
            <View>
            <TouchableOpacity  onPress={updateData} style={styles.button}>
                <Text style={styles.buttonText} >Send </Text>
            </TouchableOpacity>
             </View>
            
            
            
          
      
    </View>
    </KeyboardAvoidingView>
  )
}

export default SendCash

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    inputContainer: {
      width: '80%'
    },
    input: {
      backgroundColor: 'white',
      paddingHorizontal: 15,
      paddingVertical: 10,
      borderRadius: 10,
      marginTop: 5,
    },
    buttonContainer: {
      width: '60%',
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 40,
    },
    button: {
      backgroundColor: '#0782F9',
      width: '100%',
      padding: 15,
      borderRadius: 10,
      alignItems: 'center',
    },
    buttonOutline: {
      backgroundColor: 'white',
      marginTop: 5,
      borderColor: '#0782F9',
      borderWidth: 2,
    },
    buttonText: {
      color: 'white',
      fontWeight: '700',
      fontSize: 16,
    },
    buttonOutlineText: {
      color: '#0782F9',
      fontWeight: '700',
      fontSize: 16,
    },
  })