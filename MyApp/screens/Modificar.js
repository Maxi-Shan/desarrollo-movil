import { StatusBar } from 'expo-status-bar';
import { View, Text, TextInput, TouchableOpacity, ScrollView, ImageBackground, StyleSheet, Alert } from 'react-native';
import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { db } from '../firebaseConfig'; // Asegúrate de importar tu configuración de Firebase
import { doc, updateDoc } from 'firebase/firestore';

const Modificar = ({ route, navigation }) => {
  const { montoInicial, montoRecaudado, id } = route.params;
  const [montoInicialState, setMontoInicialState] = useState(montoInicial.toString());
  const [montoRecaudadoState, setMontoRecaudadoState] = useState(montoRecaudado.toString());
  const [isLoading, setIsLoading] = useState(false);

  const handleModificar = async () => {
    if (!montoInicialState.trim() || !montoRecaudadoState.trim()) {
      Alert.alert('Error', 'Por favor completa los campos obligatorios');
      return;
    }

    if (isNaN(montoInicialState) || isNaN(montoRecaudadoState)) {
      Alert.alert('Error', 'Los montos deben ser números válidos');
      return;
    }

    setIsLoading(true);
    try {
      const docRef = doc(db, 'caja', id);

      // Actualizar el documento con los nuevos valores
      await updateDoc(docRef, {
        monto_inicial: Number(montoInicialState),
        monto_recaudado: Number(montoRecaudadoState),
      });

      Alert.alert(
        'Éxito',
        'Registro modificado correctamente',
        [
          {
            text: 'OK',
            onPress: () => navigation.goBack(),
          },
        ]
      );
    } catch (error) {
      console.error('Error al modificar el registro:', error);
      Alert.alert('Error', 'No se pudo modificar el registro. Intente nuevamente.');
    } finally {
      setIsLoading(false);
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
          <View style={styles.contenedor2}>
            <Text style={styles.label}>Monto Inicial</Text>
            <TextInput
              style={styles.input}
              placeholder="Escribe el monto inicial"
              value={montoInicialState} 
              onChangeText={setMontoInicialState} 
              keyboardType="numeric"
            />
          </View>
          <View style={styles.contenedor2}>
            <Text style={styles.label}>Monto Recaudado</Text>
            <TextInput
              style={styles.input}
              placeholder="Escribe el monto recaudado"
              value={montoRecaudadoState}
              onChangeText={setMontoRecaudadoState} 
              keyboardType="numeric"
            />
          </View>

          <View style={styles.buttonContainer}>
            <TouchableOpacity 
              style={[styles.boton, styles.botonVolver]}
              onPress={() => navigation.goBack()}
            >
              <Text style={styles.textoBoton}>Volver</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={[styles.boton, styles.botonModificar]} 
              onPress={handleModificar}
              disabled={isLoading} // Deshabilita el botón mientras está cargando
            >
              <Text style={styles.textoBoton}>
                {isLoading ? 'Modificando...' : 'Modificar'}
              </Text>
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
  botonModificar: {
    backgroundColor: 'blue',
  },
  textoBoton: {
    color: 'white',
    fontSize: 16,
  },
});


export default Modificar;
