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
  Button,
  Keyboard,
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";
import { useState } from "react";
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
  let [fontsLoaded] = useFonts({
    Raleway_200ExtraLight,
    Raleway_300Light,
    Raleway_400Regular,
    Raleway_500Medium,
    Raleway_600SemiBold,
    Raleway_700Bold,
  });

  const handlePress = () => {
    navigation.reset({
      index: 0,
      routes: [{ name: "user area" }],
    });
  };

  return (
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
    borderColor: "black",
    borderWidth: 2,
    width: 200,
    height: 200,
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
    paddingVertical: 5,
    paddingHorizontal: 50,
    marginBottom: 10,
    borderRadius: 8,
  },
  // input: { paddingVertical: 5, paddingHorizontal: 50 },
});

export default Login;
