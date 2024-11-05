import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ImageBackground, Alert, ScrollView } from 'react-native';
import { Table, Row } from 'react-native-table-component';
import { useNavigation } from '@react-navigation/native';
import { collection, getDocs, doc, deleteDoc } from 'firebase/firestore';
import { app } from '../firebaseConfig';

export default function CajaScreen() {
    const navigation = useNavigation();
    const [datos, setDatos] = useState([]);
    const encabezado = ['ID_caja', 'Fecha_apertura', 'Fecha_cierre', 'Monto_inicial', 'Monto_Recaudado', 'Monto_total', 'Acciones'];

    useEffect(() => {
        cargarDatos();
    }, []);

    const cargarDatos = async () => {
        const snapshot = await getDocs(collection(app, 'caja'));
        const nuevosDatos = [];
        snapshot.forEach((doc) => {
            const data = doc.data();
            nuevosDatos.push([
                doc.id,
                data.fecha_apertura || '---',
                data.fecha_cierre || '---',
                data.monto_inicial || '---',
                data.monto_recaudado || '---',
                data.monto_total || '---',
            ]);
        });
        setDatos(nuevosDatos);
    };

    const confirmarEliminar = (id) => {
        Alert.alert(
            "Confirmar Eliminación",
            "¿Está seguro de que desea eliminar este registro?",
            [
                { text: "Cancelar", style: "cancel" },
                { text: "Eliminar", onPress: () => eliminarRegistro(id) }
            ]
        );
    };

    const eliminarRegistro = async (id) => {
        try {
            await deleteDoc(doc(app, 'caja', id));
            Alert.alert("Éxito", "Registro eliminado correctamente");
            cargarDatos(); // Actualizar datos después de eliminar
        } catch (error) {
            console.error("Error al eliminar el registro: ", error);
            Alert.alert("Error", "No se pudo eliminar el registro");
        }
    };

    return (
        <ImageBackground 
            source={require('../assets/11.png')}
            style={styles.fondo}
            resizeMode="cover"
        >
            <View style={styles.encabezado}>
                <Text style={styles.titulo}>Caja</Text>
            </View>
            <ScrollView style={styles.scroll}>
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
                
                <View style={styles.contenedor3}>
                    <Table borderStyle={{ borderWidth: 2, borderColor: '#c8e1ff' }}>
                        <Row data={encabezado} style={styles.encabezado2} textStyle={styles.textoEncabezado} />
                        {datos.map((fila, index) => (
                            <Row
                                key={index}
                                data={[
                                    ...fila,
                                    <>
                                        <TouchableOpacity
                                            style={styles.buttonModify}
                                            onPress={() => navigation.navigate('Modificar', { id: fila[0], montoInicial: fila[3], montoRecaudado: fila[4] })}
                                        >
                                            <Text style={styles.buttonText}>Modificar</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity
                                            style={styles.buttonDelete}
                                            onPress={() => confirmarEliminar(fila[0])}
                                        >
                                            <Text style={styles.buttonText}>Eliminar</Text>
                                        </TouchableOpacity>
                                    </>
                                ]}
                                style={styles.fondo2}
                                textStyle={styles.textoFila}
                            />
                        ))}
                    </Table>
                </View>

                <View style={styles.contenedor2}>
                <TouchableOpacity 
                    style={styles.buttonCerrar} 
                    onPress={() => navigation.navigate('CierreSesion')}
                >   
                    <Text style={styles.buttonText}>Cerrar Sesión</Text>
                </TouchableOpacity>
                </View>
            </ScrollView>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    fondo: { flex: 1 },
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
    scroll: {
        flex: 1,
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
        padding: 5,
        borderRadius: 5,
        margin: 2,
    },
    buttonDelete: {
        backgroundColor: 'red',
        alignItems: 'center',
        padding: 5,
        borderRadius: 5,
        margin: 2,
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
        fontSize: 12,
        fontWeight: 'bold',
    },
    contenedor2: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
    },
    contenedor3: { padding: 16, paddingTop: 30 },
    encabezado2: { height: 40, backgroundColor: 'violet' },
    textoEncabezado: { fontSize: 10, textAlign: 'center', fontWeight: 'bold' },
    textoFila: { textAlign: 'center' },
    fondo2: { backgroundColor: 'white' },
});
