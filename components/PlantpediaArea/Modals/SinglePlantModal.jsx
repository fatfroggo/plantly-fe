import {
  Text,
  View,
  StyleSheet,
  Pressable,
  Image,
  ScrollView,
  Dimensions,
} from "react-native";

const SinglePlantModal = ({
  singlePlantData,
  handleCancel,
  modalLoading,
  setAddPlantButtonPressed,
}) => {
  return modalLoading ? (
    <View style={styles.modalLoading}>
      <View
        style={{
          alignSelf: "center",
        }}
      >
        <Image
          source={require("../../../assets/loading.gif")}
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
      <Text style={styles.commonName}>{singlePlantData?.common_name}</Text>
      <Text style={styles.latinName}>{singlePlantData?.latin_name}</Text>
      <ScrollView
        persistentScrollbar={true}
        contentContainerStyle={styles.plantInfo}
      >
        <View style={styles.needsHeading}>
          <Text style={styles.needsSubHeading}>Information</Text>
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

          <Text style={styles.subHeading}>Min temperature</Text>
          <Text style={styles.infoText}>{singlePlantData?.temp_min}°C</Text>
        </View>
      </ScrollView>
      <View style={styles.buttonsContainer}>
        <Pressable style={styles.pressable} onPress={setAddPlantButtonPressed}>
          <Text style={styles.pressableText}>Add to my plants</Text>
        </Pressable>
        <Pressable style={styles.pressable} onPress={handleCancel}>
          <Text style={styles.pressableText}>Cancel</Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8fdfb",
  },
  safe: {
    justifyContent: "center",
    flex: 0.5,
    color: "#f8fdfb",
  },
  modalView: {
    flex: 1,
    marginHorizontal: Dimensions.get("window").width / 10,
    marginVertical: Dimensions.get("window").height / 9,
    backgroundColor: "#f8fdfb",
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
    // borderColor: "red",
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
  needsSubHeading: {
    fontSize: 24,
    fontFamily: "Raleway_600SemiBold",
    color: "#294753",
    paddingTop: 5,
    marginHorizontal: 5,
  },
  needsHeading: {
    width: "100%",
    paddingBottom: 6,
  },

  needsContainer: {
    width: "49%",
  },
  commonName: {
    fontFamily: "Raleway_700Bold",
    color: "#041b27",
    fontSize: 28,
    textAlign: "center",
    marginTop: 5,
  },
  latinName: {
    fontSize: 16,
    fontFamily: "Raleway_400Regular_Italic",
    textAlign: "center",
    color: "#041b27",
    marginBottom: 10,
  },
  lastWatered: {
    height: "5%",
    marginBottom: 10,
  },

  subHeading: {
    marginHorizontal: 5,
    color: "#041b27",
    fontSize: 16,
    fontFamily: "Raleway_500Medium",
  },
  infoText: {
    marginHorizontal: 5,
    color: "#041b27",
    fontSize: 14,
    fontFamily: "Raleway_300Light",
    marginBottom: 15,
  },
  buttonsContainer: {
    flexDirection: "row",
    marginTop: 20,
  },
  pressable: {
    backgroundColor: "#294753",
    width: "40%",
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 8,
    padding: 7,
    borderRadius: 30,
  },
  pressableText: {
    textAlign: "center",
    color: "#f8fdfb",
    fontFamily: "Raleway_400Regular",
  },

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

export default SinglePlantModal;
