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

const Nav = ({ navigation }) => {
  const [search, setSearch] = useState('');

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
    color: '#27242A',
  },
  navPressable: {
    width: '30%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f1f1f2',
    borderRadius: 50,
  },
});

export default Nav;
