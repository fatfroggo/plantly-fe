import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  Modal,
  Pressable,
} from "react-native";
import { useState, useContext } from "react";
import { getUserPlantByMyPlantId } from "../../api/api";
import UserPlantsContext from "../context/userPlantsContext";
import UserContext from "../context/userContext";
import MyPlantModal from "./MyPlantModal";
import LastWatered from "./LastWatered";

const Notifications = ({ modalLoading, setModalLoading }) => {
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
  const myItemSeparator = () => {};

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
              <LastWatered style={styles.watered} plant={item} />
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
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flexDirection: "column",
    borderRadius: 20,
    marginVertical: 10,
    paddingVertical: 20,
    paddingHorizontal: 10,
    flex: 1,

    backgroundColor: "#ECEBE7",
  },
  title: {
    fontSize: 25,
    flex: 1,
    paddingLeft: 20,
    paddingBottom: 10,
  },
  notifications: {
    flex: 1,
    textAlign: "center",
    backgroundColor: "#ECEBE7",
  },
  plant: {
    height: "100%",
    width: 120,
    alignItems: "center",
  },
});
export default Notifications;
