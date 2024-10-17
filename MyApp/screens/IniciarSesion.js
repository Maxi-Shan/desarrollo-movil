import React from 'react';
import { Image, Text, StyleSheet, View, ScrollView, TouchableOpacity, TextInput, Buttom } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function App() {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <Image source={require('../assets/11.png')} style={[styles.image, StyleSheet.absoluteFill]}/>

      <ScrollView contentContainerStyle= {{
        flex: 1,
        with: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 10,
      }}>
          <View style= {styles.login}>
            
          <Image source={require('../assets/02.png')} style={styles.profilePicture}/>

            {/* <View style={{ marginTop: 30 }}>
              <Text style={{fontSize: 17, fontWeight: '400', color: 'white'}}>Usuario</Text>
            </View>

            <View style={{ marginTop: 20 }}>
              <Text style={{fontSize: 17, fontWeight: '400', color: 'white', textAlign: 'center' }}>Contraseña</Text>
            </View> */}

            <View>
              <Text style={{fontSize: 17, fontWeight: '400', color: 'white'}}>Correo</Text>
              <TextInput style={styles.input} placeholder='usuario@gmail.com'/>
            </View>
            <View>
              <Text style={{fontSize: 17, fontWeight: '400', color: 'white'}}>Contraseña</Text>
              <TextInput style={styles.input} placeholder='contraseña'secureTextEntry={true}/>
            </View>

            <TouchableOpacity 
            style={[styles.buttom, { backgroundColor: '#BA68C8' }]} 
            onPress={() => navigation.navigate('WelcomeScreen')}  // Navega a WelcomeScreen
            >
            <Text style={{ fontSize: 17, fontWeight: '400', color: 'white' }}>Ingresar</Text>
            </TouchableOpacity>

          </View>
      </ScrollView>  
    </View>
  );
}


//estilos
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  login: {
    width: 290,
    height: 440,
    borderColor: '#da78d6',
    borderWidth: 6,
    backgroundColor: '#6F1C7E',
    borderRadius: 10,
    padding: 10,
    alignItems: 'center',
  },
  profilePicture: {
    width: 100,
    height: 100,
    borderColor: '#fff',
    borderRadius: 50,
    borderWidth: 2,
    marginVertical: 6,
  },
  input: {
    width: 250,
    height: 40,
    borderColor: '#fff',
    borderWidth: 2,
    borderRadius: 10,
    padding: 10,
    marginVertical: 10,
    backgroundColor: '#ffffff90',
    marginBottom: 20,
  },
  buttom: {
    width: 250,
    height: 40,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
    borderColor: '#fff',
    borderWidth: 1,
    marginTop: 50,
  },
});