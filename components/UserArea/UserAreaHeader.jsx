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
  userAreaHeader: {
    fontSize: 40,
    paddingLeft: 10,
    color: "#ecebe7",
    width: "100%",
    paddingBottom: 10,
  },
});

export default UserAreaHeader;
