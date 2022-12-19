import data from '../../data/data.js';
import { Text, View, StyleSheet, FlatList, StatusBar } from 'react-native';
import Nav from '../Nav';
import { useState } from 'react';

const PlantpediaPlants = () => {
  const [plantsData, setPlantsData] = useState(data);

  return (
    <FlatList
      data={plantsData}
      renderItem={itemData => {
        return (
          <View>
            {' '}
            style={styles.plantsListItem}
            <Text>{itemData.item.Category}</Text>
          </View>
        );
      }}
      keyExtractor={(item, index) => {
        return item.id;
      }}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#7F9B91',
    alignItems: 'center',
  },
  header: { flex: 1.5, color: '#F1F1F2', paddingTop: StatusBar.currentHeight },
  headerText: { color: '#F1F1F2', fontSize: 40 },
  subHeadingText: { color: '#F1F1F2' },
  plantsList: { flex: 8 },
  plantsListItem: {},
});

export default PlantpediaPlants;
