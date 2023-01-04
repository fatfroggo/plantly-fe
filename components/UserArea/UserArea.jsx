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
  Raleway_300Light,
  Raleway_400Regular,
  Raleway_500Medium,
  Raleway_600SemiBold,
  Raleway_700Bold,
} from "@expo-google-fonts/raleway";

const UserArea = ({ navigation }) => {
  const [pressed, setPressed] = useState(false);
  const [featuredPlant, setFeaturedPlant] = useState({});
  const [loading, setLoading] = useState(true);
  const [notificationsLoading, setNotificationsLoading] = useState(true);
  const { userPlantsData, setUserPlantsData } = useContext(UserPlantsContext);
  const { user, setUser } = useContext(UserContext);
  let [fontsLoaded] = useFonts({
    Raleway_200ExtraLight,
    Raleway_300Light,
    Raleway_400Regular,
    Raleway_500Medium,
    Raleway_600SemiBold,
    Raleway_700Bold,
  });

  useEffect(() => {
    getUserPlants(user).then((plants) => {
      setUserPlantsData(plants);
    });
    getPlants().then((res) => {
      const randomId = Math.floor(Math.random() * res.length);
      const randomPlant = res.filter((plant) => plant.plant_id === randomId);
      setFeaturedPlant(randomPlant[0]);

      setLoading(false);
    });
  }, []);

  const toggleIsPressed = () => {
    setPressed(true);
  };

  return loading ? (
    <View
      style={{
        flex: 1,
        flexDirection: "row",
      }}
    >
      <Image
        source={require("../../assets/loading.gif")}
        style={{ flex: 1, alignSelf: "center", width: 50 }}
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

        <UserAreaHeader header={`Welcome ${user}!`} style={styles.safe} />
        <Nav
          navigation={navigation}
          style={styles.safe}
          userPlantsData={{ userPlantsData, setUserPlantsData }}
        />
      </SafeAreaView>

      <View style={styles.userAreaBody}>
        <ScrollView>
          <Notifications />
          <View style={styles.featuredPlant}>
            <Text style={styles.featuredPlantHeader}>Featured Plant</Text>

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
                    style={{ height: 200, width: 200 }}
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
    backgroundColor: "#D9D9D9",
    flex: 5,
    fontFamily: "Raleway_400Regular",
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
    alignItems: "center",
    backgroundColor: "#F1F1F2",
    borderRadius: 20,
    paddingBottom: 20,
    flexDirection: "column",
    marginTop: 10,
    color: "black",
    flex: 1,

    padding: 10,
  },
  featuredPlantHeader: {
    fontFamily: "Raleway_600SemiBold",
    fontSize: 25,
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
    paddingTop: 5,
    textAlign: "center",
  },
  textContainer: {
    paddingTop: 20,
    paddingHorizontal: 15,
    flex: 0.9,
  },
  commonName: {
    textAlign: "center",
    flex: 0.8,
    fontWeight: "bold",
    fontSize: 22,
  },
  latinName: {
    textAlign: "center",
    flex: 0.6,
    fontSize: 16,
    fontStyle: "italic",
  },
});

export default UserArea;
