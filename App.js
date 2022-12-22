import { StatusBar, StyleSheet, Text, View, SafeAreaView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { useContext, useState } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './components/Login';
import UserContext from './components/context/userContext';
import UserArea from './components/UserArea/UserArea';
import Plantpedia from './components/PlantpediaArea/Plantpedia';
import UserPlants from './components/UserArea/UserPlants';

const Stack = createNativeStackNavigator();

export default function App() {
  const [user, setUser] = useState('fatfroggo');
  return (
    <UserContext.Provider value={{ user, setUser }}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="login" component={Login} />
          <Stack.Screen name="user area" component={UserArea} />
          <Stack.Screen name="plantpedia" component={Plantpedia} />
          <Stack.Screen name="my-plants" component={UserPlants} />
        </Stack.Navigator>
      </NavigationContainer>
    </UserContext.Provider>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  text: {
    fontSize: 25,
    fontWeight: '500',
  },
  textStyle: {
    textAlign: 'center',
    marginBottom: 8,
  },
});
