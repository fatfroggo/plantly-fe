import SearchBar from "./SearchBar";
import { Text, Pressable, StyleSheet, View } from "react-native";
import {
  useFonts,
  Raleway_200ExtraLight,
  Raleway_300Light,
  Raleway_400Regular,
  Raleway_500Medium,
  Raleway_600SemiBold,
  Raleway_700Bold,
} from "@expo-google-fonts/raleway";

const Nav = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.buttons}>
        <Pressable
          style={styles.navPressable}
          onPress={() => {
            navigation.navigate("user area");
          }}
        >
          <Text style={styles.text}>Home</Text>
        </Pressable>

        <Pressable
          style={styles.navPressable}
          onPress={() => {
            navigation.navigate("my-plants");
          }}
        >
          <Text>My Plants</Text>
        </Pressable>

        <Pressable
          style={styles.navPressable}
          onPress={() => {
            navigation.navigate("plantpedia");
          }}
        >
          <Text>Plantpedia</Text>
        </Pressable>

        <Pressable
          style={styles.navPressable}
          onPress={() => {
            navigation.navigate("forum");
          }}
        >
          <Text>Forum</Text>
        </Pressable>
      </View>
      <SearchBar />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    alignitems: "center",
    width: "100%",
    paddingHorizontal: 10,
  },

  buttons: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignContent: "stretch",
    marginVertical: 5,
    height: 35,
    color: "#041b27",
  },
  navPressable: {
    width: "24%",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f8fdfb",
    borderRadius: 50,
  },
  text: {
    fontFamily: "Raleway_400Regular",
  },
});

export default Nav;
