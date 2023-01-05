import { Text, View, StyleSheet, StatusBar } from "react-native";
import {
  useFonts,
  Raleway_200ExtraLight,
  Raleway_300Light,
  Raleway_400Regular,
  Raleway_500Medium,
  Raleway_600SemiBold,
  Raleway_700Bold,
} from "@expo-google-fonts/raleway";

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
    fontFamily: "Raleway_400Regular",
    fontSize: 44,
    color: "#f8fdfb",
    fontWeight: "300",
  },
  subHeader: {
    fontFamily: "Raleway_300Light_Italic",
    fontSize: 20,
    color: "#f8fdfb",
    paddingBottom: 10,
  },
});

export default UserAreaHeader;
