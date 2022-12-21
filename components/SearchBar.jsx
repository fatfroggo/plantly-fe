import { View, TextInput, StyleSheet, Pressable, Text } from "react-native";
import { useState, useEffect } from "react";
import { EvilIcons } from "@expo/vector-icons";
import { getPlants, getPlantsByQuery } from "../api/api";

const SearchBar = () => {
  const [search, setSearch] = useState("");
  const [text, setText] = useState("");
  const [plants, setPlants] = useState([]);

  useEffect(() => {
    getPlantsByQuery(search)
      .then((res) => {
        setPlants(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [search]);

  return (
    <View style={styles.container}>
      <View style={styles.search}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search"
          onChangeText={setSearch}
        />
        <EvilIcons name="search" size={24} color="#1E2720" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },

  search: {
    flexDirection: "row",
    color: "#27242A",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    height: 35,
    paddingHorizontal: 15,
    marginBottom: 10,
    paddingVertical: 5,
    borderRadius: 40,
    backgroundColor: "#ECEBE7",
  },
  searchInput: {
    width: "90%",
    height: "100%",
  },
});
export default SearchBar;
