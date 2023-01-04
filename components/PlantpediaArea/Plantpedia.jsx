import { useEffect, useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  StatusBar,
  Modal,
  Image,
  Pressable,
} from "react-native";
import PlantPediaPlants from "./PlantpediaPlants";
import { getPlants, getPlantById } from "../../api/api.js";
import * as ImagePicker from "expo-image-picker";
import { SafeAreaView } from "react-native-safe-area-context";
import UserAreaHeader from "../UserArea/UserAreaHeader";
import SinglePlantModal from "./Modals/SinglePlantModal";
import AddToMyPlantsModal from "./Modals/AddToMyPlantsModal";
import PlantIdModal from "./Modals/plantIdModal";
import axios from "axios";
import ClimateSort from "./ClimateSort";
import Nav from "../Nav";
import PlantpediaSearchBar from "../PlantpediaSearchBar";

const Plantpedia = ({ navigation }) => {
  const [plantpediaLoading, setPlantpediaLoading] = useState(true);
  const [searchText, setSearchText] = useState(undefined);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalLoading, setModalLoading] = useState(true);
  const [addPlantButtonPressed, setAddPlantButtonPressed] = useState(false);
  const [plantsData, setPlantsData] = useState([]);
  const [singlePlantData, setSinglePlantData] = useState({});

  const [isInvalidSearch, setIsInvalidSearch] = useState(false);
  const [invalidSearchText, setInvalidSearchText] = useState("");
  const [selectedClimate, setSelectedClimate] = useState(undefined);
  const [plantIdModalVisible, setPlantIdModalVisible] = useState(false);
  const [plantIdModalLoading, setPlantIdModalLoading] = useState(true);
  const [plantSuggestions, setPlantSuggestions] = useState([{}]);

  useEffect(() => {
    getPlants(selectedClimate, searchText)
      .then((fetchedPlants) => {
        setIsInvalidSearch(false);
        setPlantsData(fetchedPlants);
        setPlantpediaLoading(false);
      })
      .catch(() => {
        setIsInvalidSearch(true);
        setInvalidSearchText(searchText);
        setPlantpediaLoading(false);
      });
  }, [selectedClimate, searchText]);

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

  const handleClosePlantIdModal = () => {
    setPlantIdModalVisible(false);
    setPlantIdModalLoading(true);
  };

  const handlePlantId = () => {
    setPlantIdModalVisible(true);
    ImagePicker.launchCameraAsync({ base64: true }).then((res) => {
      const imgBase64 = res.assets[0]["base64"];
      return axios
        .post("https://plant.id/api/v2/identify", {
          images: [imgBase64],
          plant_details: ["common_names", "wiki_image"],
          api_key: "JfQUcSr9TXzmj6TWBtg1yOzbVWqdzEAblciBqvZmbgX6u0rbZ0",
        })
        .then((data) => {
          setPlantSuggestions(data.data.suggestions);
          setPlantIdModalLoading(false);
        });
    });
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

        <PlantpediaSearchBar setSearchText={setSearchText} />
      </SafeAreaView>

      <View style={styles.sortAndId}>
        <ClimateSort
          selectedClimate={selectedClimate}
          setSelectedClimate={setSelectedClimate}
        />
        <Pressable style={styles.plantId} onPress={handlePlantId}>
          <Image
            source={require("../../assets/camera.jpg")}
            style={{ height: 30, width: 35 }}
          />
        </Pressable>
        <Text style={styles.plantIdText}>Plant{"\n"}ID</Text>
      </View>

      {plantpediaLoading ? (
        <View
          style={{
            alignSelf: "center",
          }}
        >
          <Image
            source={require("../../assets/loadingLight.gif")}
            style={{ height: 200, width: 200 }}
          />
        </View>
      ) : isInvalidSearch ? (
        <View style={styles.container}>
          <Text style={styles.invalid}>
            Oops! No plants found with the name '{invalidSearchText}'
          </Text>
        </View>
      ) : (
        <PlantPediaPlants
          plantsData={plantsData}
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
      <Modal
        visible={plantIdModalVisible}
        animationType="slide"
        transparent={true}
      >
        <PlantIdModal
          plantSuggestions={plantSuggestions}
          plantIdModalLoading={plantIdModalLoading}
          handleClosePlantIdModal={handleClosePlantIdModal}
        />
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#7F9B91",
  },
  invalid: {
    fontSize: 25,
    padding: 20,
    color: "white",
  },
  sortAndId: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  plantId: {
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
    marginVertical: 5,
    marginHorizontal: 10,
    padding: 10,
    borderRadius: 200,
    height: 50,
    width: 50,
  },
  plantIdText: { textAlign: "center", fontSize: 15 },
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
