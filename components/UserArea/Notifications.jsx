import { View, Text, StyleSheet, Image, FlatList } from "react-native";
import { useState, useEffect, useContext } from "react";
import { getUserPlants } from "../../api/api";
import UserPlantsContext from "../context/userPlantsContext";
import UserContext from "../context/userContext";
import Plantpedia from "../PlantpediaArea/Plantpedia";
import { countDown } from "../../utils/utils";

const Notifications = () => {
  const { user, setUser } = useContext(UserContext);
  const { userPlantsData, setUserPlantsData } = useContext(UserPlantsContext);
  // const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  // useEffect(() => {
  //   setTimeout(() => {
  //     setTimeLeft(calculateTimeLeft());
  //   }, 1000);
  // });

  const countDownHandler = (plant) => {
    const days = countDown(
      plant.time_between_watering,
      plant.last_watered_date
    );
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
            <View style={styles.plant}>
              <Image
                style={{ height: 80, width: 80, borderRadius: 30 }}
                source={{ uri: item.picture_url }}
              />
              {console.log(item, "plant")}
              <Text style={styles.text}>{item.nickname}</Text>
              <Text style={styles.text}> 1 day until water</Text>
            </View>
          )}
          keyExtractor={(item) => item.plant_id}
          horizontal={true}
        />
      </View>
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
    // textAlign: "center",
    alignItems: "center",
    padding: 10,
    borderColor: "red",
    borderWidth: 3,
  },
});
export default Notifications;
