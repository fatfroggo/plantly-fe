import { useEffect, useState, useContext } from "react";
import {
  Text,
  View,
  StyleSheet,
  Pressable,
  Image,
  TextInput,
  Keyboard,
  Alert,
  TouchableWithoutFeedback,
} from "react-native";
import UserContext from "../../context/userContext";
import { postUserPlant } from "../../../api/api";
import { daysToDate } from "../../../utils/utils";
import UserPlantsContext from "../../context/userPlantsContext";

const AddToMyPlantsModal = ({
  singlePlantData,
  handleCancel,
  setModalVisible,
}) => {
  const { user, setUser } = useContext(UserContext);
  const { userPlantsData, setUserPlantsData } = useContext(UserPlantsContext);
  const [submitDisabled, setSubmitDisabled] = useState(false);
  const [keyboardShowing, setKeyboardShowing] = useState(false);

  const reqBody = { plant_id: singlePlantData.plant_id, username: user };

  const postPlant = () => {
    setSubmitDisabled(true);
    postUserPlant(reqBody).then(() => {
      setModalVisible(false);
    });
  };

  Keyboard.addListener("keyboardDidShow", () => {
    setKeyboardShowing(true);
  });

  Keyboard.addListener("keyboardDidHide", () => {
    setKeyboardShowing(false);
  });

  return (
    <View style={styles.modalContainer}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View
          style={keyboardShowing ? styles.modalWithKeyboard : styles.modalView}
        >
          <View style={styles.plantImage}>
            <Image
              style={{ width: 100, height: 100, borderRadius: 20 }}
              source={{ uri: singlePlantData?.picture_url }}
            />
          </View>

          <View style={styles.plantInfo}>
            <Text style={styles.commonName}>
              {singlePlantData?.common_name}
            </Text>
            <Text style={styles.latinName}>{singlePlantData?.latin_name}</Text>
          </View>
          <View style={styles.textInputContainer}>
            <Text style={styles.textInputTitle}>
              Give your plant a nickname!
            </Text>
            <TextInput
              style={styles.textInput}
              placeholder="Plant nickname"
              onChangeText={(text) => {
                reqBody.nickname = text;
              }}
            />
            <Text style={styles.textInputTitle}>
              How many days ago did you water this plant?
            </Text>
            <TextInput
              style={styles.textInput}
              placeholder="Enter days here"
              keyboardType={"numeric"}
              onChangeText={(text) => {
                reqBody.last_watered_date = daysToDate(text);
              }}
            />
          </View>
          {submitDisabled ? (
            <View
              style={{
                alignSelf: "center",
              }}
            >
              <Image
                source={require("../../../assets/loading.gif")}
                style={{ height: 100, width: 100 }}
              />
            </View>
          ) : (
            <View style={styles.buttonsContainer}>
              <Pressable
                style={styles.pressable}
                disabled={submitDisabled}
                onPress={postPlant}
              >
                <Text
                  style={{ color: "#f8fdfb", fontFamily: "Raleway_400Regular" }}
                >
                  Submit
                </Text>
              </Pressable>
              <Pressable style={styles.pressable} onPress={handleCancel}>
                <Text
                  style={{ color: "#f8fdfb", fontFamily: "Raleway_400Regular" }}
                >
                  Cancel
                </Text>
              </Pressable>
            </View>
          )}
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
};

export default AddToMyPlantsModal;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  modalView: {
    flex: 1,
    backgroundColor: "rgba(248, 253, 251, 1)",
    marginHorizontal: 40,
    marginVertical: "40%",
    backgroundColor: "#f8fdfb",
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
    marginHorizontal: 40,
    marginTop: 20,
    marginBottom: 10,
    backgroundColor: "#f8fdfb",
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

  modalContainer: { flex: 1, backgroundColor: "rgba(0, 0, 0, 0.5)" },

  plantImage: {
    paddingHorizontal: 20,
    borderRadius: 20,
    marginVertical: 5,
  },
  plantInfo: {},
  commonName: {
    fontFamily: "Raleway_600SemiBold",
    color: "#041b27",
    fontSize: 22,
    textAlign: "center",
    // marginTop: 5,
  },
  latinName: {
    fontSize: 14,
    fontFamily: "Raleway_400Regular_Italic",
    textAlign: "center",
    color: "#041b27",
    marginBottom: 10,
  },

  buttonsContainer: {
    flexDirection: "row",
  },
  pressable: {
    backgroundColor: "#294753",
    width: "40%",
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 8,
    paddingVertical: 10,
    paddingBottom: 12,
    borderRadius: 30,
  },
  textInputTitle: {
    textAlign: "center",

    fontFamily: "Raleway_400Regular",
    marginTop: 10,
    paddingBottom: 5,
  },
  textInputContainer: {
    marginBottom: 5,
    alignSelf: "center",
    width: "100%",
    backgroundColor: "#d9d9d9",
    padding: 10,
    borderRadius: 20,
  },
  textInput: {
    backgroundColor: "#f8fdfb",
    padding: 5,
    color: "#041b27",
    fontFamily: "Raleway_300Light",
    borderRadius: 10,
    marginBottom: 5,
    alignItems: "center",
    textAlign: "center",
  },
});
