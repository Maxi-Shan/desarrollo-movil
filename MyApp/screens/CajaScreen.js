import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react'; 
import { View, Text, StyleSheet, TouchableOpacity, ImageBackground, ScrollView, Alert } from 'react-native';
import { Table, Row } from 'react-native-table-component';
import { useNavigation, useRoute } from '@react-navigation/native';
import { collection, getDocs, doc, deleteDoc } from 'firebase/firestore';
import { db } from '../firebaseConfig';

export default function CajaScreen() {
    const navigation = useNavigation();
    const route = useRoute();
    const [datos, setDatos] = useState([]);
    const [isCajaAbierta, setIsCajaAbierta] = useState(false);

    const encabezado = ['ID', 'Fecha Apertura', 'Fecha Cierre', 'Monto Inicial', 'Monto Recaudado', 'Monto Total', 'Acciones'];

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            cargarDatos(); // Cargar datos cada vez que la pantalla se enfoca
        });
        return unsubscribe; 
    }, [navigation]);

    const cargarDatos = async () => {
        try {
            const snapshot = await getDocs(collection(db, 'caja'));
            const nuevosDatos = [];
            let cajaAbierta = false;

            snapshot.forEach((doc) => {
                const data = doc.data();
                const fechaApertura = data.fecha_apertura
                    ? new Date(data.fecha_apertura).toLocaleString('es-ES', {
                        day: '2-digit',
                        month: '2-digit',
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                    }) 
                    : '---';
                const fechaCierre = data.fecha_cierre && data.fecha_cierre !== '---'
                    ? new Date(data.fecha_cierre).toLocaleString('es-ES', {
                        day: '2-digit',
                        month: '2-digit',
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                    })
                    : '---';

                nuevosDatos.push({
                    fecha_apertura: fechaApertura,
                    fecha_cierre: fechaCierre,
                    monto_inicial: data.monto_inicial || '---',
                    monto_recaudado: data.monto_recaudado || '---',
                    monto_total: (parseFloat(data.monto_inicial) || 0) + (parseFloat(data.monto_recaudado) || 0),
                    firebaseId: doc.id,
                });

                if (data.fecha_cierre === '---') cajaAbierta = true;
            });

            setIsCajaAbierta(cajaAbierta);
            setDatos(nuevosDatos);
        } catch (error) {
            console.error("Error al cargar datos:", error);
            Alert.alert("Error", "No se pudieron cargar los datos");
        }
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
            await deleteDoc(doc(db, 'caja', id));
            Alert.alert("Éxito", "Registro eliminado correctamente");
            cargarDatos();
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
                        <Text style={styles.buttonText1}>Apertura de Caja</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.contenedor2}>
                    <TouchableOpacity 
                        style={[styles.buttonClose, !isCajaAbierta && styles.buttonDisabled]} 
                        onPress={() => {
                            if (isCajaAbierta) {
                                navigation.navigate('Cierre');
                            } else {
                                Alert.alert("Advertencia", "Debe realizar la apertura de caja primero.");
                            }
                        }}
                        disabled={!isCajaAbierta}
                    >
                        <Text style={styles.buttonText1}>Cierre de Caja</Text>
                    </TouchableOpacity>
                </View>
                
                <View style={styles.contenedor3}>
                    <Table borderStyle={{ borderWidth: 2, borderColor: '#c8e1ff' }}>
                        <Row data={encabezado} style={styles.encabezado2} textStyle={styles.textoEncabezado} />
                        {datos.map((fila, index) => (
                            <Row
                                key={index}
                                data={[
                                    index + 1, // ID incremental
                                    fila.fecha_apertura,
                                    fila.fecha_cierre,
                                    fila.monto_inicial,
                                    fila.monto_recaudado,
                                    fila.monto_total,
                                    <View style={styles.botonContainer}>
                                        <TouchableOpacity
                                            style={[styles.buttonModify]} 
                                            onPress={() => {
                                                if (!isCajaAbierta) {
                                                    navigation.navigate('Modificar', {
                                                        montoInicial: fila.monto_inicial, 
                                                        montoRecaudado: fila.monto_recaudado, 
                                                        id: fila.firebaseId
                                                    });
                                                } else {
                                                    Alert.alert("Advertencia", "Debe cerrar la caja primero.");
                                                }
                                            }}
                                        >
                                            <Text style={styles.buttonText}>M</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity
                                            style={styles.buttonDelete}
                                            onPress={() => confirmarEliminar(fila.firebaseId)}
                                        >
                                            <Text style={styles.buttonText}>E</Text>
                                        </TouchableOpacity>
                                    </View>
                                ]}
                                style={styles.fondo2}
                                textStyle={styles.textoFila}
                            />
                        ))}
                    </Table>
                </View>

                <View style={styles.contenedor2}>
                    <TouchableOpacity style={styles.buttonCerrar} onPress={() => navigation.navigate('CierreSesion')}>
                        <Text style={styles.buttonText1}>Cerrar Sesión</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    fondo: { flex: 1 },
    encabezado: { height: 60, backgroundColor: '#6F1C7E', justifyContent: 'center', alignItems: 'center' },
    titulo: { fontSize: 30, color: 'black', fontWeight: 'bold' },
    scroll: { flex: 1 },
    contenedor: { justifyContent: 'center', alignItems: 'center', marginTop: 10 },
    buttonOpen: { backgroundColor: 'green', alignItems: 'center', padding: 15, borderRadius: 10, width: '90%', marginVertical: 5 },
    buttonClose: { backgroundColor: 'red', alignItems: 'center', padding: 15, borderRadius: 10, width: '90%', marginVertical: 5 },
    buttonModify: { backgroundColor: 'blue', alignItems: 'center', padding: 6, borderRadius: 5, margin: 2 },
    buttonDelete: { backgroundColor: 'red', alignItems: 'center', padding: 6, borderRadius: 5, margin: 2 },
    buttonCerrar: { backgroundColor: '#BA68C8', padding: 15, borderRadius: 10, width: '90%', alignItems: 'center', justifyContent: 'center', marginTop: 50 },
    buttonText: { color: 'white', fontSize: 12, fontWeight: 'bold' },
    buttonText1: { color: 'white', fontSize: 15, fontWeight: 'bold' },
    contenedor2: { justifyContent: 'center', alignItems: 'center', marginTop: 10 },
    contenedor3: { padding: 16, paddingTop: 30 },
    encabezado2: { height: 40, backgroundColor: 'violet' },
    textoEncabezado: { fontSize: 10, textAlign: 'center', fontWeight: 'bold' },
    textoFila: { textAlign: 'center' },
    fondo2: { backgroundColor: 'white' },
    botonContainer: { flexDirection: 'row', justifyContent: 'center' },
});
