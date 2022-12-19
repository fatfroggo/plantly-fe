import { Text, View, StyleSheet, FlatList, StatusBar } from 'react-native';
import { useState, useEffect } from 'react';
import { getPlants } from '../../api/api.js';

const PlantpediaPlants = () => {
  const [plantsData, setPlantsData] = useState([]);

  useEffect(() => {
    getPlants.then(fetchedPlants => {
      setPlantsData(fetchedPlants);
    });
  });

  return (
    <View style={styles.container}>
      <FlatList
        numColumns={2}
        data={plantsData}
        renderItem={itemData => {
          return (
            <View style={styles.plantsListItem}>
              <Text>{itemData.item.category}</Text>
            </View>
          );
        }}
        keyExtractor={(item, index) => {
          return item.plant_id;
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 5,
    backgroundColor: '#7F9B91',
    flexDirection: 'row',
  },
  plantsList: { flex: 1 },
  header: { flex: 1.5, color: '#F1F1F2', paddingTop: StatusBar.currentHeight },
  headerText: { color: '#F1F1F2', fontSize: 40 },
  subHeadingText: { color: '#F1F1F2' },
  plantsListItem: {
    backgroundColor: '#F1F1F2',
    borderRadius: 5,
    flex: 1,
    margin: 10,
  },
});

export default PlantpediaPlants;
