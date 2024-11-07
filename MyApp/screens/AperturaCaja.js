import { View, Text, TextInput, TouchableOpacity, ScrollView, ImageBackground, StyleSheet, Alert } from 'react-native';
import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { addDoc, collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../firebaseConfig';

const AperturaCaja = () => {
  const [montoInicial, setMontoInicial] = useState(''); 
  const [cajaAbierta, setCajaAbierta] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    verificarCajaAbierta();
  }, []);

  const verificarCajaAbierta = async () => {
    try {
      // Consulta para ver si hay alguna caja sin fecha de cierre
      const cajaQuery = query(collection(db, 'caja'), where('fecha_cierre', '==', '---'));
      const snapshot = await getDocs(cajaQuery);

      // Si existe al menos un documento sin fecha de cierre, hay una caja abierta
      if (!snapshot.empty) {
        setCajaAbierta(true);
      }
    } catch (error) {
      console.error("Error al verificar caja abierta: ", error);
      Alert.alert('Error', 'No se pudo verificar el estado de la caja');
    }
  };

  const confirmarMonto = () => {
    if (cajaAbierta) {
      // Muestra una alerta si ya hay una caja abierta
      Alert.alert('Advertencia', 'Debe cerrar la caja actual antes de abrir una nueva.');
    } else {
      // Confirma el monto si no hay caja abierta
      Alert.alert(
        "Confirmar Monto",
        `¿Está seguro de que desea ingresar $${montoInicial} como monto inicial?`,
        [
          { text: "Cancelar", style: "cancel" },
          { text: "Confirmar", onPress: guardarMontoInicial }
        ],
      );
    }
  };

  const guardarMontoInicial = async () => {
    try {
      await addDoc(collection(db, 'caja'), { 
        monto_inicial: montoInicial,
        fecha_apertura: new Date().toISOString(),
        fecha_cierre: '---',
        monto_recaudado: 0,
        monto_total: montoInicial
      });
      Alert.alert('Éxito', 'Monto inicial guardado con éxito');
      navigation.navigate('CajaScreen', { montoInicial: montoInicial });
    } catch (error) {
      console.error("Error al guardar el monto inicial: ", error);
      Alert.alert('Error', 'No se pudo guardar el monto inicial');
    }
  };

  return (
    <ImageBackground 
      source={require('../assets/11.png')}
      style={styles.fondo}
      resizeMode="cover"
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.contenedor}>
          <Text style={styles.titulo}>Apertura de Caja</Text>

          <View style={styles.contenedor2}>
            <Text style={styles.label}>Monto Inicial</Text>
            <TextInput
              style={styles.input}
              placeholder="Escribe el monto inicial"
              value={montoInicial}
              onChangeText={setMontoInicial}
              keyboardType="numeric"
            />
          </View>

          <View style={styles.buttonContainer}>
            <TouchableOpacity 
              style={[styles.boton, styles.botonVolver]} 
              onPress={() => navigation.navigate('CajaScreen')}>
              <Text style={styles.textoBoton}>Volver</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.boton, styles.botonCerrar]}
              onPress={confirmarMonto}>
              <Text style={styles.textoBoton}>Aceptar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </ImageBackground>
  );
};



const styles = StyleSheet.create({
  fondo: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  contenedor: {
    backgroundColor: '#6F1C7E',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    width: 300,
  },
  titulo: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    marginBottom: 20,
  },
  contenedor2: {
    width: '100%',
    marginBottom: 20,
  },
  label: {
    fontSize: 18,
    color: 'white',
    marginBottom: 10,
  },
  input: {
    height: 40,
    borderColor: '#fff',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
    backgroundColor: '#ffffff90',
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  boton: {
    width: '45%',
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: '#fff',
    borderWidth: 1,
  },
  botonCerrar: {
    backgroundColor: 'green',
  },
  textoBoton: {
    color: 'white',
    fontSize: 16,
  },
});

export default AperturaCaja;