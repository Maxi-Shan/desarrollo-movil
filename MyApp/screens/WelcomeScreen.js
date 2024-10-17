import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ImageBackground } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const WelcomeScreen = () => {
    const navigation = useNavigation();
    return (
        <ImageBackground
            source={require('../assets/11.png')}
            style={styles.background}
        >
            <View style={styles.header}>
                <Image
            source={require('../assets/02.png')}
            style={styles.logo} />
                <Text style={styles.title}>Bienvenida a tu espacio💅</Text>
                <Text style={styles.subtitle}>¡Gestiona tu caja!</Text>
            </View>
            <View>
                <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Caja')}>
                    <Text style={styles.buttonText}>Ir a Caja</Text>
                </TouchableOpacity>
            </View>
        </ImageBackground>
    );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    background: {
        flex: 1,
        resizeMode: 'cover',
        justifyContent: 'center',
        alignItems: 'center',
    },
    header: {
        alignItems: 'center',
        marginBottom: 20,
    },
    logo: {
        width: 350, // Ajusta el tamaño del logo
        height: 350,
        resizeMode: 'contain',
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#fff',
        marginTop: 10,
    },
    subtitle: {
        fontSize: 18,
        color: '#fff',
    },
    button: {
        backgroundColor: '#f4b8dc', // Color del botón rosa claro
        padding: 15,
        borderRadius: 10,
        width: '90%',
        alignItems: 'center',
    },
    buttonText: {
        color: '#000',
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default WelcomeScreen;