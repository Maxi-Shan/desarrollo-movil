import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { View, Text, StyleSheet, TouchableOpacity, ImageBackground } from 'react-native';
import { Table, Row, Rows } from 'react-native-table-component';
import { useNavigation, useRoute } from '@react-navigation/native';

export default function CajaScreen() {
    const navigation = useNavigation();
    const route = useRoute();
    const [datos, setDatos] = useState([['---', '---', '---', '---', '---', '---']]);
    const [montoInicial, setMontoInicial] = useState('');
    const [montoFinal, setMontoFinal] = useState('');

    const encabezado = ['ID_caja', 'Fecha_apertura', 'Fecha_cierre', 'Monto_inicial', 'Monto_Recaudado', 'Monto_total'];

    useEffect(() => {
        // Actualiza el monto inicial si está presente
        if (route.params?.montoInicial) {
            setMontoInicial(route.params.montoInicial);

            const nuevoDato = [
                '1', // ID_caja
                new Date().toLocaleDateString(), // Fecha_apertura
                '---', // Fecha_cierre (se completará al cerrar la caja)
                route.params.montoInicial, // Monto_inicial
                '0', // Monto_Recaudado
                route.params.montoInicial // Monto_total (igual al monto inicial al abrir)
            ];
            setDatos((prevDatos) => [...prevDatos, nuevoDato]);
        }

        // Actualiza el monto final si está presente
        if (route.params?.montoFinal) {
            setMontoFinal(route.params.montoFinal);

            // Actualiza la última fila de la tabla con la fecha de cierre y el monto final
            setDatos((prevDatos) => {
                const ultimoIndice = prevDatos.length - 1;
                const datosActualizados = [...prevDatos];
                datosActualizados[ultimoIndice] = [
                    '1', // ID_caja
                    datosActualizados[ultimoIndice][1], // Fecha_apertura original
                    new Date().toLocaleDateString(), // Fecha_cierre actual
                    datosActualizados[ultimoIndice][3], // Monto_inicial original
                    route.params.montoFinal - datosActualizados[ultimoIndice][3], // Monto_Recaudado
                    route.params.montoFinal // Monto_total
                ];
                return datosActualizados;
            });
        }
    }, [route.params?.montoInicial, route.params?.montoFinal]);

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
    buttonOpen: {
        backgroundColor: 'green',
        alignItems: 'center',
        padding: 15,
        borderRadius: 10,
        width: '90%',
        marginVertical: 5,
    },
    buttonClose: {
        backgroundColor: 'red',
        alignItems: 'center',
        padding: 15,
        borderRadius: 10,
        width: '90%',
        marginVertical: 5,
    },
    buttonModify: {
        backgroundColor: 'blue',
        alignItems: 'center',
        padding: 15,
        borderRadius: 10,
        width: '90%',
        marginVertical: 5,
    },
    buttonCerrar: {
        backgroundColor: '#BA68C8',
        padding: 15,
        borderRadius: 10,
        width: '90%',
        alignItems: 'center',
        justifyContent: 'center',
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
        textAlign: 'center',
    },
    fondo2: {
        backgroundColor: 'white',
    },
});
