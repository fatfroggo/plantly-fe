
import { useEffect, useState } from 'react';
import { Text, View, StyleSheet, StatusBar, Modal } from 'react-native';
import Nav from '../Nav';
import PlantPediaPlants from './PlantpediaPlants';
import { getPlants, getPlantById } from '../../api/api.js';
import { SafeAreaView } from 'react-native-safe-area-context';
import UserAreaHeader from '../UserArea/UserAreaHeader';
import SinglePlantModal from './Modals/SinglePlantModal';
import AddToMyPlantsModal from './Modals/AddToMyPlantsModal';
import ClimateSort from './ClimateSort';


const Plantpedia = ({ navigation }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [modalLoading, setModalLoading] = useState(true);
  const [addPlantButtonPressed, setAddPlantButtonPressed] = useState(false);
  const [plantsData, setPlantsData] = useState([]);
  const [singlePlantData, setSinglePlantData] = useState({});
  const [selectedClimate, setSelectedClimate] = useState(undefined)
  
  useEffect(() => {

    getPlants(selectedClimate).then(fetchedPlants => {

      setPlantsData(fetchedPlants);
    });
  }, [selectedClimate]);

  const handleAddToPlant = (plant_id) => {
    setModalVisible(true);
    setModalLoading(true);
    getPlantById(plant_id).then((plant) => {
      setSinglePlantData(plant);
      setModalLoading(false);
    });
  };

  const handleCancel = () => {
    setModalVisible(false);
    setAddPlantButtonPressed(false);
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

      <ClimateSort selectedClimate={selectedClimate} setSelectedClimate={setSelectedClimate}/>
      <PlantPediaPlants
        plantsData={plantsData}
        setModalVisible={setModalVisible}
        setPlantsData={setPlantsData}
        handleAddToPlant={handleAddToPlant}
      />

      <Modal visible={modalVisible} animationType="slide" transparent={true}>
        {addPlantButtonPressed ? (
          <AddToMyPlantsModal
            singlePlantData={singlePlantData}
            handleCancel={handleCancel}
          />
        ) : (
          <SinglePlantModal
            addPlantButtonPressed={addPlantButtonPressed}
            setAddPlantButtonPressed={setAddPlantButtonPressed}
            singlePlantData={singlePlantData}
            handleCancel={handleCancel}
            setSinglePlantData={setSinglePlantData}
            modalLoading={modalLoading}
          />
        )}
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#7F9B91",
  },
  safe: {
    justifyContent: "flex-end",
    flex: 0.5,
    color: "#1E2720",
  },
  modalView: {
    flex: 1,
    margin: 0,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 30,
    alignItems: "center",
    shadowColor: "#000",
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
    fontWeight: "bold",
    fontSize: 30,
  },
  latinName: {
    fontSize: 20,
    fontStyle: "italic",
  },
  infoText: {
    fontSize: 15,
    paddingVertical: 5,
  },
  buttonsContainer: {
    borderWidth: 1,
    flexDirection: "row",
  },
  pressable: {
    backgroundColor: "#7F9B91",
    marginHorizontal: 10,
    padding: 10,
    borderRadius: 5,
  },
});

export default Plantpedia;
