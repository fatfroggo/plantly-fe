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
        />

        <Nav navigation={navigation} />
        <PlantpediaSearchBar
          setSearchText={setSearchText}
          // style={{ marginTop: 10 }}
        />
        <View style={styles.sortAndId}>
          <ClimateSort
            selectedClimate={selectedClimate}
            setSelectedClimate={setSelectedClimate}
          />
          <Pressable style={styles.plantId} onPress={handlePlantId}>
            <Image
              source={require("../../assets/camera.jpg")}
              style={{ height: 25, width: 30 }}
            />
          </Pressable>
          <Text style={styles.plantIdText}>Plant{"\n"}ID</Text>
        </View>
      </SafeAreaView>
      {plantpediaLoading ? (
        <View
          style={{
            flex: 1,
            // marginTop: "20%",
            alignItems: "center",
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
        <View style={{ flex: 1 }}>
          <Text style={styles.learnMore}>
            Tap a plant for more information!
          </Text>
          <PlantPediaPlants
            plantsData={plantsData}
            setPlantsData={setPlantsData}
            handleAddToPlant={handleAddToPlant}
            isInvalidSearch={isInvalidSearch}
            invalidSearchText={invalidSearchText}
          />
        </View>
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
    backgroundColor: "#729d84",
  },
  safe: {
    width: "100%",
    flex: 0.9,
    backgroundColor: "#729d84",
    color: "#f8fdfb",
    marginTop: 10,
  },

  invalid: {
    fontFamily: "Raleway_400Regular",
    fontSize: 25,
    padding: 20,
    color: "#f8fdfb",
  },
  sortAndId: {
    // flex: 0.2,
    // overflow: "visible",
    flexDirection: "row",
    // height: 40,
    alignItems: "center",
    backgroundColor: "#d9d9d9",
    paddingHorizontal: 20,
    paddingBottom: 5,
  },
  learnMore: {
    paddingHorizontal: 20,
    textAlign: "center",
    backgroundColor: "#d9d9d9",
    paddingTop: 5,
    paddingBottom: 9,
    fontSize: 18,
    marginBottom: 0,
    // marginTop: 10,
    fontFamily: "Raleway_400Regular",
  },
  plantId: {
    fontFamily: "Raleway_400Regular",
    alignSelf: "center",
    alignItems: "center",
    alignContent: "center",
    justifyContent: "center",
    backgroundColor: "white",
    marginVertical: 3,
    marginLeft: 10,
    marginRight: 5,
    paddingRight: 1,
    // padding: 10,
    borderRadius: 200,
    height: 45,
    width: 45,
  },
  plantIdText: {
    // textAlign: "center",
    fontSize: 15,
    fontFamily: "Raleway_400Regular",
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

  // plantImage: {
  //   paddingHorizontal: 20,
  //   borderRadius: 20,
  //   flex: 1,
  // },
  // plantInfo: {
  //   fontFamily: "Raleway_400Regular",
  //   flex: 2,
  // },
  // commonName: {
  //   fontFamily: "Raleway_500Medium",

  //   fontSize: 30,
  // },
  // latinName: {
  //   fontFamily: "Raleway_500Medium",

  //   fontSize: 20,
  // },
  // infoText: {
  //   fontSize: 15,
  //   paddingVertical: 5,
  // // },
  // buttonsContainer: {
  //   borderWidth: 1,
  //   flexDirection: "row",
  // // },
  // pressable: {
  //   backgroundColor: "#7F9B91",
  //   marginHorizontal: 10,
  //   padding: 10,
  //   borderRadius: 5,
  // },
});

export default Plantpedia;
