import { useEffect, useState } from 'react';
import {
  Text,
  View,
  StyleSheet,
  StatusBar,
  Modal,
  Pressable,
  Image,
  ScrollView,
} from 'react-native';
import Nav from '../Nav';
import PlantPediaPlants from './PlantpediaPlants';
import { getPlants } from '../../api/api.js';

const Plantpedia = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [pressed, setPressed] = useState(false);
  const [plantsData, setPlantsData] = useState([]);
  const [singlePlantIndex, setSinglePlantIndex] = useState('1');
  const [singlePlantData, setSinglePlantData] = useState({
    category: 'Dracaena',
    climate: 'Tropical',
    common_name: 'Janet Craig',
    latin_name: "Dracaena deremensis 'Janet Craig'",
    light_preference: 'Strong light',
    origin: 'Cultivar',
    picture_url: 'http://www.tropicopia.com/house-plant/thumbnails/5556.jpg',
    plant_id: 1,
    pruning: 'If needed',
    temp_max: 30,
    temp_min: 10,
    watering_advice: 'Keep moist between watering & Can dry between watering',
  });

  useEffect(() => {
    console.log('first useEffect', singlePlantData);
    getPlants().then(fetchedPlants => {
      setPlantsData(fetchedPlants);
      setIsLoading(false);
    });
  }, []);

  useEffect(() => {
    console.log('second useEffect', singlePlantData);
    setSinglePlantData(plantsData[singlePlantIndex]);
  }, [singlePlantIndex]);

  useEffect(() => {
    console.log('third useEffect', singlePlantData);
    pressed ? setModalVisible(true) : setModalVisible(false);
  }, [pressed]);

  const togglePressed = () => {
    setPressed(currValue => {
      return !currValue;
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Plantpedia</Text>
        <Text style={styles.subHeadingText}>The encyclopedia of plants</Text>
      </View>
      <Nav />
      <PlantPediaPlants
        plantsData={plantsData}
        setModalVisible={setModalVisible}
        setSinglePlantIndex={setSinglePlantIndex}
      />
      {!isLoading && (
        <Modal visible={modalVisible} animationType="slide" transparent={true}>
          <ScrollView contentContainerStyle={styles.modalView}>
            <View style={styles.plantImage}>
              <Image
                style={{ height: 100, width: 100, borderRadius: 20 }}
                source={require('../../assets/test.png')}
              />
            </View>

            <View style={styles.plantInfo}>
              <Text style={styles.commonName}>{singlePlantData?.common_name}</Text>
              <Text style={styles.latinName}>Scientific name</Text>
              <Text>Plant info here</Text>

              <View style={styles.buttonsContainer}>
                <Pressable style={styles.pressable}>
                  <Text>Add to my plants</Text>
                </Pressable>
                <Pressable style={styles.pressable} onPress={togglePressed}>
                  <Text>Cancel</Text>
                </Pressable>
              </View>
            </View>
          </ScrollView>
        </Modal>
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
  modalView: {
    flex: 1,
    margin: 30,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  plantImage: {
    padding: 20,
    borderRadius: 20,
  },
  plantInfo: {
    flex: 1,
    alignItems: 'center',
  },
  commonName: {
    fontWeight: 'bold',
    fontSize: 20,
  },
  latinName: {
    fontSize: 15,
    fontStyle: 'italic',
  },
  buttonsContainer: {
    flexDirection: 'row',
  },
  pressable: {
    backgroundColor: '#7F9B91',
    marginHorizontal: 10,
    padding: 10,
    borderRadius: 5,
  },
});

export default Plantpedia;
