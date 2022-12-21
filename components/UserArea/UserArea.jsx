import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  SafeAreaView,
  FlatList,
  Image,
  Pressable,
} from "react-native";
import Nav from "../Nav";
import UserAreaHeader from "./UserAreaHeader";
import Notifications from "./Notifications";
import { useEffect, useState } from "react";
import { getPlantById, getPlants } from "../../api/api";

import randomPlantGenerator from "./RandomPlantGenerator";

const UserArea = ({ navigation }) => {
  const [randomId, setRandomId] = useState();
  const [pageData, setPageData] = useState([]);
  const [pressed, setPressed] = useState(false);

  const toggleIsPressed = () => {
    setPressed(true);
    
  };

  useEffect(() => {
    getPlants().then((res) =>
      setRandomId(Math.floor(Math.random() * res.length))
    );
  }, []);

  const plant = randomPlantGenerator(randomId);

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.safe}>
        <StatusBar
          animated={true}
          barStyle="light-content"
          showHideTransition="slide"
          backgroundColor={styles.header.backgroundColor}
        />
        <View style={styles.header}>
          <UserAreaHeader header="Welcome User!" style={styles.header} />
          <Nav navigation={navigation} />
        </View>
      </SafeAreaView>
      <View style={styles.userAreaBody}>
        <Notifications style={styles.notifications} />
        {typeof plant === "string" ? (
          <Text>{plant}</Text>
        ) : (
          <FlatList
            data={plant}
            renderItem={(plantData) => {
              <Pressable
                onPress={toggleIsPressed}
                style={styles.plantsListItem}
              >
                return (
                <View style={styles.plantItemInfo}>
                  <View style={styles.namesContainer}>
                    <Text style={styles.commonName}>
                      {plantData.item.common_name}
                    </Text>
                    <Text style={styles.latinName}>
                      {plantData.item.latin_name}
                    </Text>
                  </View>
                  <Text>{`Climate: ${plantData.item.climate}`}</Text>
                </View>
                <View style={styles.plantItemImage}>
                  <Image
                    source={{ uri: plantData.item.picture_url }}
                    style={{ height: "100%", width: "100%" }}
                  />
                </View>
                );
              </Pressable>;
            }}
            keyExtractor={(item, index) => {
              return item.plant_id;
            }}
          />
        )}
      </View>
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
    flex: 0.6,
    backgroundColor: "#2B8B30",
    color: "#1E2720",
  },
  plantsList: { flex: 1 },
  header: { flex: 1.5, color: "#F1F1F2", paddingTop: StatusBar.currentHeight },
  headerText: { color: "#F1F1F2", fontSize: 40 },
  subHeadingText: { color: "#F1F1F2" },
  plantsListItem: {
    backgroundColor: "#F1F1F2",
    borderRadius: 20,
    flexDirection: "row",
    flex: 1,
    margin: 10,
    padding: 20,
  },
  namesContainer: {
    paddingBottom: 20,
  },
  plantItemImage: {
    flex: 1,
    borderWidth: 1,
  },
  plantItemInfo: {
    flex: 1,
  },
  commonName: {
    fontWeight: "bold",
    fontSize: 20,
  },
  latinName: {
    fontSize: 15,
    fontStyle: "italic",
  },
  header: {
    color: "#1E2720",
    paddingTop: "30%",
    width: "100%",
    flex: 1,
  },
  userAreaBody: {
    flex: 1,
    marginVertical: 20,
    marginHorizontal: 20,
  },
});

export default UserArea;
