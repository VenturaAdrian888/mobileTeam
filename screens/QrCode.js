import { View, Text, Pressable } from 'react-native'
import React from 'react'
import { useNavigation } from "@react-navigation/core";


const QrCode = () => {
    const navigation = useNavigation();
  return (
    <View>
        <Pressable
        style={{alignItems:'center'}}
        onPress={() => navigation.navigate("GenerateQr")}>
        <Text >Generate QR</Text>
        </Pressable>
        <Pressable
        style={{alignItems:'center'}}
        onPress={() => navigation.navigate("ScanQr")}>
        <Text >Scan QR</Text>
        </Pressable>

    </View>
  )
}

export default QrCode