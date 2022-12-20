import { View, Text, StyleSheet } from "react-native";

const Notifications = () => {
  const notifications = [
    "1 day to water",
    "2 days to water",
    "3 days to water",
  ];
  return (
    <View style={styles.container}>
      <Text>Notifications</Text>
      <View style={styles.notifications}>
        {notifications.map((notification) => {
          return (
            <View style={styles.plant}>
              <Text>{notification}</Text>
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
    borderRadius: 30,

    backgroundColor: "#ECEBE7",
    padding: 30,
  },
  notifications: {
    flexDirection: "row",
    borderColor: "red",
    borderWidth: 3,
    justifyContent: "space-evenly",
    backgroundColor: "#ECEBE7",
  },
  notification: {
    width: "30%",
    height: "100%",
  },
});
export default Notifications;
