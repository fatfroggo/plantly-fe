import { StyleSheet, Text, View, StatusBar, SafeAreaView } from "react-native";
import Nav from "../Nav";
import UserAreaHeader from "./UserAreaHeader";
import Notifications from "./Notifications";

const UserArea = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.safe}>
        <StatusBar
          animated={true}
          barStyle="light-content"
          showHideTransition="slide"
        />
        <View style={styles.header}>
          <UserAreaHeader header="Welcome User!" style={styles.header} />
          <Nav navigation={navigation} />
        </View>
      </SafeAreaView>
      <View style={styles.userAreaBody}>
        <Notifications />
        <View style={styles.featuredPlant}>
          <Text style={styles.title}>Featured Plant</Text>
          <View></View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    backgroundColor: "#D9D9D9",
  },
  safe: {
    width: "100%",
    backgroundColor: "#2B8B30",
    color: "#1E2720",
  },
  header: {
    color: "#1E2720",
    paddingTop: "30%",
    width: "100%",
  },
  userAreaBody: {
    marginVertical: 20,
    height: "100%",
    marginHorizontal: "10%",
  },
  featuredPlant: {
    backgroundColor: "#ECEBE7",
    height: "100%",
    borderRadius: 30,
    marginVertical: 20,
  },
  title: {
    fontSize: 30,
    padding: 20,
  },
});

export default UserArea;
