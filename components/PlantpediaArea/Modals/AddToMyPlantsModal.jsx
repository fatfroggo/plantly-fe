import { useEffect, useState, useContext } from "react";
import {
  Text,
  View,
  StyleSheet,
  Pressable,
  Image,
  TextInput,
  Keyboard,
} from "react-native";
import UserContext from "../../context/userContext";
import { postUserPlant } from "../../../api/api";
import { daysToDate } from "../../../utils/utils";
import UserPlantsContext from "../../context/userPlantsContext";

const AddToMyPlantsModal = ({ singlePlantData, handleCancel }) => {
  const { user, setUser } = useContext(UserContext);
  const { userPlantsData, setUserPlantsData } = useContext(UserPlantsContext);
  const [keyboardShowing, setKeyboardShowing] = useState(false);

  const reqBody = { plant_id: singlePlantData.plant_id, username: user };

  const postPlant = () => {
    postUserPlant(reqBody);
  };

  Keyboard.addListener("keyboardDidShow", () => {
    setKeyboardShowing(true);
  });

  Keyboard.addListener("keyboardDidHide", () => {
    setKeyboardShowing(false);
  });

  return (
    <View style={keyboardShowing ? styles.modalWithKeyboard : styles.modalView}>
      <View style={styles.plantImage}>
        <Image
          style={{ width: 100, height: 100, borderRadius: 20 }}
          source={{ uri: singlePlantData?.picture_url }}
        />
      </View>

      <View style={styles.plantInfo}>
        <Text style={styles.commonName}>{singlePlantData?.common_name}</Text>
        <Text style={styles.latinName}>{singlePlantData?.latin_name}</Text>
      </View>
      <View style={styles.textInputContainer}>
        <TextInput
          style={styles.textInput}
          placeholder="Plant nickname"
          onChangeText={(text) => {
            reqBody.nickname = text;
          }}
        />
        <TextInput
          style={styles.textInput}
          placeholder="Days ago last watered"
          keyboardType={"numeric"}
          onChangeText={(text) => {
            reqBody.last_watered_date = daysToDate(text);
          }}
        />
      </View>
      <View style={styles.buttonsContainer}>
        <Pressable style={styles.pressable} onPress={handleCancel}>
          <Text>Cancel</Text>
        </Pressable>
        <Pressable style={styles.pressable} onPress={postPlant}>
          <Text>Submit</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default AddToMyPlantsModal;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#7F9B91",
  },
  modalView: {
    flex: 1,
    marginHorizontal: "10%",
    marginVertical: "40%",
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

  modalWithKeyboard: {
    flex: 1,
    marginHorizontal: 20,
    marginTop: 20,
    marginBottom: 30,
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
    marginBottom: 15,
  },
  plantInfo: {},
  commonName: {
    fontWeight: "bold",
    fontSize: 20,
    textAlign: "center",
  },
  latinName: {
    fontSize: 15,
    fontStyle: "italic",
    textAlign: "center",
    marginBottom: 15,
  },

  buttonsContainer: {
    flexDirection: "row",
  },
  pressable: {
    backgroundColor: "#7F9B91",
    marginHorizontal: 10,
    padding: 10,
    borderRadius: 5,
  },
  textInputContainer: { marginBottom: 20, alignSelf: "stretch" },
  textInput: {
    backgroundColor: "#84A293",
    padding: 5,
    borderRadius: 10,
    marginBottom: 5,
    alignItems: "stretch",
  },
});
