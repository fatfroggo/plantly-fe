import { StatusBar, StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './components/Login';
import UserArea from './components/UserArea/UserArea';
import PlantpediaPlants from './components/PlantpediaArea/PlantpediaPlants';
import Homepage from './components/UserArea/Homepage';
import UserPlants from './components/UserArea/UserPlants';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="login" component={Login} />
        <Stack.Screen name="user area" component={UserArea} />
        <Stack.Screen name="home" component={Homepage} />
        <Stack.Screen name="plantpedia" component={PlantpediaPlants} />
        <Stack.Screen name="my-plants" component={UserPlants} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
