import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  SafeAreaView,
  Image,
  Pressable,
  ScrollView,
} from "react-native";
import Nav from "../Nav";
import UserAreaHeader from "./UserAreaHeader";
import Notifications from "./Notifications";
import { useEffect, useState, useContext } from "react";
import { getPlants, getUserPlants } from "../../api/api";

import UserContext from "../context/userContext";
import UserPlantsContext from "../context/userPlantsContext";
import {
  useFonts,
  Raleway_200ExtraLight,
  Raleway_300Light_Italic,
  Raleway_300Light,
  Raleway_400Regular,
  Raleway_500Medium,
  Raleway_600SemiBold,
  Raleway_700Bold,
} from "@expo-google-fonts/raleway";
import PlantpediaSearchBar from "../PlantpediaSearchBar";

const UserArea = ({ navigation }) => {
  const [pressed, setPressed] = useState(false);
  const [modalLoading, setModalLoading] = useState(true);
  const [featuredPlant, setFeaturedPlant] = useState({});
  const [loading, setLoading] = useState(true);
  const { userPlantsData, setUserPlantsData } = useContext(UserPlantsContext);
  const { user, setUser } = useContext(UserContext);

  useEffect(() => {
    getUserPlants(user).then((plants) => {
      setUserPlantsData(plants);
    });
    getPlants().then((res) => {
      const randomId = Math.floor(Math.random() * res.length);
      const randomPlant = res.filter(
        (plant) => plant.plant_id === randomId && plant.common_name !== "N/A"
      );
      setFeaturedPlant(randomPlant[0]);
      setLoading(false);
    });
  }, []);

  const toggleIsPressed = () => {
    setPressed(true);
  };

  return loading ? (
    <View
      style={{ flex: 1, justifyContent: "center", backgroundColor: "#729d84" }}
    >
      <Image
        source={require("../../assets/loadingLight.gif")}
        style={{
          alignSelf: "center",
          width: 200,
          height: 200,
        }}
      />
    </View>
  ) : (
    <View style={styles.container}>
      <SafeAreaView style={styles.safe}>
        <StatusBar
          animated={true}
          barStyle="light-content"
          showHideTransition="slide"
          backgroundColor={styles.safe.backgroundColor}
        />

        <UserAreaHeader header={`Welcome, ${user}!`} style={styles.header} />
        <Nav
          navigation={navigation}
          style={styles.safe}
          userPlantsData={{ userPlantsData, setUserPlantsData }}
        />
      </SafeAreaView>

      <View style={styles.userAreaBody}>
        <ScrollView>
          <Notifications
            modalLoading={modalLoading}
            setModalLoading={setModalLoading}
          />
          <Text style={styles.featuredPlantHeader}>Featured Plant</Text>
          <View style={styles.featuredPlant}>
            <Pressable onPress={toggleIsPressed} style={styles.pressable}>
              <View style={styles.textContainer}>
                <Text style={styles.commonName}>
                  {featuredPlant?.common_name}
                </Text>
                <Text style={styles.latinName}>
                  {featuredPlant?.latin_name}
                </Text>
                <View style={styles?.imageContainer}>
                  <Image
                    source={{ uri: featuredPlant?.picture_url }}
                    style={{ height: 240, width: 240 }}
                  />
                  <Text
                    style={styles.plantInfo}
                  >{`Climate: ${featuredPlant?.climate}`}</Text>
                </View>
              </View>
            </Pressable>
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#d9d9d9",
    flex: 1,
    fontFamily: "Raleway_400Regular",
  },

  safe: {
    width: "100%",
    flex: 1,
    backgroundColor: "#729d84",
    color: "#f8fdfb",
  },
  userAreaBody: {
    flex: 2,
    marginHorizontal: 15,
  },
  pressable: {
    flex: 1,
    height: "100%",
  },
  featuredPlant: {
    backgroundColor: "#f8fdfb",
    borderRadius: 20,
    paddingBottom: 20,
    flexDirection: "column",
    marginVertical: 10,
    color: "#041b27",
    flex: 1,
    padding: 10,
  },
  featuredPlantHeader: {
    color: "#041b27",
    fontFamily: "Raleway_400Regular",
    textAlign: "left",
    fontSize: 22,
    paddingLeft: 15,
    paddingTop: 10,
  },
  imageContainer: {
    flex: 9,
    width: "100%",
    height: "100%",
    alignItems: "center",
  },
  plantInfo: {
    color: "#041b27",
    fontFamily: "Raleway_400Regular",
    paddingTop: 5,
    textAlign: "center",
  },
  textContainer: {
    paddingTop: 20,
    paddingHorizontal: 15,
    flex: 0.9,
  },
  commonName: {
    fontFamily: "Raleway_600SemiBold",
    color: "#041b27",
    textAlign: "center",
    flex: 0.8,
    fontSize: 22,
  },
  latinName: {
    fontFamily: "Raleway_300Light_Italic",
    color: "#041b27",
    textAlign: "center",
    flex: 0.6,
    paddingBottom: 12,
    fontSize: 14,
  },
});

export default UserArea;
