import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  Modal,
  Pressable,
} from "react-native";
import { useState, useContext, useEffect } from "react";
import { getUserPlantByMyPlantId, getUserPlants } from "../../api/api";
import UserPlantsContext from "../context/userPlantsContext";
import UserContext from "../context/userContext";
import MyPlantModal from "./MyPlantModal";
import LastWatered from "./LastWatered";

const Notifications = ({
  modalLoading,
  setModalLoading,
  notificationsLoading,
  setNotificationsLoading,
}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const { userPlantsData, setUserPlantsData } = useContext(UserPlantsContext);
  const [singlePlantData, setSinglePlantData] = useState({});
  const { user, setUser } = useContext(UserContext);

  useEffect(() => {
    getUserPlants(user).then((plants) => {
      setUserPlantsData(plants);
      setNotificationsLoading(false);
    });
  }, [modalVisible]);

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

  return notificationsLoading ? (
    <View
      style={{
        flex: 0.5,
        justifyContent: "center",
        backgroundColor: "#f8fdfb",
      }}
    >
      <Image
        source={require("../../assets/loading.gif")}
        style={{
          alignSelf: "center",
          width: 100,
          height: 100,
        }}
      />
    </View>
  ) : (
    <View style={styles.container}>
      <View style={styles.notifications}>
        <FlatList
          data={userPlantsData}
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
              <View style={styles.watered}>
                <LastWatered plant={item} modalVisible={modalVisible} />
              </View>
            </Pressable>
          )}
          keyExtractor={(item) => item.my_plant_id}
          horizontal={true}
        />
      </View>

      <Modal visible={modalVisible} animationType="slide" transparent={true}>
        <MyPlantModal
          singlePlantData={singlePlantData}
          setModalVisible={setModalVisible}
          modalLoading={modalLoading}
          setModalLoading={setModalLoading}
          handleClose={handleClose}
        />
      </Modal>
    </View>
  );
  // </View>
  // );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    // flexDirection: "column",
    borderRadius: 20,
    marginVertical: 10,
    paddingVertical: 20,
    paddingHorizontal: 10,
    flex: 1,
    backgroundColor: "#f8fdfb",
  },
  title: {
    fontSize: 22,
    flex: 1,
    fontFamily: "Raleway_400Regular",
    paddingLeft: 10,
    paddingTop: 15,
    paddingBottom: 5,
  },
  notifications: {
    flex: 1,
    // textAlign: "center",
    backgroundColor: "#f8fdfb",
  },
  plant: {
    height: "100%",
    // flex: 1,
    paddingHorizontal: 2,
    width: 120,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontFamily: "Raleway_500Medium",
    fontSize: 16,
    flex: 1,
  },
  watered: {
    flex: 1,
    justifyContent: "flex-start",
  },
});
export default Notifications;
