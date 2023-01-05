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

import { SafeAreaView } from "react-native-safe-area-context";
import { useState } from "react";
import {
  useFonts,
  Raleway_100Thin,
  Raleway_200ExtraLight,
  Raleway_300Light,
  Raleway_400Regular,
  Raleway_500Medium,
  Raleway_600SemiBold,
  Raleway_700Bold,
  Raleway_800ExtraBold,
  Raleway_900Black,
  Raleway_100Thin_Italic,
  Raleway_200ExtraLight_Italic,
  Raleway_300Light_Italic,
  Raleway_400Regular_Italic,
  Raleway_500Medium_Italic,
  Raleway_600SemiBold_Italic,
  Raleway_700Bold_Italic,
  Raleway_800ExtraBold_Italic,
  Raleway_900Black_Italic,
} from "@expo-google-fonts/raleway";

const Login = ({ navigation }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  let [fontsLoaded] = useFonts({
    Raleway_100Thin,
    Raleway_200ExtraLight,
    Raleway_300Light,
    Raleway_400Regular,
    Raleway_500Medium,
    Raleway_600SemiBold,
    Raleway_700Bold,
    Raleway_800ExtraBold,
    Raleway_900Black,
    Raleway_100Thin_Italic,
    Raleway_200ExtraLight_Italic,
    Raleway_300Light_Italic,
    Raleway_400Regular_Italic,
    Raleway_500Medium_Italic,
    Raleway_600SemiBold_Italic,
    Raleway_700Bold_Italic,
    Raleway_800ExtraBold_Italic,
    Raleway_900Black_Italic,
  });

  const handlePress = () => {
    navigation.reset({
      index: 0,
      routes: [{ name: "user area" }],
    });
  };
  if (!fontsLoaded) {
    return null;
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView style={styles.background}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={styles.background}
        >
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
            <Pressable onPress={handlePress}>
              <Text style={styles.loginPressable}>Login</Text>
            </Pressable>
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  background: {
    backgroundColor: "#729d84",
    flex: 1,
    paddingTop: StatusBar.currentHeight,
    justifyContent: "center",
    alignItems: "center",
  },
  container: { marginBottom: "20%", alignSelf: "center", alignItems: "center" },
  logo: {
    width: 150,
    height: 150,
    justifyContent: "center",
  },
  plantly: {
    fontSize: 46,
    marginBottom: 10,
    fontFamily: "Raleway_300Light",
    color: "#f8fdfb",
    justifyContent: "center",
  },
  loginPressable: {
    borderColor: "#f8fdfb",
    borderWidth: 1,
    marginTop: 5,
    flexDirection: "row",
    alignSelf: "center",
    fontFamily: "Raleway_400Regular",
    color: "#f8fdfb",
    fontSize: 14,
    paddingVertical: 9,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  loginText: {
    flexDirection: "row",
    alignSelf: "center",

    color: "#f8fdfb",
    fontSize: 14,
  },
  input: {
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
  },
  inputContainer: {
    backgroundColor: "#f8fdfb",
    width: 150,

    marginTop: 5,

    paddingVertical: 3,
    paddingHorizontal: 20,
    marginBottom: 10,
    borderRadius: 8,
  },
});

export default Login;
