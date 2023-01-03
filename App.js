import { StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "./components/Login";
import UserContext, { UserProvider } from "./components/context/userContext";
import UserArea from "./components/UserArea/UserArea";
import Plantpedia from "./components/PlantpediaArea/Plantpedia";
import UserPlants from "./components/UserArea/UserPlants";
import UserPlantsContext, {
  UserPlantsProvider,
} from "./components/context/userPlantsContext";
import Forum from "./components/Forum";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <>
      <UserProvider>
        <UserPlantsProvider>
          <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
              <Stack.Screen name="login" component={Login} />
              <Stack.Screen name="user area" component={UserArea} />
              <Stack.Screen name="plantpedia" component={Plantpedia} />
              <Stack.Screen name="my-plants" component={UserPlants} />
              <Stack.Screen name="forum" component={Forum} />
            </Stack.Navigator>
          </NavigationContainer>
        </UserPlantsProvider>
      </UserProvider>
    </>
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
