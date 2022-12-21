import { Text, View, StyleSheet, StatusBar } from "react-native";
import Nav from "../Nav";

const UserAreaHeader = (props) => {
  return (
    <View style={styles.container}>
      <Text style={styles.userAreaHeader}>{props.header}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    fontSize: 40,
    paddingLeft: 10,
    color: "#ecebe7",
    width: "100%",
    paddingBottom: 10,
    color: "#1E2720",
    paddingTop: "30%",
    width: "100%",
    flex: 1,
  },
  userAreaHeader: { fontSize: 40, color: "#ecebe7" },
});

export default UserAreaHeader;
