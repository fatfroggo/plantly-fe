import { View, TextInput, StyleSheet, Pressable, Text } from 'react-native';
import { useState } from 'react';
import { EvilIcons } from '@expo/vector-icons';

const SearchBar = () => {
  const [search, setSearch] = useState('');

  const searchFilterFunction = (text) => {
    // Check if searched text is not blank
    if (text) {
      // Inserted text is not blank
      // Filter the masterDataSource and update FilteredDataSource
      const newData = masterDataSource.filter(
        function (item) {
          // Applying filter for the inserted text in search bar
          const itemData = item.title
              ? item.title.toUpperCase()
              : ''.toUpperCase();
          const textData = text.toUpperCase();
          return itemData.indexOf(textData) > -1;
        }
      );
      setFilteredDataSource(newData);
      setSearch(text);
    } else {
      // Inserted text is blank
      // Update FilteredDataSource with masterDataSource
      setFilteredDataSource(masterDataSource);
      setSearch(text);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.search}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search"
          onChangeText={setSearch}
          value={search}
        />
        <EvilIcons name="search" size={24} color="#00000" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },

  search: {
    flexDirection: 'row',
    color: '#27242A',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    height: 35,
    paddingHorizontal: 15,
    paddingVertical: 5,
    margin: 5,
    borderRadius: 40,
    backgroundColor: '#f1f1f2',
  },
  searchInput: {
    width: '90%',
    height: '100%',
  }
});
export default SearchBar;
