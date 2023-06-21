import { View, Text, Pressable, StyleSheet } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useNavigation } from "@react-navigation/core";
import QRCode from 'react-native-qrcode-svg';
import { auth } from "../lib/Firebase";

const Generate = () => {
  const navigation = useNavigation();

  // Get the current user's UID
  const currentUserUID = auth.currentUser.uid;

  // State variables
  const [showQrCode, setShowQrCode] = useState(false);

  // Set "true" once pressed
  const DisplayQR = () => {
    setShowQrCode(true);
  }

  useEffect(() => {
    // Set Time limit to scan QR code
    let timer;
    if (showQrCode) {
      timer = setTimeout(() => {
        setShowQrCode(false);
      }, 60000);
    }
    return () => {
      clearTimeout(timer);
    }
  }, [showQrCode]);

  return (
    <View style={styles.container}>
      <Text style={styles.uidText}>{currentUserUID}</Text>
      
      <View style={styles.qrCodeContainer}>
        {showQrCode && (
          <QRCode
            value={currentUserUID ? currentUserUID : 'NA'}
            size={350}
            color='black'
            backgroundColor='white'
          />
        )}
      </View>

      <Pressable
        style={styles.button}
        onPress={DisplayQR}
      >
        <Text style={styles.buttonText}>QR Code</Text>
      </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  uidText: {
    fontSize: 18,
    marginBottom: 20,
  },
  qrCodeContainer: {
    alignItems: 'center',
    paddingVertical: 10,
  },
  button: {
    backgroundColor: '#2E7D32',
    padding: 10,
    borderRadius: 5,
    marginTop: 100,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default Generate;
