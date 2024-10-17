import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import IniciarSesion from './screens/IniciarSesion';
import WelcomeScreen from './screens/WelcomeScreen';
import CajaScreen from './screens/CajaScreen';
import AperturaCaja from './screens/AperturaCaja';
import Modificar from './screens/Modificar';
import Cierre from './screens/Cierre';
import CierreSesion from './screens/CierreSesion';
const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Welcome">
        <Stack.Screen name="IniciarSesion" component={IniciarSesion} />
        <Stack.Screen name="WelcomeScreen" component={WelcomeScreen} />
        <Stack.Screen name="Caja" component={CajaScreen} />
        <Stack.Screen name="AperturaCaja" component={AperturaCaja} />
        <Stack.Screen name="Modificar" component={Modificar} />
        <Stack.Screen name="Cierre" component={Cierre} />
        <Stack.Screen name="CierreSesion" component={CierreSesion} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

