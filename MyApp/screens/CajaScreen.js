import React, {useState} from 'react';
import { StatusBar } from 'expo-status-bar';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ImageBackground } from 'react-native';
import { Table, Row, Rows } from 'react-native-table-component';
import { useNavigation } from '@react-navigation/native';



export default function CajaScreen() {
    const navigation = useNavigation();

    const [datos, setDatos] = useState ([['---', '---', '---', '---', '---', '---']]);
    const [montoInicial, setMontoInicial] = useState('100');

    const encabezado = ['ID_caja', 'Fecha_apertura', 'Fecha_cierre', 'Monto_inicial', 'Monto_Recaudado', 'Monto_total'];

    return (
        <ImageBackground 
            source={require('../assets/11.png')}
            style={styles.fondo}
            resizeMode="cover"
        >
            <View style={styles.encabezado}>
                <Text style={styles.titulo}>Caja</Text>
            </View>
            <View style={styles.contenedor}>
                <TouchableOpacity style={styles.buttonOpen} onPress={() => navigation.navigate('AperturaCaja')}>
                    <Text style={styles.buttonText}>Apertura de Caja</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.contenedor2}>
                <TouchableOpacity style={styles.buttonClose} onPress={() => navigation.navigate('Cierre')}>
                    <Text style={styles.buttonText}>Cierre de Caja</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.contenedor2}>
                <TouchableOpacity style={styles.buttonModify} onPress={() => navigation.navigate('Modificar')}>
                    <Text style={styles.buttonText}>Modificar</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.contenedor3}>
                <Table borderStyle={{ borderWidth: 2, borderColor: '#c8e1ff' }}>
                    <Row data={encabezado} style={styles.encabezado2} textStyle={styles.textoEncabezado} />
                    <Rows data={datos} style={styles.fondo2} textStyle={styles.textoFila} />
                </Table>
            </View>

            <View style={styles.contenedor2}>
                <TouchableOpacity style={styles.buttonCerrar} onPress={() => navigation.navigate('CierreSesion')}>
                    <Text style={styles.buttonText}>Cerrar Sesión</Text>
                </TouchableOpacity>
            </View>
        </ImageBackground>
    );
}


const styles = StyleSheet.create({
    fondo: {
        flex: 1,
    },
    encabezado: {
        height: 60,
        backgroundColor: '#6F1C7E', 
        justifyContent: 'center',
        alignItems: 'center', 
    },

    titulo: {
        fontSize: 30,
        color: 'black',
        fontWeight: 'bold',
    },

    contenedor: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
    },

    texto: {
        fontSize: 24,
        color: 'white',
        fontWeight: 'bold',
    },

    buttonOpen: {
        backgroundColor: 'green', // Apertura de Caja
        alignItems: 'center',
        padding: 15,
        borderRadius: 10,
        width: '90%',
        marginVertical: 5,
    },
    buttonClose: {
        backgroundColor: 'red', // Cierre de Caja
        alignItems: 'center',
        padding: 15,
        borderRadius: 10,
        width: '90%',
        marginVertical: 5,
    },
    buttonModify: {
        backgroundColor: 'blue', // Modificar
        alignItems: 'center',
        padding: 15,
        borderRadius: 10,
        width: '90%',
        marginVertical: 5,
    },

    buttonCerrar: {
        backgroundColor: '#BA68C8', // Color del fondo del botón
        padding: 15,               // Espaciado interno
        borderRadius: 10,          // Bordes redondeados
        width: '90%',              // Ancho del botón
        alignItems: 'center',      // Centrar contenido horizontalmente
        justifyContent: 'center',   // Centrar contenido verticalmente
        marginTop: 50,
    },
    
    buttonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    },

    contenedor2: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
    },

    button2: {
        backgroundColor: 'red', 
        alignItems: 'center',
        padding: 15,
        borderRadius: 10,
        width: '90%',
    },
    buttonText2: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    },
    contenedor3: { 
        padding: 16, 
        paddingTop: 30, 
    },
    encabezado2: { 
        height: 40, 
        backgroundColor: 'violet' 
    },

    textoEncabezado: { 
        fontSize: 10,
        textAlign: 'center', 
        fontWeight: 'bold',
    },  

    textoFila: { 
        textAlign: 'center' ,
    },
    fondo2: {
        backgroundColor: 'white',
    },
    inputContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
        paddingHorizontal: 20,
    },
    input: {
        flex: 1,
        backgroundColor: 'white',
        padding: 10,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#ccc',
    },
    updateButton: {
        backgroundColor: '#007BFF',
        padding: 10,
        borderRadius: 5,
        marginLeft: 10,
    },
});
