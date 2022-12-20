import { StatusBar, StyleSheet, Text, View, SafeAreaView } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "./components/Login";
import UserArea from "./components/UserArea/UserArea";
import Plantpedia from "./components/PlantpediaArea/Plantpedia";
import UserPlants from "./components/UserArea/UserPlants";

import PlantpediaSinglePlant from './components/PlantpediaArea/PlantpediaSinglePlant';


const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="login" component={Login} />
        <Stack.Screen name="user area" component={UserArea} />
        <Stack.Screen name="plantpedia" component={Plantpedia} />
        <Stack.Screen name="my-plants" component={UserPlants} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  text: {
    fontSize: 25,
    fontWeight: "500",
  },
  textStyle: {
    textAlign: "center",
    marginBottom: 8,
  },
});
