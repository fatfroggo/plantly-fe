import { useEffect, useState } from 'react';
import { Text, View, StyleSheet, StatusBar, Modal, Image } from 'react-native';
import PlantpediaNav from '../PlantpediaNav';
import PlantPediaPlants from './PlantpediaPlants';
import { getPlants, getPlantById, getPlantsByQuery } from '../../api/api.js';

import { SafeAreaView } from 'react-native-safe-area-context';
import UserAreaHeader from '../UserArea/UserAreaHeader';
import SinglePlantModal from './Modals/SinglePlantModal';
import AddToMyPlantsModal from './Modals/AddToMyPlantsModal';

import ClimateSort from './ClimateSort';

const Plantpedia = ({ route, navigation }) => {
  const [plantpediaLoading, setPlantpediaLoading] = useState(true);
  const [searchText, setSearchText] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [modalLoading, setModalLoading] = useState(true);
  const [addPlantButtonPressed, setAddPlantButtonPressed] = useState(false);
  const [plantsData, setPlantsData] = useState([]);
  const [singlePlantData, setSinglePlantData] = useState({});

  const [isInvalidSearch, setIsInvalidSearch] = useState(false);
  const [invalidSearchText, setInvalidSearchText] = useState('');
  const [plantpediaSearch, setPlantpediaSearch] = useState(false);
  const [selectedClimate, setSelectedClimate] = useState(undefined);

  useEffect(() => {
    getPlants(selectedClimate).then(fetchedPlants => {
      setPlantsData(fetchedPlants);
    });
  }, [selectedClimate]);

  useEffect(() => {
    if (route.params && !plantpediaSearch) {
      setPlantpediaSearch(false);
      setSearchText(route.params.searchText);
      setIsInvalidSearch(false);
      getPlantsByQuery(searchText)
        .then(fetchedPlants => {
          setPlantsData(fetchedPlants);
          setPlantpediaLoading(false)
        })
        .catch(() => {
          setPlantpediaSearch(false);
          setIsInvalidSearch(true);
          setInvalidSearchText(searchText);
          setPlantpediaLoading(false)
        });
    } else if (searchText.length > 0) {
      setIsInvalidSearch(false);
      getPlantsByQuery(searchText)
        .then(fetchedPlants => {
          setPlantsData(fetchedPlants);
          setPlantpediaLoading(false)
        })
        .catch(() => {
          setIsInvalidSearch(true);
          setInvalidSearchText(searchText);
          setPlantpediaLoading(false)
        });
    } else {
      setIsInvalidSearch(false);
      getPlants().then(fetchedPlants => {
        setPlantsData(fetchedPlants);
        setPlantpediaLoading(false)
      });
    }
  }, [searchText]);

  const handleAddToPlant = plant_id => {
    setModalVisible(true);
    setModalLoading(true);
    getPlantById(plant_id).then(plant => {
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

        <PlantpediaNav
          navigation={navigation}
          setPlantpediaSearch={setPlantpediaSearch}
          setSearchText={setSearchText}
          route={route}
        />
      </SafeAreaView>

      <ClimateSort
        selectedClimate={selectedClimate}
        setSelectedClimate={setSelectedClimate}
      />
      {plantpediaLoading ? (
        <View
          style={{
            alignSelf: 'center',
          }}
        >
          <Image
            source={require('../../assets/loadingLight.gif')}
            style={{ height: 200, width: 200 }}
          />
        </View>
      ) : (
        <PlantPediaPlants
          plantsData={plantsData}
          setModalVisible={setModalVisible}
          setPlantsData={setPlantsData}
          handleAddToPlant={handleAddToPlant}
          isInvalidSearch={isInvalidSearch}
          invalidSearchText={invalidSearchText}
        />
      )}

      <Modal visible={modalVisible} animationType="slide" transparent={true}>
        {addPlantButtonPressed ? (
          <AddToMyPlantsModal
            singlePlantData={singlePlantData}
            handleCancel={handleCancel}
            setModalVisible={setModalVisible}
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
    backgroundColor: '#7F9B91',
  },
  safe: {
    justifyContent: 'flex-end',
    flex: 0.5,
    color: '#1E2720',
  },
  modalView: {
    flex: 1,
    margin: 0,
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
