import { Text, View, StyleSheet, StatusBar } from "react-native";

const UserAreaHeader = (props) => {
  return (
    <View style={styles.container}>
      <StatusBar
        animated={true}
        barStyle="light-content"
        showHideTransition="slide"
        backgroundColor={styles.container.backgroundColor}
      />
      <Text style={styles.userAreaHeader}>{props.header}</Text>
      <Text style={styles.subHeader}>{props.subHeader}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 15,
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
