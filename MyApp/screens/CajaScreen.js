import React, { useState, useEffect } from 'react'; 
import { StatusBar } from 'expo-status-bar';
import { View, Text, StyleSheet, TouchableOpacity, ImageBackground, ScrollView, Alert } from 'react-native';
import { Table, Row } from 'react-native-table-component';
import { useNavigation, useRoute } from '@react-navigation/native';
import { collection, getDocs, doc, deleteDoc } from 'firebase/firestore';
import { db } from '../firebaseConfig';

export default function CajaScreen() {
    const navigation = useNavigation();
    const route = useRoute();
    const [datos, setDatos] = useState([]);
    const [montoInicial, setMontoInicial] = useState('');
    const [montoFinal, setMontoFinal] = useState('');
    const [isCajaAbierta, setIsCajaAbierta] = useState(false);

    const encabezado = ['ID_caja', 'Fecha_apertura', 'Fecha_cierre', 'Monto_inicial', 'Monto_Recaudado', 'Monto_total', 'Acciones'];

    useEffect(() => {
        cargarDatos();
    }, []);

    const cargarDatos = async () => {
        const snapshot = await getDocs(collection(db, 'caja'));
        const nuevosDatos = [];
        snapshot.forEach((doc) => {
            const data = doc.data();
            nuevosDatos.push([
                doc.id,
                data.fecha_apertura?.toDate().toLocaleDateString() || '---',
                data.fecha_cierre?.toDate().toLocaleDateString() || '---',
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
            await deleteDoc(doc(db, 'caja', id));
            Alert.alert("Éxito", "Registro eliminado correctamente");
            cargarDatos(); // Actualizar datos después de eliminar
        } catch (error) {
            console.error("Error al eliminar el registro: ", error);
            Alert.alert("Error", "No se pudo eliminar el registro");
        }
    };

    useEffect(() => {
        if (route.params?.montoInicial) {
            const montoInicialNum = parseFloat(route.params.montoInicial);
            setMontoInicial(montoInicialNum);
            setIsCajaAbierta(true);

            const nuevoDato = [
                '1', 
                new Date().toLocaleDateString(),
                '---',
                montoInicialNum,
                0, 
                montoInicialNum
            ];
            setDatos((prevDatos) => [...prevDatos, nuevoDato]);
        }
        
        if (route.params?.montoFinal) {
            const montoFinalNum = parseFloat(route.params.montoFinal);
            setMontoFinal(montoFinalNum);

            setDatos((prevDatos) => {
                const ultimoIndice = prevDatos.length - 1;
                const datosActualizados = [...prevDatos];
                const montoInicialActual = parseFloat(datosActualizados[ultimoIndice][3]);

                const montoRecaudado = montoFinalNum;

                datosActualizados[ultimoIndice] = [
                    '1',
                    datosActualizados[ultimoIndice][1],
                    new Date().toLocaleDateString(),
                    montoInicialActual,
                    montoRecaudado,
                    montoInicialActual + montoRecaudado
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
            <ScrollView style={styles.scroll}>
                <View style={styles.contenedor}>
                    <TouchableOpacity style={styles.buttonOpen} onPress={() => navigation.navigate('AperturaCaja')}>
                        <Text style={styles.buttonText}>Apertura de Caja</Text>
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
                                    <View key={index} style={{ flexDirection: 'row' }}>
                                        <TouchableOpacity
                                            style={styles.buttonModify}
                                            onPress={() => navigation.navigate('Modificar', { id: fila[0] })}
                                        >
                                            <Text style={styles.buttonText}>Modificar</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity
                                            style={styles.buttonDelete}
                                            onPress={() => confirmarEliminar(fila[0])}
                                        >
                                            <Text style={styles.buttonText}>Eliminar</Text>
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
                        <Text style={styles.buttonText}>Cerrar Sesión</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
  fondo: {
    flex: 1,
  },
  encabezado: {
    padding: 20,
    backgroundColor: 'rgba(0,0,0,0.6)',
    alignItems: 'center',
  },
  titulo: {
    fontSize: 24,
    color: 'white',
    fontWeight: 'bold',
  },
  scroll: {
    flex: 1,
  },
  contenedor: {
    alignItems: 'center',
    marginVertical: 10,
  },
  buttonOpen: {
    backgroundColor: 'blue',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  buttonClose: {
    backgroundColor: 'green',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  buttonDisabled: {
    backgroundColor: 'gray',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
  contenedor2: {
    alignItems: 'center',
    marginVertical: 10,
  },
  contenedor3: {
    padding: 10,
  },
  encabezado2: {
    height: 40,
    backgroundColor: '#f1f8ff',
  },
  textoEncabezado: {
    fontWeight: 'bold',
    textAlign: 'center',
  },
  fondo2: {
    height: 50,
    backgroundColor: '#fff',
  },
  textoFila: {
    textAlign: 'center',
  },
  buttonModify: {
    backgroundColor: 'orange',
    padding: 5,
    borderRadius: 5,
    marginHorizontal: 5,
  },
  buttonDelete: {
    backgroundColor: 'red',
    padding: 5,
    borderRadius: 5,
  },
  buttonCerrar: {
    backgroundColor: 'purple',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },

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
