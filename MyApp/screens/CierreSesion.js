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
      navigation.navigate('Inicio'); // Navegar a la pantalla de inicio
    } catch (error) {
      console.error("Error al cerrar sesión: ", error);
      Alert.alert("Error", "No se pudo cerrar la sesión.");
    }
  };

  return (
    <View style={styles.container}> 
      <StatusBar style="light"/>
      <Image source={require('../assets/11.png')} style={[styles.image, StyleSheet.absoluteFill]} />

      <View>
        <Image source={require('../assets/logo.png')} style={styles.logo}/>
      </View>

      <View style={styles.tarjeta}>

        <Text style={styles.titulo}> Estas por cerrar sesion </Text>
        <Text style={styles.subtitulo}> ¿Estas seguro que quieres cerrar sesión? </Text>

        <View style={styles.containerBoton}>
          <TouchableOpacity style={styles.cajaBoton} onPress={cerrarSesion}> {/* Llama a cerrarSesion */}
              <Text style={styles.textoBoton}> Confirmar </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.containerBoton}>
          <TouchableOpacity style={styles.cajaBoton} onPress={() => navigation.navigate('Caja')}>
              <Text style={styles.textoBoton}> Cancelar </Text>
          </TouchableOpacity>
        </View>

      </View>
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
  },
});