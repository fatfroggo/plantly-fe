import {
  StatusBar,
  StyleSheet,
  Text,
  View,
  Pressable,
  Image,
  ScrollView,
  TextInput,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
} from 'react-native';
import { firebase } from '../api/firebase';
import axios from 'axios';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useContext, useEffect, useState } from 'react';
import UserContext from './context/userContext';
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
} from '@expo-google-fonts/raleway';

const Login = ({ navigation }) => {
  const [RegisteredEmail, setRegisteredEmail] = useState('');
  const [RegisteredUsername, setRegisteredUsername] = useState('');
  const [RegisteredPassword, setRegisteredPassword] = useState('');
  const [ConfirmedRegisteredPassword, setConfirmedRegisteredPassword] =
    useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [boolean, setBoolean] = useState(false);
  const [modalLoading, setModalLoading] = useState(false);
  const [unsuccessfulLogin, setUnsuccessfulLogin] = useState(false);
  const { user, setUser } = useContext(UserContext);
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

  useEffect(() => {
    const unsuscribe = firebase.auth().onAuthStateChanged(user => {
      if (user) {
        navigation.reset({
          index: 0,
          routes: [{ name: 'user area' }],
        });
      }
    });
    return unsuscribe;
  }, [boolean]);

  const handleRegisterModal = () => {
    setModalLoading(true);
  };
  const handleSignUp = () => {
    const postBody = {
      username: setRegisteredUsername,
      email: setRegisteredEmail,
      password: setRegisteredPassword,
    };
    console.log(postBody);
    axios
      .post(`https://plantly-api.onrender.com/api/users/users`, postBody)
      .then(res => {});
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(userCredentials => {
        const user = userCredentials.user;
      })
      .catch(error => Alert.alert(error.message));
    setModalLoading(false);
  };
  const handleLogin = () => {
    axios
      .get(`https://plantly-api.onrender.com/api/users/user/${email}`)
      .then(res => {
        let Info = res.data.user;

        setUser(Info.username);
        console.log(user);
        setBoolean(true);
      });
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(userCredentials => {
        const user = userCredentials.user;
      })
      .catch(error => setUnsuccessfulLogin(true));
  };
  if (!fontsLoaded) {
    return null;
  }

  const handleBack = () => {
    setUnsuccessfulLogin(false);
    setModalLoading(false);
  };

  return !fontsLoaded ? (
    <View
      style={{
        backgroundColor: '#2b8b30',
        flex: 1,
        flexDirection: 'row',
      }}
    >
      <Image
        source={require('../assets/loadingLight.gif')}
        style={{ flex: 1, alignSelf: 'center', width: 50 }}
      />
    </View>
  ) : modalLoading ? (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView style={styles.background}>
        <Pressable style={styles.backButton} onPress={handleBack}>
          <Image
            source={require('../assets/back-arrow.png')}
            style={{ height: 30, width: 30 }}
          />
        </Pressable>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.background}
        >
          <View style={styles.container}>
            <Image
              style={styles.logo}
              source={require('../assets/plant-logo.png')}
            />
            <Text style={styles.plantly}>Plantly</Text>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder="Email"
                onChangeText={text => setRegisteredEmail(text)}
              />
            </View>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder="UserName"
                onChangeText={text => setRegisteredUsername(text)}
              />
            </View>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder="Password"
                onChangeText={text => setRegisteredPassword(text)}
              />
            </View>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder="Confirm Password"
                onChangeText={text => setConfirmedRegisteredPassword(text)}
              />
            </View>

            <Pressable style={styles.loginPressable} onPress={handleSignUp}>
              <Text style={styles.loginText}>SignUp</Text>
            </Pressable>
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  ) : (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView style={styles.background}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.background}
        >
          <View style={styles.container}>
            <Image
              style={styles.logo}
              source={require('../assets/plant-logo.png')}
            />
            <Text style={styles.plantly}>Plantly</Text>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder="Email"
                onChangeText={text => setEmail(text)}
              />
            </View>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                secureTextEntry={true}
                placeholder="Password"
                onChangeText={text => setPassword(text)}
              />
            </View>

            {unsuccessfulLogin && (
              <Text style={styles.unsuccessfulLogin}>
                Oops! Wrong email or password!
              </Text>
            )}

            <Pressable onPress={handleLogin}>
              <Text style={styles.loginPressable}>Login</Text>
            </Pressable>

            <Pressable
              style={styles.loginPressable}
              onPress={handleRegisterModal}
            >
              <Text style={styles.registerText}>Register</Text>
            </Pressable>
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  background: {
    backgroundColor: '#729d84',
    flex: 1,
    paddingTop: StatusBar.currentHeight,
    justifyContent: 'center',
    alignItems: 'center',
  },

  backButton: { alignSelf: 'flex-start', marginLeft: 20 },

  container: { marginBottom: '20%', alignSelf: 'center', alignItems: 'center' },
  logo: {
    width: 150,
    height: 150,
    justifyContent: 'center',
  },
  plantly: {
    fontSize: 46,
    marginBottom: 10,
    fontFamily: 'Raleway_300Light',
    color: '#f8fdfb',
    justifyContent: 'center',
  },
  loginPressable: {
    borderColor: '#f8fdfb',
    borderWidth: 1,
    marginTop: 5,
    flexDirection: 'row',
    alignSelf: 'center',
    fontFamily: 'Raleway_400Regular',
    color: '#f8fdfb',
    fontSize: 14,
    paddingVertical: 9,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  loginText: {
    flexDirection: 'row',
    alignSelf: 'center',

    color: '#f8fdfb',
    fontSize: 14,
  },

  unsuccessfulLogin: { fontFamily: 'Raleway_400Regular', marginVertical: 10 },

  input: {
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
  },

  registerText: {
    fontFamily: 'Raleway_400Regular',
    color: '#ECEBE7',
    fontSize: 15,
  },

  inputContainer: {
    backgroundColor: '#f8fdfb',
    width: 150,

    marginTop: 5,

    paddingVertical: 3,
    paddingHorizontal: 20,
    marginBottom: 10,
    borderRadius: 8,
  },
});

export default Login;
