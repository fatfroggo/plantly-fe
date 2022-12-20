import { useState } from 'react';
import { Text, View, StyleSheet, StatusBar } from 'react-native';
import Nav from '../Nav';
import PlantPediaPlants from './PlantpediaPlants';
import PlantpediaSinglePlant from './PlantpediaSinglePlant';

const Plantpedia = () => {
  const [plantsList, setPlantsList] = useState(true);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Plantpedia</Text>
        <Text style={styles.subHeadingText}>The encyclopedia of plants</Text>
      </View>
      <Nav />
      {plantsList ? (
        <PlantPediaPlants setPlantsList={setPlantsList} />
      ) : (
        <PlantpediaSinglePlant setPlantsList={setPlantsList} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#7F9B91',
    alignItems: 'center',
  },
  header: {
    flex: 1.5,
    color: '#F1F1F2',
    paddingTop: StatusBar.currentHeight,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  headerText: { color: '#F1F1F2', fontSize: 40 },
  subHeadingText: { color: '#F1F1F2', marginBottom: 20 },
  plantsList: { flex: 8 },
});

export default Plantpedia;
