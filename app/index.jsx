import { Link, Stack } from 'expo-router';
import React, { useState, useEffect } from 'react';
import { Text, Image, View, StyleSheet, TouchableOpacity } from 'react-native';
import { TextInput } from 'react-native-paper';

export default function IndexScreen() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSignIn = () => {
        // Add your sign-in logic here
        console.log("Signing in with:", email, password);
    };

    return (
        <View style={styles.container}>
            <Stack.Screen options={{
                title: 'LOGIN',
                headerTintColor: 'white',
                headerTitleAlign: 'center',
                headerStyle: { backgroundColor: '#525FE1' },
            }} />
            <View>
                <Image source={require('../assets/img/user.jpg')} style={styles.profile} />
            </View>
            <View style={styles.card}>
                <View>
                    <TextInput
                        placeholder='example10@gmail.com'
                        style={{ paddingHorizontal: 15 }}
                        onChangeText={(text) => setEmail(text)}
                        value={email}
                    />
                </View>
                <View style={{ marginTop: 10 }}>
                    <TextInput
                        placeholder="Password"
                        secureTextEntry
                        right={<TextInput.Icon name="eye" onPress={() => {}} />}
                        onChangeText={(text) => setPassword(text)}
                        value={password}
                    />
                </View>
                <View style={styles.ContainerButton}>
                    <TouchableOpacity style={styles.boxButton} onPress={handleSignIn}>
                        <Text style={styles.textButton}>Sign In</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
    },
    profile: {
        width: 100,
        height: 100,
        borderRadius: 50,
        borderColor: 'white',
    },
    card: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        width: "90%",
        padding: 20,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    ContainerButton: {
        alignItems: 'center',
    },
    boxButton: {
        backgroundColor: '#525FE1',
        borderRadius: 30,
        paddingVertical: 20,
        width: 150,
        marginTop: 20
    },
    textButton: {
        color: 'white',
        textAlign: 'center',
    },
});
