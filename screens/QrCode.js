import { View, Text, Pressable, StyleSheet } from 'react-native'
import React from 'react'
import { useNavigation } from "@react-navigation/core";

const QrCode = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Pressable
        style={styles.button}
        onPress={() => navigation.navigate("GenerateQr")}
      >
        <Text style={styles.buttonText}>Generate QR</Text>
      </Pressable>

      <Pressable
        style={styles.button}
        onPress={() => navigation.navigate("ScanQr")}
      >
        <Text style={styles.buttonText}>Scan QR</Text>
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
  button: {
    backgroundColor: '#2E7D32',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default QrCode
