import { View, TextInput, StyleSheet, Pressable, Text } from 'react-native';
import { useState, useEffect } from 'react';
import { EvilIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const SearchBar = () => {
  const navigation = useNavigation();

  const [searchText, setSearchText] = useState('');

  const handleSearch = () => {
    navigation.navigate('plantpedia', { searchText });
  };

  return (
    <View style={styles.container}>
      <View style={styles.search}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search plants"
          onChangeText={setSearchText}
          onSubmitEditing={handleSearch}
        />
        <Pressable onPress={handleSearch}>
          <EvilIcons name="search" size={24} color="#1E2720" />
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 5,
  },

  search: {
    flexDirection: 'row',
    color: '#27242A',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    height: 35,
    paddingHorizontal: 13,
    borderRadius: 40,
    backgroundColor: '#ECEBE7',
  },
  searchInput: {
    width: '90%',
    height: '100%',
  },
});
export default SearchBar;
