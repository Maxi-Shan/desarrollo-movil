import { View, Text, TextInput, TouchableOpacity, ImageBackground, StyleSheet, Alert } from 'react-native';
import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { doc, updateDoc } from 'firebase/firestore';
import { app } from '../firebaseConfig';

const ModificarScreen = ({ route }) => {
  const navigation = useNavigation();
  const { id, montoInicial: inicial, montoRecaudado: recaudado } = route.params;
  const [montoInicial, setMontoInicial] = useState(inicial || '');
  const [montoRecaudado, setMontoRecaudado] = useState(recaudado || '');

  const handleModificar = async () => {
    try {
      const cajaRef = doc(app, 'caja', id);
      await updateDoc(cajaRef, {
        monto_inicial: parseFloat(montoInicial),
        monto_recaudado: parseFloat(montoRecaudado)
      });
      Alert.alert('Éxito', 'Registro modificado exitosamente');
      navigation.navigate('CajaScreen');
    } catch (error) {
      console.error('Error al modificar el registro:', error);
      Alert.alert('Error', 'No se pudo modificar el registro');
    }
  };

  return (
    <ImageBackground 
      source={require('../assets/11.png')}
      style={styles.fondo}
      resizeMode="cover"
    >
      <View style={styles.contenedor}>
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
        <View style={styles.contenedor2}>
          <Text style={styles.label}>Monto Recaudado</Text>
          <TextInput
            style={styles.input}
            placeholder="Escribe aquí"
            value={montoRecaudado}
            onChangeText={setMontoRecaudado}
            keyboardType="numeric"
          />
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={[styles.boton, styles.botonVolver]} onPress={() => navigation.navigate('CajaScreen')}>
            <Text style={styles.textoBoton}>Volver</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.boton, styles.botonModificar]} onPress={handleModificar}>
            <Text style={styles.textoBoton}>Modificar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  fondo: {
    flex: 1,
  },
  contenedor: {
    backgroundColor: '#6F1C7E',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    width: 300,
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
    backgroundColor: 'blue',
  },
  botonModificar: {
    backgroundColor: 'green',
  },
  textoBoton: {
    color: 'white',
    fontSize: 16,
  },
});

export default ModificarScreen;
