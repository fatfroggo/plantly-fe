import { View, Text, StyleSheet } from "react-native";
import { useState, useEffect, useContext } from "react";
import { getUserPlants } from "../../api/api";
import UserContext from "../context/userContext";

const Notifications = ({ userPlantsData, setUserPlantsData }) => {
  const { user, setUser } = useContext(UserContext);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Notifications</Text>
      <View style={styles.notifications}>
        {/* {notifications.map((notification) => {
          return (
            <View key={notification} style={styles.plant}>
              <Text>{notification}</Text>
            </View>
          );
        })} */}
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
    backgroundColor: "#ECEBE7",
  },
  title: {
    fontSize: 25,
    paddingLeft: 5,
    paddingBottom: 20,
  },
  notifications: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    backgroundColor: "#ECEBE7",
  },
  plant: {
    width: "30%",
    height: "100%",
    padding: 20,
    borderColor: "red",
    borderWidth: 3,
  },
});
export default Notifications;
