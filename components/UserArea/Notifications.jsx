import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  Modal,
  Pressable,
} from "react-native";
import { useState, useEffect, useContext } from "react";
import { getUserPlants, getUserPlantByMyPlantId } from "../../api/api";
import UserPlantsContext from "../context/userPlantsContext";
import UserContext from "../context/userContext";
import Plantpedia from "../PlantpediaArea/Plantpedia";
import { countDown } from "../../utils/utils";
import MyPlantModal from "./MyPlantModal";

const useStatusHandler = (item) => {
  const [timeLeft, setTimeLeft] = useState(0);
  setTimeLeft(countDown(item.time_between_watering, item.last_watered_date));
  return timeLeft;
};

const Notifications = () => {
  const [modalLoading, setModalLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const { userPlantsData, setUserPlantsData } = useContext(UserPlantsContext);
  const [singlePlantData, setSinglePlantData] = useState({});
  const { user, setUser } = useContext(UserContext);

  const handlePress = (my_plant_id) => {
    setModalLoading(true);
    setModalVisible(true);
    getUserPlantByMyPlantId(user, my_plant_id).then((plant) => {
      setSinglePlantData(plant);
      setModalLoading(false);
    });
  };

  const handleClose = () => {
    setModalVisible(false);
  };
  const myItemSeparator = () => {
    return (
      <View
        style={{ height: 1, backgroundColor: "gray", marginHorizontal: 10 }}
      />
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Notifications</Text>
      <View style={styles.notifications}>
        <FlatList
          data={userPlantsData}
          ItemSeparatorComponent={myItemSeparator}
          renderItem={({ item }) => (
            <Pressable
              style={styles.plant}
              onPress={() => {
                handlePress(item.my_plant_id);
              }}
            >
              <Image
                style={{ height: 80, width: 80, borderRadius: 30 }}
                source={{ uri: item.picture_url }}
              />

              <Text style={styles.text}>{item.nickname}</Text>
            </Pressable>
          )}
          keyExtractor={(item) => item.my_plant_id}
          horizontal={true}
        />
      </View>

      <Modal visible={modalVisible} animationType="slide" transparent={true}>
        <MyPlantModal
          singlePlantData={singlePlantData}
          handleClose={handleClose}
          modalLoading={modalLoading}
        />
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flexDirection: "column",
    borderRadius: 20,
    marginVertical: 10,
    padding: 20,
    flex: 1,
    backgroundColor: "#ECEBE7",
  },
  title: {
    fontSize: 25,
    flex: 1,
    paddingLeft: 5,
    paddingBottom: 10,
  },
  notifications: {
    flex: 1,
    backgroundColor: "#ECEBE7",
  },
  plant: {
    height: "100%",
    width: 150,
    alignItems: "center",
    padding: 10,
    borderColor: "red",
    borderWidth: 3,
  },
});
export default Notifications;
