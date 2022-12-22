import { useEffect, useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  Pressable,
  Image,
  ScrollView,
} from "react-native";

const SinglePlantModal = ({
  singlePlantData,
  setPressed,
  setAddPlantButtonPressed,
  togglePressed,
  toggleAddPlantButton,
}) => {
  return (
    <ScrollView contentContainerStyle={styles.modalView}>
      <View style={styles.plantImage}>
        <Image
          style={{ height: 200, width: 200, borderRadius: 20 }}
          source={{ uri: singlePlantData?.picture_url }}
        />
      </View>

      <View style={styles.plantInfo}>
        <Text style={styles.commonName}>{singlePlantData?.common_name}</Text>
        <Text style={styles.latinName}>{singlePlantData?.latin_name}</Text>
        <Text
          style={styles.infoText}
        >{`Climate: ${singlePlantData?.climate}`}</Text>
        <Text
          style={styles.infoText}
        >{`Origin: ${singlePlantData?.origin}`}</Text>
        <Text
          style={styles.infoText}
        >{`Pruning: ${singlePlantData?.pruning}`}</Text>
        <Text
          style={styles.infoText}
        >{`Watering: ${singlePlantData?.watering_advice}`}</Text>
        <Text
          style={styles.infoText}
        >{`Light: ${singlePlantData?.light_preference}`}</Text>
        <Text
          style={styles.infoText}
        >{`Max temperature: ${singlePlantData?.temp_max}`}</Text>
        <Text
          style={styles.infoText}
        >{`Min temperature: ${singlePlantData?.temp_min}`}</Text>
      </View>
      <View style={styles.buttonsContainer}>
        <Pressable style={styles.pressable} onPress={toggleAddPlantButton}>
          <Text style={styles.pressableText}>Add to my plants</Text>
        </Pressable>
        <Pressable style={styles.pressable} onPress={togglePressed}>
          <Text style={styles.pressableText}>Cancel</Text>
        </Pressable>
      </View>
    </ScrollView>
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
    margin: 30,
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
    paddingBottom: 30,
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
    flexDirection: "row",
  },
  pressable: {
    backgroundColor: "#7F9B91",
    width: "40%",
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 8,
    padding: 10,
    borderRadius: 5,
  },
});

export default SinglePlantModal;
