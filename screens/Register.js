import { useNavigation } from '@react-navigation/core'
import React, { useEffect, useState } from 'react'
import { KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View, flex } from 'react-native'
import { auth, firebase } from '../firebase'
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from 'firebase/firestore';

const Register = () => {
    const todoRef = firebase.firestore().collection('Users');

    const navigation = useNavigation()

    const db = firebase.firestore();
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [availableAmount] = useState('0')

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            if (user) {
                navigation.replace("Main")
            }
        })

        return unsubscribe
    }, [])

    const handleSignUp = async () => {
        auth
        createUserWithEmailAndPassword(auth, email, password)
            .then(userCredentials => {
                const user = userCredentials.user;

                console.log('Registered with:', user.uid);

                setDoc(doc(db, "Users", user.uid), {
                    firstName: firstName,
                    lastName: lastName,
                    email: email,
                    password: password,
                    availableAmount: Number(availableAmount)
                })

            }).catch(error => alert(error.message))
    }

    const handleLogin = () => {
        navigation.navigate("Login")
    }

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior="height" >

            <Text style={styles.headerText}>Register Now!</Text>
            <Text>Fill up required information</Text>

            <View style={styles.inputContainer}>

                <View style={styles.nameRowContainer}>
                    <TextInput
                        placeholder="First Name"
                        value={firstName}
                        onChangeText={text => setFirstName(text)}
                        style={styles.inputName}>
                    </TextInput>

                    <TextInput
                        placeholder="Last Name"
                        value={lastName}
                        onChangeText={text => setLastName(text)}
                        style={styles.inputName} />
                </View>

                <TextInput
                    placeholder="Email"
                    value={email}
                    onChangeText={text => setEmail(text)}
                    style={styles.input}>
                </TextInput>

                <TextInput
                    placeholder="Password"
                    value={password}
                    onChangeText={text => setPassword(text)}
                    style={styles.input}
                    secureTextEntry>
                </TextInput>

            </View>

            <View style={styles.buttonContainer}>

                <TouchableOpacity
                    onPress={handleSignUp}
                    style={styles.button}>
                    <Text style={styles.buttonText}>Register</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={handleLogin}>
                    <Text style={{ fontWeight: "bold" }}>Aleady have an account? Login</Text>
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView >
    )
}

export default Register

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
    },
    inputContainer: {
        width: '70%',
        justifyContent: 'center',
        alignItems: 'center',
        margin: 20,
    },
    nameRowContainer: {
        width: '100%',
        display: flex,
        justifyContent: 'space-between',
        flexDirection: 'row',
        gap: 7
    },
    input: {
        width: '100%',
        backgroundColor: 'white',
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: 10,
        marginTop: 7,
        borderWidth: 0.4
    },
    inputName: {
        flex: 1,
        backgroundColor: 'white',
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: 10,
        marginTop: 5,
        borderWidth: 0.4
    },
    buttonContainer: {
        width: '70%',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 10
    },
    button: {
        backgroundColor: '#2E7D32',
        width: '100%',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
    },
    headerText: {
        color: 'black',
        fontWeight: '700',
        fontSize: 40,
        textAlign: "center",
    },
    buttonText: {
        color: 'white',
        fontWeight: '700',
        fontSize: 16,
    },
})