import { StatusBar } from 'expo-status-bar';
import { View, Text, TextInput, TouchableOpacity, ScrollView, ImageBackground, StyleSheet } from 'react-native';
import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';

const App = () => {
  const navigation = useNavigation();
  const [monto, setMonto] = useState(''); 

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
              value={monto}
              onChangeText={setMonto}
              keyboardType="numeric"
            />
          </View>
          <View style={styles.contenedor2}>
            <Text style={styles.label}>Monto Recaudado</Text>
            <TextInput
              style={styles.input}
              placeholder="Escribe aquí"
              value={monto}
              onChangeText={setMonto}
              keyboardType="numeric"
            />
          </View>

          <View style={styles.buttonContainer}>
            <TouchableOpacity style={[styles.boton, styles.botonVolver]} onPress={() => navigation.navigate('CajaScreen')}>
              <Text style={styles.textoBoton}>Volver</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.boton, styles.botonCerrar]} onPress={() => alert('Botón Cerrar presionado')}>
              <Text style={styles.textoBoton}>Cerrar</Text>
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
    backgroundColor: 'blue',
  },
  botonCerrar: {
    backgroundColor: 'green',
  },
  textoBoton: {
    color: 'white',
    fontSize: 16,
  },
});

export default App;