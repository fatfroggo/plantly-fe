import { View, TextInput, StyleSheet, Pressable, Text } from "react-native";
import { useState, useEffect } from "react";
import { EvilIcons } from "@expo/vector-icons";
import { TabRouter } from "@react-navigation/native";

const PlantpediaSearchBar = ({ setSearchText }) => {
  const [plantpediaSearchText, setPlantpediaSearchText] = useState("");

  const handleSearch = () => {
    if (plantpediaSearchText.length === 0) {
      setSearchText(undefined);
    } else {
      setSearchText(plantpediaSearchText);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.search}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search our plant database"
          onChangeText={setPlantpediaSearchText}
          onSubmitEditing={handleSearch}
        />
        <Pressable onPress={handleSearch}>
          <EvilIcons name="search" size={32} color="#1E2720" />
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    justifyContent: "center",
    backgroundColor: "#d9d9d9",
    alignItems: "center",
    paddingVertical: 10,
  },

  search: {
    flexDirection: "row",
    color: "#041b27",
    alignItems: "center",
    justifyContent: "space-between",
    width: "90%",
    height: 35,
    paddingHorizontal: 13,
    borderRadius: 40,
    backgroundColor: "#f8fdfb",
  },
  searchInput: {
    marginHorizontal: 2,
    fontFamily: "Raleway_400Regular",
    width: "90%",
    height: "100%",
  },
});
export default PlantpediaSearchBar;
