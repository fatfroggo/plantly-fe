import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  SafeAreaView,
  FlatList,
  Image,
  Pressable,
  Modal,
} from "react-native";
import Nav from "../Nav";
import UserAreaHeader from "./UserAreaHeader";
import UserContext from "../context/userContext";
import { useEffect, useState, useContext } from "react";
import {
  getUserPlants,
  deleteUserPlant,
  getUserPlantByMyPlantId,
} from "../../api/api";

import MyPlantModal from "./MyPlantModal";
import dayjs from "dayjs";
import UserPlantsContext from "../context/userPlantsContext";
import LastWatered from "./LastWatered";
import { dateToDays } from "../../utils/utils";
const relativeTime = require("dayjs/plugin/relativeTime");
dayjs.extend(relativeTime);

const UserPlants = ({ navigation }) => {
  const [userPlantsLoading, setUserPlantsLoading] = useState(true);
  const [modalLoading, setModalLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const { userPlantsData, setUserPlantsData } = useContext(UserPlantsContext);
  const [singlePlantData, setSinglePlantData] = useState({});
  const { user, setUser } = useContext(UserContext);
  const [wateredToday, setWateredToday] = useState(false);

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

  const deletePlant = (id) => {
    deleteUserPlant(user, id).then(() => {
      setUserPlantsData((currPlants) => {
        const newPlants = currPlants.filter((plant) => {
          return plant.my_plant_id !== id;
        });
        return newPlants;
      });
    });
  };
  useEffect(() => {
    getUserPlants(user).then((plants) => {
      setUserPlantsData(plants);
      setUserPlantsLoading(false);
    });
  }, [singlePlantData.last_watered_date]);
  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.safe}>
        <StatusBar
          animated={true}
          barStyle="light-content"
          showHideTransition="slide"
          backgroundColor={styles.safe.backgroundColor}
        />
        <View style={styles.header}>
          <UserAreaHeader header="My Plants" style={styles.header} />
          <Nav navigation={navigation} />
        </View>
      </SafeAreaView>

      <View style={styles.userAreaBody}>
        {userPlantsLoading ? (
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
        ) : (
          <FlatList
            style={styles.flatList}
            numColumns={2}
            data={userPlantsData}
            renderItem={({ item }) => {
              return (
                <Pressable
                  style={styles.plantsListItem}
                  onPress={() => {
                    handlePress(item.my_plant_id);
                  }}
                  onLongPress={() => {
                    deletePlant(item.my_plant_id);
                  }}
                >
                  <View style={styles.plantItemImage}>
                    <Image
                      source={{ uri: item.picture_url }}
                      style={{ height: 55, width: 55, borderRadius: 100 }}
                    />
                  </View>

                  <View style={styles.plantItemInfo}>
                    <Text style={styles.plantItemHeader}>{item.nickname}</Text>
                    <Text style={styles.info}>{item.common_name}</Text>
                    <LastWatered plant={item} style={styles.plantItemInfo} />
                    {dateToDays(item.last_watered_date) === 0 ? (
                      <Text style={styles.lastWatered}> Watered: Today</Text>
                    ) : (
                      <Text style={styles.lastWatered}>
                        Watered: {dateToDays(item.last_watered_date)} days ago
                      </Text>
                    )}
                  </View>
                </Pressable>
              );
            }}
            keyExtractor={(item, index) => {
              return item.my_plant_id;
            }}
          />
        )}
      </View>
      <Modal visible={modalVisible} animationType="slide" transparent={true}>
        <MyPlantModal
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
          singlePlantData={singlePlantData}
          handleClose={handleClose}
          modalLoading={modalLoading}
          setModalLoading={setModalLoading}
          setWateredToday={setWateredToday}
        />
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#D9D9D9",
    flex: 5,
  },
  safe: {
    width: "100%",
    flex: 0.5,
    backgroundColor: "#729d84",
    color: "#f8fdfb",
  },

  userAreaBody: {
    flex: 1,
    alignSelf: "center",
    flexDirection: "row",
    marginHorizontal: 5,
    justifyContent: "center",
    alignContent: "center",
  },

  button: {
    backgroundColor: "#f8fdfb",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 6,
    marginHorizontal: 10,
    borderRadius: 20,
  },

  header: {
    flex: 1.5,
    // color: "#f8fdfb",
    paddingTop: StatusBar.currentHeight,
  },
  flatList: {
    flex: 1,
    marginVertical: 10,
    alignContent: "center",
    alignSelf: "auto",
  },
  plantsListItem: {
    backgroundColor: "#f8fdfb",
    borderRadius: 20,
    height: "95%",
    width: "47%",
    flexDirection: "row",
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "flex-start",
    marginHorizontal: 5,
    marginVertical: 5,
    alignItems: "center",
    paddingVertical: 15,
  },

  plantItemImage: {
    paddingHorizontal: 6,
  },
  plantItemHeader: {
    // fontWeight: "bold",
    // textAlign: "center",
    fontFamily: "Raleway_600SemiBold",
    color: "#041b27",
    fontSize: 15,
  },

  plantItemInfo: {
    // textAlign: "center",
    fontFamily: "Raleway_400Regular",
    flex: 1,
    paddingHorizontal: 6,
    color: "#041b27",
  },
  info: {
    fontSize: 11,
    // textAlign: "center",
    fontFamily: "Raleway_400Regular_Italic",
    color: "#041b27",
    marginBottom: 3,
  },
  lastWatered: {
    textAlign: "left",
    fontFamily: "Raleway_400Regular",
    color: "#041b27",
    fontSize: 13,
  },
});

export default UserPlants;
