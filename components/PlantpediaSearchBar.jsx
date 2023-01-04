import { View, TextInput, StyleSheet, Pressable, Text } from 'react-native';
import { useState, useEffect } from 'react';
import { EvilIcons } from '@expo/vector-icons';
import { TabRouter } from '@react-navigation/native';

const PlantpediaSearchBar = ({ setSearchText }) => {
  const [plantpediaSearchText, setPlantpediaSearchText] = useState('');

  const handleSearch = () => {
    if(plantpediaSearchText.length === 0){
      setSearchText(undefined)
    }
    else{
    setSearchText(plantpediaSearchText);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.search}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search plants"
          onChangeText={setPlantpediaSearchText}
          onSubmitEditing={handleSearch}
        />
        <Pressable onPress={handleSearch}>
          <EvilIcons name="search" size={32} color="#1E2720" />
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
export default PlantpediaSearchBar;
