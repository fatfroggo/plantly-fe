import { SafeAreaView } from "react-native-safe-area-context";
import SearchBar from "./SearchBar";
import { Text, Pressable, StyleSheet, View } from "react-native";

import { useState } from "react";

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
            navigation.navigate("plantpedia");
          }}
        >
          <Text>Plantpedia</Text>
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
    marginVertical: 20,
    paddingHorizontal: 10,
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

export default Nav;
