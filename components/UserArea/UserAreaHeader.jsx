import { Text, View, StyleSheet, StatusBar } from "react-native";
import Nav from "../Nav";

const UserAreaHeader = (props) => {
  return (
    <View style={styles.container}>
      <Text style={styles.userAreaHeader}>{props.header}</Text>
      <Text style={styles.subHeader}>{props.subHeader}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 12,
    justifyContent: "flex-end",
    color: "#ecebe7",
    width: "100%",
    flex: 1,
  },
  userAreaHeader: {
    fontSize: 43,
    color: "#ecebe7",
    fontWeight: "300",
  },
  subHeader: {
    fontSize: 20,
    color: "#ecebe7",
  },
});

export default UserAreaHeader;
