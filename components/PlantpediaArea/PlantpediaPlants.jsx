import {
  Text,
  View,
  StyleSheet,
  FlatList,
  Image,
  Pressable,
} from "react-native";
import { useState, useEffect } from "react";
import { getPlants } from "../../api/api.js";

const PlantpediaPlants = ({ handleAddToPlant, plantsData, setPlantsData }) => {
  useEffect(() => {
    getPlants().then((fetchedPlants) => {
      setPlantsData(fetchedPlants);
    });
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        data={plantsData}
        renderItem={(itemData) => {
          return (
            <Pressable
              onPress={() => {
                handleAddToPlant(itemData.item.plant_id);
              }}
              style={styles.plantsListItem}
            >
              <View style={styles.plantItemInfo}>
                <View style={styles.namesContainer}>
                  <Text style={styles.commonName}>
                    {itemData.item.common_name}
                  </Text>
                  <Text style={styles.latinName}>
                    {itemData.item.latin_name}
                  </Text>
                </View>
                <Text>{`Climate: ${itemData.item.climate}`}</Text>
              </View>
              <View style={styles.plantItemImage}>
                <Image
                  source={{ uri: itemData.item.picture_url }}
                  style={{ height: "100%", width: "100%" }}
                />
              </View>
            </Pressable>
          );
        }}
        keyExtractor={(item, index) => {
          return item.plant_id;
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#7F9B91",
    flexDirection: "row",
  },
  plantsListItem: {
    height: 200,
    backgroundColor: "#F1F1F2",
    borderRadius: 20,
    flexDirection: "row",
    flex: 1,
    margin: 10,
    padding: 20,
  },
  namesContainer: {
    flex: 1,
    paddingBottom: 20,
  },
  plantItemImage: {
    height: "100%",
    flex: 1,
    borderWidth: 1,
  },
  plantItemInfo: {
    flex: 1,
  },
  commonName: {
    flex: 2,
    fontWeight: "bold",
    fontSize: 20,
  },
  latinName: {
    flex: 1,
    fontSize: 15,
    fontStyle: "italic",
  },
});

export default PlantpediaPlants;
