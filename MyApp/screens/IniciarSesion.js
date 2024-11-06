import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { Image, Text, StyleSheet, View, ScrollView, TouchableOpacity, TextInput, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import db from "../firebaseConfig"; 
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

const auth = getAuth(db);

export default function App() {
    const navigation = useNavigation();
    const [Email, setEmail] = useState("");
    const [Password, setPassword] = useState("");

    const logueo = async () => {
        try {
            await signInWithEmailAndPassword(auth, Email, Password);
            Alert.alert('Iniciando sesión', 'Accediendo...');
            navigation.navigate('WelcomeScreen'); // Cambia a la pantalla de bienvenida al iniciar sesión
        } catch (error) {
            console.log(error);
            Alert.alert('Error', 'El email o la contraseña son incorrectos');
        }
    };

    return (
        <View style={styles.container}>
            <Image source={require('../assets/11.png')} style={[styles.image, StyleSheet.absoluteFill]}/>
            <ScrollView contentContainerStyle={{
                flex: 1,
                width: '100%',
                height: '100%',
                alignItems: 'center',
                justifyContent: 'center',
                paddingTop: 10,
            }}>
                <View style={styles.login}>
                    <Image source={require('../assets/02.png')} style={styles.profilePicture}/>
                    <Text style={{fontSize: 20, fontWeight: 'bold', color: 'white', marginBottom: 20,}}>Iniciar Secion</Text>

                    <View>
                        <Text style={{fontSize: 17, fontWeight: '400', color: 'white'}}>Email</Text>
                        <TextInput 
                            style={styles.input} 
                            placeholder='usuario@gmail.com'
                            onChangeText={(text) => setEmail(text)}
                        />
                    </View>
                    <View>
                        <Text style={{fontSize: 17, fontWeight: '400', color: 'white'}}>Contraseña</Text>
                        <TextInput 
                            style={styles.input} 
                            placeholder='contraseña'
                            secureTextEntry={true}
                            onChangeText={(text) => setPassword(text)}
                        />
                    </View>

                    <TouchableOpacity 
                        style={[styles.buttom, { backgroundColor: '#BA68C8' }]} 
                        onPress={logueo}
                    >
                        <Text style={{ fontSize: 17, fontWeight: '400', color: 'white' }}>Ingresar</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>  
        </View>
    );
}

//estilos
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    image: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },
    login: {
        width: 290,
        height: 440,
        borderColor: '#da78d6',
        borderWidth: 6,
        backgroundColor: '#6F1C7E',
        borderRadius: 10,
        padding: 10,
        alignItems: 'center',
    },
    profilePicture: {
        width: 200,
        height: 150,
        marginTop: -100,
    },
    input: {
        width: 250,
        height: 40,
        borderColor: '#fff',
        borderWidth: 2,
        borderRadius: 10,
        padding: 10,
        marginVertical: 10,
        backgroundColor: '#ffffff90',
        marginBottom: 20,
    },
    buttom: {
        width: 250,
        height: 80,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 10,
        borderColor: '#fff',
        borderWidth: 1,
        marginTop: 20,
    },
    fondo: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
