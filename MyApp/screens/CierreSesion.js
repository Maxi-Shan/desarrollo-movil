import { StatusBar } from "expo-status-bar";
import { Text, StyleSheet, View, Image, TouchableOpacity, Alert } from "react-native";
import { useNavigation } from '@react-navigation/native';
import { getAuth, signOut } from "firebase/auth"; // Importar signOut

export default function CierreSesion() {

  const navigation = useNavigation();
  const auth = getAuth();

  const cerrarSesion = async () => {
    try {
      await signOut(auth);
      Alert.alert("Sesión cerrada", "Has cerrado sesión correctamente.");
      navigation.navigate('IniciarSesion'); // Navegar a la pantalla de inicio
    } catch (error) {
      console.error("Error al cerrar sesión: ", error);
      Alert.alert("Error", "No se pudo cerrar la sesión.");
    }
  };

  return (
    <View style={styles.container}> 
      <StatusBar style="light" />
      <Image source={require('../assets/11.png')} style={[styles.image, StyleSheet.absoluteFill]} />

      <View>
        <Image source={require('../assets/logo.png')} style={styles.logo} />
      </View>

      <View style={styles.tarjeta}>

        <Text style={styles.titulo}>Estas por cerrar sesión</Text>
        <Text style={styles.subtitulo}>¿Estás seguro de que quieres cerrar sesión?</Text>

        <View style={styles.containerBoton}>
          <TouchableOpacity style={styles.cajaBoton} onPress={cerrarSesion}>
            <Text style={styles.textoBoton}>Confirmar</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.containerBoton}>
          <TouchableOpacity style={styles.cajaBoton2} onPress={() => navigation.navigate('WelcomeScreen')}>
            <Text style={styles.textoBoton}>Cancelar</Text>
          </TouchableOpacity>
        </View>

      </View>
    </View>
  );
}

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
  logo: {
    width: 200,  // Ajusta el tamaño de tu logo según lo necesites
    height: 100,
    resizeMode: 'contain',
    marginBottom: 20,
  },
  tarjeta: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    width: '80%',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  titulo: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitulo: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center',
    color: '#555',
  },
  containerBoton: {
    width: '100%',
    marginVertical: 10,
  },
  cajaBoton: {
    backgroundColor: 'green',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cajaBoton2: {
    backgroundColor: 'red',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textoBoton: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
