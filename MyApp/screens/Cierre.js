import { StatusBar } from 'expo-status-bar';
import { View, Text, TextInput, TouchableOpacity, ScrollView, ImageBackground, StyleSheet, Alert } from 'react-native';
import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { doc, updateDoc, getDocs, collection } from 'firebase/firestore';
import { db } from '../firebaseConfig';

const CierreCaja = () => {
  const [montoFinal, setMontoFinal] = useState('');
  const [idCaja, setIdCaja] = useState(null); // Estado para guardar el ID de la caja abierta
  const navigation = useNavigation();

  // Cargar el ID de la caja abierta (sin fecha de cierre)
  useEffect(() => {
    const cargarCajaAbierta = async () => {
      try {
        const snapshot = await getDocs(collection(db, 'caja'));
        const cajaAbierta = snapshot.docs.find(doc => doc.data().fecha_cierre === '---');
        
        if (cajaAbierta) {
          setIdCaja(cajaAbierta.id); // Guardar el ID de la caja abierta
        } else {
          Alert.alert('Advertencia', 'No hay ninguna caja abierta.');
        }
      } catch (error) {
        console.error("Error al cargar la caja abierta: ", error);
        Alert.alert('Error', 'No se pudo cargar la caja abierta');
      }
    };

    cargarCajaAbierta();
  }, []);

  const confirmarMontoFinal = () => {
    const numericInput = montoFinal.replace(/[^0-9]/g, ''); // Reemplaza cualquier carácter que no sea un número
    setMontoFinal(numericInput);
  };

  const confirmarMonto = () => {
    if (!idCaja) {
      Alert.alert('Error', 'No se ha encontrado una caja abierta.');
      return;
    }

    Alert.alert(
      "Confirmar Monto Final",
      `¿Está seguro que desea cerrar la caja con $${montoFinal} como monto final?`,
      [
        { text: "Cancelar", style: "cancel" },
        { text: "Confirmar", onPress: guardarMontoFinal }
      ],
    );
  };

  const guardarMontoFinal = async () => {
    if (!idCaja) return;

    try {
      await updateDoc(doc(db, 'caja', idCaja), { // Usa el ID de la caja abierta
        monto_recaudado: montoFinal,
        fecha_cierre: new Date().toISOString()
      });
      Alert.alert('Éxito', 'Monto final guardado con éxito');
      navigation.navigate('CajaScreen', { montoFinal: montoFinal });
    } catch (error) {
      console.error("Error al guardar el monto final: ", error);
      Alert.alert('Error', 'No se pudo guardar el monto final');
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
          <Text style={styles.titulo}>Cierre de Caja</Text>

          <View style={styles.contenedor2}>
            <Text style={styles.label}>Monto Recaudado</Text>
            <TextInput
              style={styles.input}
              placeholder="Ingrese el monto de cierre de caja"
              value={montoFinal}
              onChangeText={setMontoFinal}
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
              <Text style={styles.textoBoton}>Cerrar Caja</Text>
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
  botonVolver: {
    backgroundColor: 'black',
  },
  botonCerrar: {
    backgroundColor: 'red',
  },
  textoBoton: {
    color: 'white',
    fontSize: 16,
  },
});

export default CierreCaja;