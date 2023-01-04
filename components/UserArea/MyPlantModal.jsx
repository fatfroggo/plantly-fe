const dayjs = require("dayjs");
const customParseFormat = require("dayjs/plugin/customParseFormat");

import {
  Text,
  View,
  StyleSheet,
  Pressable,
  Image,
  ScrollView,
  Dimensions,
} from "react-native";
import { countDown, dateToDays } from "../../utils/utils";
import { useState, useContext } from "react";
import UserContext from "../context/userContext";
import LastWatered from "./LastWatered";
import {updatePlantLastWatered} from "../../api/api";

const MyPlantModal = ({
  singlePlantData,
  handleClose,
  modalLoading,
  setModalVisible,
}) => {
  const { user, setUser } = useContext(UserContext);

  const patchBody = {
    my_plant_id: singlePlantData.my_plant_id,
    username: user,
    last_watered_date: dayjs().format("YYYY/MM/DD"),
  };

  const handleWater = () => {
    updatePlantLastWatered(patchBody).then((plant) => {
      console.log(plant);
      setModalVisible(false);
    });
  };
  return modalLoading ? (
    <View style={styles.modalLoading}>
      <View
        style={{
          alignSelf: "center",
        }}
      >
        <Image
          source={require("../../assets/loading.gif")}
          style={{ height: 200, width: 200 }}
        />
      </View>
    </View>
  ) : (
    <View style={styles.modalView}>
      <View style={styles.plantImage}>
        <Image
          style={{ height: 200, width: 200, borderRadius: 20 }}
          source={{ uri: singlePlantData?.picture_url }}
        />
      </View>
      <Text style={styles.commonName}>{singlePlantData?.nickname}</Text>
      <Text style={styles.latinName}>{singlePlantData?.common_name}</Text>
      <View style={styles.lastWatered}>
        <LastWatered plant={singlePlantData} />
      </View>
      <ScrollView
        persistentScrollbar={true}
        contentContainerStyle={styles.plantInfo}
      >
        <View style={styles.needsHeading}>
          <Text style={styles.needsSubHeading}>Information</Text>
        </View>
        <View style={styles.needsContainer}>
          <Text style={styles.subHeading}>Latin Name</Text>
          <Text style={styles.infoText}>{singlePlantData?.latin_name}</Text>
        </View>

        <View style={styles.needsContainer}>
          <Text style={styles.subHeading}>Climate</Text>
          <Text style={styles.infoText}>{singlePlantData?.climate}</Text>
        </View>

        <View style={styles.needsContainer}>
          <Text style={styles.subHeading}>Origin</Text>
          <Text style={styles.infoText}>{singlePlantData?.origin}</Text>
        </View>

        <View style={styles.needsHeading}>
          <Text style={styles.needsSubHeading}>Needs</Text>
        </View>
        <View style={styles.needsContainer}>
          <Text style={styles.subHeading}>Pruning</Text>
          <Text style={styles.infoText}>{singlePlantData?.pruning}</Text>

          <Text style={styles.subHeading}>Watering</Text>
          <Text style={styles.infoText}>
            {singlePlantData?.watering_advice}
          </Text>

          <Text style={styles.subHeading}>Light</Text>
          <Text style={styles.infoText}>
            {singlePlantData?.light_preference}
          </Text>
        </View>

        <View style={styles.needsContainer}>
          <Text style={styles.subHeading}>Max temperature</Text>
          <Text style={styles.infoText}>{singlePlantData?.temp_max}°C</Text>
          {/* </View> */}

          {/* <View style={styles.needsContainer}> */}
          <Text style={styles.subHeading}>Min temperature</Text>
          <Text style={styles.infoText}>{singlePlantData?.temp_min}°C</Text>
        </View>
      </ScrollView>
      <View style={styles.buttonsContainer}>
        <Pressable style={styles.pressable}>
          <Text style={styles.pressableText} onPress={handleWater}>
            Water today
          </Text>
        </Pressable>
        <Pressable style={styles.pressable}>
          <Text style={styles.pressableText} onPress={handleClose}>
            Close
          </Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#7F9B91",
  },
  safe: {
    justifyContent: "center",
    flex: 0.5,
    color: "#1E2720",
  },
  modalView: {
    flex: 1,
    marginHorizontal: Dimensions.get("window").width / 10,
    marginVertical: Dimensions.get("window").height / 15,
    backgroundColor: "white",
    borderRadius: 20,
    paddingVertical: 30,
    paddingHorizontal: 15,
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
  mainHeading: {
    borderColor: "red",
    borderWidth: 2,
    // flex: 2,
  },
  plantImage: {
    paddingHorizontal: 20,
    borderRadius: 20,
  },
  plantInfo: {
    flexDirection: "row",
    flexWrap: "wrap",
    paddingRight: 10,
  },
  needsSubHeading: { fontSize: 25, marginHorizontal: 5 },
  needsHeading: { width: "100%", paddingBottom: 10 },
  needsContainer: {
    width: "49%",
  },
  commonName: {
    fontWeight: "bold",
    fontSize: 25,
    textAlign: "center",
    marginTop: 5,
  },
  latinName: {
    fontSize: 14,
    fontStyle: "italic",
    textAlign: "center",
    // marginBottom: 10,
  },
  lastWatered: {
    height: "5%",
    marginBottom: 10,
  },
  lastWateredText: {
    fontSize: 20,
  },
  subHeading: {
    marginHorizontal: 5,
    fontSize: 16,
    fontWeight: "bold",
  },
  infoText: {
    marginHorizontal: 5,
    fontSize: 14,
    marginBottom: 15,
  },
  buttonsContainer: {
    flexDirection: "row",
    marginTop: 20,
  },
  pressable: {
    backgroundColor: "#7F9B91",
    width: "40%",
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 8,
    padding: 10,
    borderRadius: 20,
  },
  pressableText: { textAlign: "center" },

  modalLoading: {
    flex: 1,
    justifyContent: "center",
    marginHorizontal: Dimensions.get("window").width / 10,
    marginVertical: Dimensions.get("window").height / 15,
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
});

export default MyPlantModal;
