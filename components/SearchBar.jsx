import { View, TextInput, StyleSheet } from 'react-native';
import { useState } from 'react';

const SearchBar = () => {
  const [search, setSearch] = useState('');

  return (
    <View style={styles.container}>
      <TextInput placeholder="Search" onChangeText={setSearch} value={search} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
  },
});
export default SearchBar;
