import { View, Text, StyleSheet } from "react-native";

const Notifications = () => {
  const notifications = [
    "1 day to water",
    "2 days to water",
    "3 days to water",
  ];
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Notifications</Text>
      <View style={styles.notifications}>
        {notifications.map((notification) => {
          return (
            <View style={styles.plant}>
              <Text key={notification + "n"}>{notification}</Text>
            </View>
          );
        })}
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
