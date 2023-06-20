import { View, Text, Pressable } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation } from "@react-navigation/core";
import QRCode from 'react-native-qrcode-svg'
import { auth} from "../lib/Firebase";
  
const Generate = () => {
    const navigation = useNavigation();

    // Get the current user's UID
    const currentUserUID = auth.currentUser.uid;
      // State variables
    const [showQrCode, setShowQrCode] = useState(false);

    // Set "true" once pressed
    const DisplayQR = () => {
        setShowQrCode(true)
    }

    useEffect(() => {
    // Set Time limit to scan QR code
        let timer;
        if(showQrCode){
            timer = setTimeout(() => {
                setShowQrCode(false);
            },60000)
        }
        return() => {
            clearTimeout(timer)
        }
    },[showQrCode])
    
  return (
    <View>
        <Text>{currentUserUID}</Text>
        <View style={{paddingStart:50, paddingTop:10}}>
            
       {showQrCode ? (
        <QRCode
        value={currentUserUID ?currentUserUID : 'NA'}
        size={350}
        color='black'
        backgroundColor='white'
        />
        ) : null}
        </View>
        

        <Pressable
        style={{marginTop:100}}
        onPress={() => DisplayQR()}>
        <Text>QrCode</Text>           
        </Pressable>
      
    </View>
  )
}

export default Generate