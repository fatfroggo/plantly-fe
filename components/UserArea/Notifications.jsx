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
    <>
      <Text style={styles.title}>Notifications</Text>
      <View style={styles.container}>
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
                  style={{ height: 80, width: 80, borderRadius: 40 }}
                  source={{ uri: item.picture_url }}
                />
                <Text style={styles.text}>{item.nickname}</Text>
                <View style={styles.watered}>
                  <LastWatered plant={item} />
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
    </>
  );
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
    paddingTop: 4,
    fontFamily: "Raleway_500Medium",
    fontSize: 16,
  },
  watered: {
    flex: 1,
    justifyContent: "flex-start",
  },
});
export default Notifications;
