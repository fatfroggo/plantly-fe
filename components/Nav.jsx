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
    width: '100%',
    flex: 1,
    flexDirection: 'column',
  },

  buttons: {
    flexDirection: 'row',

    justifyContent: 'space-evenly',
    marginVertical: 5,
    width: '100%',
    height: 35,
    backgroundColor: '#f1f1f2',
    borderRadius: 50,
  },
  navPressable: {
    width: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },

  search: {
    width: '100%',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  searchInput: {
    backgroundColor: '#f1f1f2',
  },
});

export default Nav;
