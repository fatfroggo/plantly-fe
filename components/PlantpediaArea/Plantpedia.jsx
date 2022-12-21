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
import { SafeAreaView } from 'react-native-safe-area-context';
import UserAreaHeader from '../UserArea/UserAreaHeader';
import SinglePlantModal from './Modals/SinglePlantModal';
import AddToMyPlantsModal from './Modals/AddToMyPlantsModal';

const Plantpedia = ({ navigation }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [pressed, setPressed] = useState(false);
  const [addPlantButtonPressed, setAddPlantButtonPressed] = useState(false);
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
    getPlants().then(fetchedPlants => {
      setPlantsData(fetchedPlants);
      setIsLoading(false);
    });
  }, []);

  useEffect(() => {
    setSinglePlantData(plantsData[singlePlantIndex - 1]);
  }, [singlePlantIndex]);

  useEffect(() => {
    pressed ? setModalVisible(true) : setModalVisible(false);
  }, [pressed]);

  const togglePressed = () => {
    setPressed(currValue => {
      return !currValue;
    });
  };

  const toggleAddPlantButton = () => {
    setAddPlantButtonPressed(currValue => {
      return !currValue;
    });
  };

  const cancelButton = () => {
    togglePressed();
    toggleAddPlantButton();
  };

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.safe}>
        <StatusBar
          animated={true}
          barStyle="light-content"
          showHideTransition="slide"
          backgroundColor={styles.container.backgroundColor}
        />

        <UserAreaHeader
          header="Plantpedia"
          subHeader="The encyclopedia of plants"
          style={styles.headerText}
        />

        <Nav navigation={navigation} />
      </SafeAreaView>

      <PlantPediaPlants
        plantsData={plantsData}
        setModalVisible={setModalVisible}
        setSinglePlantIndex={setSinglePlantIndex}
        setPlantsData={setPlantsData}
      />

      <Modal visible={modalVisible} animationType="slide" transparent={true}>
        {addPlantButtonPressed ? (
          <AddToMyPlantsModal
            singlePlantData={singlePlantData}
            setPressed={setPressed}
            togglePressed={togglePressed}
            cancelButton={cancelButton}
          />
        ) : (
          <SinglePlantModal
            togglePressed={togglePressed}
            addPlantButtonPressed={addPlantButtonPressed}
            setAddPlantButtonPressed={setAddPlantButtonPressed}
            singlePlantData={singlePlantData}
            setPressed={setPressed}
            toggleAddPlantButton={toggleAddPlantButton}
          />
        )}
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#7F9B91',
  },
  safe: {
    justifyContent: 'flex-end',
    flex: 0.5,
    color: '#1E2720',
  },
  modalView: {
    flex: 1,
    margin: 30,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 30,
    alignItems: 'center',
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
    paddingHorizontal: 20,
    borderRadius: 20,
    flex: 1,
  },
  plantInfo: {
    flex: 2,
  },
  commonName: {
    fontWeight: 'bold',
    fontSize: 30,
  },
  latinName: {
    fontSize: 20,
    fontStyle: 'italic',
  },
  infoText: {
    fontSize: 15,
    paddingVertical: 5,
  },
  buttonsContainer: {
    borderWidth: 1,
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
