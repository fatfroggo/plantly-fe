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
import { getUserPlants } from "../../api/api";

const UserPlants = ({ navigation }) => {
  const [pressed, setPressed] = useState(false);
  const [userPlantsData, setUserPlantsData] = useState([
    {
      plant_id: 1,
      common_name: "Janet Craig",
      latin_name: "Dracaena deremensis 'Janet Craig'",
      category: "Dracaena",
      climate: "Tropical",
      origin: "Cultivar",
      pruning: "If needed",
      watering_advice: "Keep moist between watering & Can dry between watering",
      light_preference: "Strong light",
      picture_url: "http://www.tropicopia.com/house-plant/thumbnails/5556.jpg",
      temp_max: 30,
      temp_min: 10,
    },
    {
      plant_id: 2,
      common_name: "Lady palm",
      latin_name: "Rhapis excelsa",
      category: "Palm",
      climate: "Subtropical",
      origin: "China",
      pruning: "Never",
      watering_advice:
        "Keep moist between watering & Must not dry between watering",
      light_preference: "Strong light",
      picture_url: "http://www.tropicopia.com/house-plant/thumbnails/5725.jpg",
      temp_max: 30,
      temp_min: 8,
    },
    {
      plant_id: 3,
      common_name: "Tailflower,Wax flower",
      latin_name: "Anthurium X",
      category: "Anthurium",
      climate: "Tropical",
      origin: "Cultivar",
      pruning: "Never",
      watering_advice: "Water when soil is half dry & Can dry between watering",
      light_preference: "Strong light",
      picture_url: "http://www.tropicopia.com/house-plant/thumbnails/5491.jpg",
      temp_max: 22,
      temp_min: 18,
    },
    {
      plant_id: 4,
      common_name: "Elephant ear",
      latin_name: "Alocasia X amazonica",
      category: "Other",
      climate: "Tropical humid",
      origin: "Hybrid",
      pruning: "Never",
      watering_advice:
        "Keep moist between watering & Water when soil is half dry",
      light_preference: "Strong light",
      picture_url: "http://www.tropicopia.com/house-plant/thumbnails/5486.jpg",
      temp_max: 28,
      temp_min: 15,
    },
    {
      plant_id: 5,
      common_name: "Malaysian Dracaena",
      latin_name: "Dracaena reflexa 'Song of Jamaica'",
      category: "Dracaena",
      climate: "Tropical",
      origin: "Cultivar",
      pruning: "If needed",
      watering_advice:
        "Keep moist between watering & Water when soil is half dry",
      light_preference: "Strong light",
      picture_url: "http://www.tropicopia.com/house-plant/thumbnails/5586.jpg",
      temp_max: 30,
      temp_min: 12,
    },
    {
      plant_id: 6,
      common_name: "Chinese Evergreen",
      latin_name: "Aglaonema 'Jubilee'",
      category: "Aglaonema",
      climate: "Tropical",
      origin: "Hybrid",
      pruning: "If needed",
      watering_advice:
        "Keep moist between watering & Water when soil is half dry",
      light_preference: "Strong light",
      picture_url: "http://www.tropicopia.com/house-plant/thumbnails/5466.jpg",
      temp_max: 28,
      temp_min: 18,
    },
    {
      plant_id: 7,
      common_name: "Malaysian Dracaena",
      latin_name: "Dracaena reflexa 'Song of Jamaica'",
      category: "Dracaena",
      climate: "Tropical",
      origin: "Cultivar",
      pruning: "If needed",
      watering_advice:
        "Keep moist between watering & Water when soil is half dry",
      light_preference: "Strong light",
      picture_url: "http://www.tropicopia.com/house-plant/thumbnails/5585.jpg",
      temp_max: 30,
      temp_min: 12,
    },
    {
      plant_id: 8,
      common_name: "Herringbone,Pink praying plant",
      latin_name: "Maranta leuconeura erythroneura",
      category: "Hanging",
      climate: "Tropical",
      origin: "Brazil",
      pruning: "If needed",
      watering_advice:
        "Keep moist between watering & Water when soil is half dry",
      light_preference: "Strong light",
      picture_url: "http://www.tropicopia.com/house-plant/thumbnails/5657.jpg",
      temp_max: 28,
      temp_min: 12,
    },
    {
      plant_id: 9,
      common_name: "Guzmania",
      latin_name: "Guzmenia 'Marjan'",
      category: "Bromeliad",
      climate: "Tropical",
      origin: "Cultivar",
      pruning: "Never",
      watering_advice:
        "Water when soil is half dry & Change water regularly in the cup",
      light_preference: "Strong light",
      picture_url: "http://www.tropicopia.com/house-plant/thumbnails/5632.jpg",
      temp_max: 30,
      temp_min: 10,
    },
    {
      plant_id: 10,
      common_name: "Chinese Evergreen",
      latin_name: "Aglaonema 'Silver Queen'",
      category: "Aglaonema",
      climate: "Tropical",
      origin: "Hybrid",
      pruning: "If needed",
      watering_advice:
        "Keep moist between watering & Water when soil is half dry",
      light_preference: "Strong light",
      picture_url: "http://www.tropicopia.com/house-plant/thumbnails/5480.jpg",
      temp_max: 28,
      temp_min: 18,
    },
  ]);

  // useEffect(() => {
  //   getUserPlants().then(plants => {
  //     setUserPlantsData(plants);
  //   });
  // }, []);

  const toggleIsPressed = () => {
    setPressed(true);
  };

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
          <UserAreaHeader header="My Plants" style={styles.header} />
          <Nav navigation={navigation} />
        </View>
      </SafeAreaView>

      <View style={styles.userAreaBody}>
        <View style={styles.filterAndSortByContainer}>
          <Pressable style={styles.button}>
            <Text>Filter</Text>
          </Pressable>
          <Pressable style={styles.button}>
            <Text>Sort by</Text>
          </Pressable>
        </View>

        <FlatList
          numColumns={2}
          data={userPlantsData}
          renderItem={(itemData) => {
            return (
              <Pressable style={styles.plantsListItem}>
                <View style={styles.plantItemImage}>
                  <Image
                    source={{ uri: itemData.item.picture_url }}
                    style={{ height: 50, width: 50, borderRadius: 100 }}
                  />
                </View>

                <View style={styles.plantItemInfo}>
                  <Text>Nickname</Text>
                  <Text style={styles.info}>{itemData.item.common_name}</Text>
                  <Text style={styles.info}>Age</Text>
                  <Text style={styles.info}>Watering status</Text>
                </View>
              </Pressable>
            );
          }}
          keyExtractor={(item, index) => {
            return item.plant_id;
          }}
        />
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
    flex: 1,
    padding: 5,
  },

  filterAndSortByContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: 15,
  },

  button: {
    backgroundColor: "#F1F1F2",
    flex: 1,
    alignItems: "center",
    paddingVertical: 6,
    marginHorizontal: 10,
    borderRadius: 20,
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
    margin: 5,
    alignItems: "center",
    paddingVertical: 10,
    paddingRight: 5,
  },

  plantItemImage: { alignItems: "center", paddingHorizontal: 10 },

  plantItemInfo: {
    flex: 1,
  },
  info: {
    fontSize: 12,
  },
});

export default UserPlants;
