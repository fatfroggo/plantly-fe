import { SafeAreaView } from 'react-native-safe-area-context';
import SearchBar from './SearchBar';
import {
  Text,
  Pressable,
  StyleSheet,
  StatusBar,
  View,
  TextInput,
} from 'react-native';
import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';

const Nav = () => {
  const [search, setSearch] = useState('');
  const navigation = useNavigation()
  const updateSearch = search => {
    setSearch(search);
  };

  return (
    <View style={styles.container}>
      <View style={styles.buttons}>
        <Pressable
          style={styles.navPressable}
          onPress={() => {
            navigation.navigate('home');
          }}
        >
          <Text>Home</Text>
        </Pressable>

        <Pressable
          style={styles.navPressable}
          onPress={() => {
            navigation.navigate('my-plants');
          }}
        >
          <Text>My Plants</Text>
        </Pressable>

        <Pressable
          style={styles.navPressable}
          onPress={() => {
            navigation.navigate('plantpedia');
          }}
        >
          <Text>Plantpedia</Text>
        </Pressable>
      </View>
      <SearchBar />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    alignContent: 'center',
    width: '90%',
  },

  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignContent: 'stretch',
    marginVertical: 5,
    height: 35,
    color: '#1E2720'
  },
  navPressable: {
    width: '30%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ECEBE7',
    borderRadius: 50,
  },
});

export default Nav;
