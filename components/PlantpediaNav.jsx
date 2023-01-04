import PlantpediaSearchBar from "./PlantpediaSearchBar";
import { Text, Pressable, StyleSheet, View } from "react-native";

const PlantpediaNav = ({
  navigation,
  route,
  setPlantpediaSearch,
  setSearchText,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.buttons}>
        <Pressable
          style={styles.navPressable}
          onPress={() => {
            navigation.navigate("user area");
          }}
        >
          <Text>Home</Text>
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
            navigation.navigate("forum");
          }}
        >
          <Text>Forum</Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    alignitems: "center",
    width: "100%",
    paddingHorizontal: 15,
  },

  buttons: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignContent: "stretch",
    marginVertical: 5,
    height: 35,
    color: "#1E2720",
  },
  navPressable: {
    width: "30%",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#ECEBE7",
    borderRadius: 50,
  },
});

export default PlantpediaNav;
