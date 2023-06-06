import React, { useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { Ionicons } from "@expo/vector-icons"
import { View, Text, TouchableOpacity, TextInput, StyleSheet } from 'react-native'
import { firebase } from '../config'

const Login = () => {

    const navigation = useNavigation()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    loginUser = async (email, password) => {
        try {
            await firebase.auth().signInWithEmailAndPassword(email, password)
        } catch (error) {
            alert(error.message)
        }
    }

    return (
        <View style={styles.container}>
            <View>
                <Text style={{ fontWeight: 'bold', fontSize: 40, textAlign: 'center' }}>
                    Welcome Back!
                </Text>

                <Text style={{ fontSize: 15, marginBottom: 30, textAlign: 'center' }}>
                    Sign in to continue
                </Text>

                <Text style={{ fontSize: 12, marginBottom: 5, textAlign: 'left' }}>
                    Email
                </Text>
                <View style={styles.textInputLayout}>
                    <Ionicons name="mail-outline" size={20} color="black" style={styles.icon} />
                    <TextInput
                        style={styles.textInput}
                        placeholder='Type your email'
                        onChangeText={(email) => setEmail(email)}
                        autoCapitalize='none'
                        autoCorrect={false}
                    />
                </View>

                <Text style={{ fontSize: 12, marginBottom: 5, textAlign: 'left' }}>
                    Password
                </Text>
                <View style={styles.textInputLayout}>
                    <Ionicons name="lock-closed-outline" size={20} color="black" style={styles.icon} />
                    <TextInput
                        style={styles.textInput}
                        placeholder='Enter your password'
                        onChangeText={(password) => setPassword(password)}
                        autoCapitalize='none'
                        autoCorrect={false}
                        secureTextEntry={true}
                    />
                </View>

                <TouchableOpacity
                    onPress={() => loginUser(email, password)}
                    style={[styles.button, { marginTop: 10 }]}>
                    <Text style={{ fontWeight: 'bold', fontSize: 15, color: 'white' }}>LOGIN</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => navigation.navigate('Register')}
                    style={{ marginTop: 20 }}>
                    <Text style={{ fontWeight: 'bold', fontSize: 15, textAlign: 'center' }}>
                        Don't have an account? Register now</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default Login;

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        flex: 1,
        alignItems: 'center',
        backgroundColor: 'white'
    },
    textInputLayout: {
        marginBottom: 10,
        borderWidth: 0.5,
        height: 45,
        width: 300,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        borderRadius: 5,
    },
    textInput: {
        flex: 1,
        flexWrap: 'nowrap',
    },
    icon: {
        padding: 5,
    },
    button: {
        height: 45,
        width: 300,
        backgroundColor: 'deepskyblue',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5,
    },
});