import {
  StatusBar,
  StyleSheet,
  Text,
  View,
  Pressable,
  Image,
  TextInput,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useState } from 'react';

const Login = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handlePress = () => {
    navigation.navigate('user area');
  };

  return (
    <SafeAreaView style={styles.background}>
      <View style={styles.container}>
        <Image
          style={styles.logo}
          source={require('../assets/plant-logo.png')}
        />
        <Text style={styles.plantly}>Plantly</Text>
        <View style={styles.usernameContainer}>
          <TextInput
            style={styles.usernameInput}
            placeholder="Username"
            onChangeText={text => setUsername(text)}
          />
        </View>
        <View style={styles.usernameContainer}>
          <TextInput
            style={styles.passwordInput}
            placeholder="Password"
            onChangeText={text => setPassword(text)}
          />
        </View>
        <Pressable style={styles.loginPressable} onPress={handlePress}>
          <Text style={styles.loginText}>Login</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  background: {
    backgroundColor: '#46B646',
    flex: 1,
    paddingTop: StatusBar.currentHeight,
    justifyContent: 'center',
  },
  container: {
    alignSelf: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 200,
    height: 200,
  },
  loginPressable: {
    borderColor: '#F1F1F2',
    borderWidth: 2,
    padding: 5,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  loginText: {
    color: '#F1F1F2',
  },
  plantly: {
    fontSize: 30,
    color: '#F1F1F2',
  },
  usernameContainer: {
    backgroundColor: '#F1F1F2',
    marginTop: 5,
    marginBottom: 10,
    borderRadius: 5,
  },
  usernameInput: { paddingVertical: 3, paddingHorizontal: 50 },
  passwordContainer: {
    backgroundColor: '#F1F1F2',
    marginBottom: 14,
    borderRadius: 5,
  },
  passwordInput: { paddingVertical: 3, paddingHorizontal: 50 },
});

export default Login;
