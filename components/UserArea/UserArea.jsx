import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  SafeAreaView,
  FlatList,
  Image,
  Pressable,
  ScrollView,
} from "react-native";
import Nav from "../Nav";
import UserAreaHeader from "./UserAreaHeader";
import Notifications from "./Notifications";
import { useEffect, useState, useContext } from "react";
import { getPlantById, getPlants, getUserPlants } from "../../api/api";

import randomPlantGenerator from "./RandomPlantGenerator";
import UserContext from "../context/userContext";

const UserArea = ({ navigation }) => {
  const [randomId, setRandomId] = useState();
  const [pressed, setPressed] = useState(false);
  const [userPlantsData, setUserPlantsData] = useState([]);
  const { user, setUser } = useContext(UserContext);

  useEffect(() => {
    getUserPlants(user).then((plants) => {
      setUserPlantsData(plants);
    });
  }, []);

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
          backgroundColor={styles.safe.backgroundColor}
        />

        <UserAreaHeader header="Welcome User!" style={styles.safe} />
        <Nav
          navigation={navigation}
          style={styles.safe}
          userPlantsData={{ userPlantsData, setUserPlantsData }}
        />
      </SafeAreaView>

      <View style={styles.userAreaBody}>
        <ScrollView>
          <Notifications
            style={styles.notifications}
            userPlantsData={{ userPlantsData, setUserPlantsData }}
          />
          <View style={styles.featuredPlant}>
            {typeof plant === "string" ? (
              <Text>{plant}</Text>
            ) : (
              <>
                <Text style={styles.featuredPlantHeader}>Featured Plant</Text>
                <Pressable onPress={toggleIsPressed} style={styles.pressable}>
                  <View style={styles.textContainer}>
                    <Text style={styles.commonName}>{plant.common_name}</Text>
                    <Text style={styles.latinName}>{plant.latin_name}</Text>
                    <View style={styles.imageContainer}>
                      <Image
                        source={{ uri: plant.picture_url }}
                        style={{ height: "100%", width: "100%" }}
                      />
                      <Text
                        style={styles.plantInfo}
                      >{`Climate: ${plant.climate}`}</Text>
                    </View>
                  </View>
                </Pressable>
              </>
            )}
          </View>
        </ScrollView>
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
    flex: 0.5,
    backgroundColor: "#2B8B30",
    color: "#1E2720",
  },
  userAreaBody: {
    marginVertical: 10,
    flex: 1,
    marginHorizontal: 15,
  },
  pressable: {
    flex: 1,
    height: "100%",
  },
  featuredPlant: {
    backgroundColor: "#F1F1F2",
    borderRadius: 20,
    height: 600,
    flexDirection: "column",
    marginTop: 10,
    color: "black",
    flex: 1,
    padding: 10,
  },
  featuredPlantHeader: {
    fontSize: 25,
    paddingLeft: 15,
    paddingTop: 10,
  },
  imageContainer: {
    flex: 9,
    width: "100%",
    height: "100%",
  },
  plantInfo: {
    paddingTop: 5,
  },
  textContainer: {
    paddingTop: 20,
    paddingHorizontal: 15,
    flex: 0.9,
  },
  commonName: {
    flex: 0.8,
    fontWeight: "bold",
    fontSize: 22,
  },
  latinName: {
    flex: 0.6,
    fontSize: 16,
    fontStyle: "italic",
  },
});

export default UserArea;
