import {
  Text,
  View,
  StyleSheet,
  FlatList,
  StatusBar,
  Image,
} from 'react-native';
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
        data={plantsData}
        renderItem={itemData => {
          return (
            <View style={styles.plantsListItem}>
              <View style={styles.plantItemInfo}>
                <View style={styles.namesContainer}>
                  <Text style={styles.commonName}>
                    {itemData.item.common_name}
                  </Text>
                  <Text style={styles.latinName}>
                    {itemData.item.latin_name}
                  </Text>
                </View>
                <Text>{`Climate: ${itemData.item.climate}`}</Text>
              </View>
              <View style={styles.plantItemImage}>
                <Image
                  source={{ uri: itemData.item.picture_url }}
                  height={100}
                  width={100}
                />
              </View>
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
    borderRadius: 20,
    flexDirection: 'row',
    flex: 1,
    margin: 10,
    padding: 20,
  },
  namesContainer: {
    paddingBottom: 20,
  },
  plantItemImage: {
    flex: 1,
  },
  plantItemInfo: {
    flex: 1,
  },
  commonName: {
    fontWeight: 'bold',
    fontSize: 20,
  },
  latinName: {
    fontSize: 15,
    fontStyle: 'italic',
  },
});

export default PlantpediaPlants;
