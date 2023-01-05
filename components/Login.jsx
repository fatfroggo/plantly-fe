import {
  StatusBar,
  StyleSheet,
  Text,
  View,
  Pressable,
  Image,
  TextInput,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { firebase } from "../api/firebase";
import axios from "axios";
import { SafeAreaView } from "react-native-safe-area-context";
import { useContext, useEffect, useState } from "react";
import UserContext from "./context/userContext";
import {
  useFonts,
  Raleway_200ExtraLight,
  Raleway_300Light,
  Raleway_400Regular,
  Raleway_500Medium,
  Raleway_600SemiBold,
  Raleway_700Bold,
} from "@expo-google-fonts/raleway";

const Login = ({ navigation }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [boolean, setBoolean] = useState(false);
    const { user, setUser } = useContext(UserContext);
  let [fontsLoaded] = useFonts({
    Raleway_200ExtraLight,
    Raleway_300Light,
    Raleway_400Regular,
    Raleway_500Medium,
    Raleway_600SemiBold,
    Raleway_700Bold,
  });

   useEffect(() => {
     const unsuscribe = firebase.auth().onAuthStateChanged((user) => {
       if (user) {
         navigation.reset({
           index: 0,
           routes: [{ name: "user area" }],
         });
       }
     });
     return unsuscribe;
   }, [boolean]);

 const handlePress = () => {
   axios
     .get(`https://plantly-api.onrender.com/api/users/user/${email}`)
     .then((res) => {
       let Info = res.data.user;

       setUser(Info.username);
       console.log(user);
       setBoolean(true);
     });
   firebase
     .auth()
     .signInWithEmailAndPassword(email, password)
     .then((userCredentials) => {
       const user = userCredentials.user;
     })
     .catch((error) => alert(error.message));
 };

  return !fontsLoaded ? (
    <View
      style={{
        backgroundColor: "#2b8b30",
        flex: 1,
        flexDirection: "row",
      }}
    >
      <Image
        source={require("../assets/loadingLight.gif")}
        style={{ flex: 1, alignSelf: "center", width: 50 }}
      />
    </View>
  ) : (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.background}
    >
      <SafeAreaView style={styles.background}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.container}>
            <Image
              style={styles.logo}
              source={require("../assets/plant-logo.png")}
            />
            <Text style={styles.plantly}>Plantly</Text>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder="Username"
                onChangeText={(text) => setUsername(text)}
              />
            </View>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder="Password"
                onChangeText={(text) => setPassword(text)}
              />
            </View>
            <Pressable style={styles.loginPressable} onPress={handlePress}>
              <Text style={styles.loginText}>Login</Text>
            </Pressable>
          </View>
        </TouchableWithoutFeedback>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  background: {
    backgroundColor: "#2b8b30",
    flex: 1,
    paddingTop: StatusBar.currentHeight,
    justifyContent: "center",
  },
  container: { marginBottom: "20%", alignSelf: "center", alignItems: "center" },
  logo: {
    width: 150,
    height: 150,
  },
  plantly: {
    fontSize: 40,
    marginBottom: 10,
    fontFamily: "Raleway_400Regular",
    color: "#ECEBE7",
  },
  loginPressable: {
    borderColor: "#ECEBE7",
    borderWidth: 1,
    marginTop: 5,
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  loginText: {
    fontFamily: "Raleway_400Regular",
    color: "#ECEBE7",
    fontSize: 14,
  },

  inputContainer: {
    backgroundColor: "#ECEBE7",
    marginTop: 5,
    paddingVertical: 3,
    paddingHorizontal: 50,
    marginBottom: 10,
    borderRadius: 8,
  },
  // input: { paddingVertical: 5, paddingHorizontal: 50 },
});

export default Login;
