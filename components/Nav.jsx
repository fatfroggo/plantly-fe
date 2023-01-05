import { Text, Pressable, StyleSheet, View } from "react-native";
import { useState, useContext } from "react";
import {
  useFonts,
  Raleway_200ExtraLight,
  Raleway_300Light,
  Raleway_400Regular,
  Raleway_500Medium,
  Raleway_600SemiBold,
  Raleway_700Bold,
} from "@expo-google-fonts/raleway";
import NavContext from "./context/NavContext";

const Nav = ({ navigation }) => {
  const { page, setPage } = useContext(NavContext);

  return (
    <View style={styles.container}>
      <View style={styles.buttons}>
        <Pressable
          style={
            page === "Home" ? styles.selectedButton : styles.deselectedButton
          }
          onPress={() => {
            setPage("Home");
            navigation.navigate("user area");
          }}
        >
          <Text
            style={
              page === "Home" ? styles.selectedText : styles.deselectedText
            }
          >
            Home
          </Text>
        </Pressable>

        <Pressable
          style={
            page === "My Plants"
              ? styles.selectedButton
              : styles.deselectedButton
          }
          onPress={() => {
            setPage("My Plants");
            navigation.navigate("my-plants");
          }}
        >
          <Text
            style={
              page === "My Plants" ? styles.selectedText : styles.deselectedText
            }
          >
            My Plants
          </Text>
        </Pressable>

        <Pressable
          style={
            page === "Plantpedia"
              ? styles.selectedButton
              : styles.deselectedButton
          }
          onPress={() => {
            setPage("Plantpedia");
            navigation.navigate("plantpedia");
          }}
        >
          <Text
            style={
              page === "Plantpedia"
                ? styles.selectedText
                : styles.deselectedText
            }
          >
            Plantpedia
          </Text>
        </Pressable>

        <Pressable
          style={
            page === "forum" ? styles.selectedButton : styles.deselectedButton
          }
          onPress={() => {
            setPage("forum");
            navigation.navigate("forum");
          }}
        >
          <Text
            style={
              page === "forum" ? styles.selectedText : styles.deselectedText
            }
          >
            Forum
          </Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},

  selectedButton: {
    backgroundColor: "#729d84",
    width: "25%",
    alignItems: "center",
    justifyContent: "center",
    color: "#f8fdfb",
    paddingBottom: 4,
    paddingTop: 2,
    color: "#f8fdfb",
    borderBottomColor: "#729d84",
    borderBottomWidth: 0.5,
  },
  deselectedButton: {
    backgroundColor: "#f8fdfb",
    width: "25%",
    alignItems: "center",
    justifyContent: "center",
    paddingBottom: 4,
    paddingTop: 2,
    borderBottomColor: "#d9d9d9",
    borderBottomWidth: 0.5,
  },

  selectedText: {
    color: "#f8fdfb",
    fontFamily: "Raleway_300Light",
    fontSize: 14,
  },
  deselectedText: {
    color: "#041b27",
    fontFamily: "Raleway_300Light",
    fontSize: 14,
  },
  buttons: {
    flexDirection: "row",
    alignitems: "center",
    justifyContent: "center",
    width: "100%",

    flexDirection: "row",

    width: "100%",
    justifyContent: "center",
    height: 40,
    color: "#041b27",
  },
});

export default Nav;
