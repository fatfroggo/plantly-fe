import { useEffect, useState } from "react";
import { SelectList } from "react-native-dropdown-select-list";
import { StyleSheet, View } from "react-native";

const ClimateSort = ({ selectedClimate, setSelectedClimate }) => {
  const [selected, setSelected] = useState([]);

  const data = [
    { key: "1", value: "Tropical" },
    { key: "2", value: "Subtropical" },
    { key: "3", value: "Arid Tropical" },
    { key: "4", value: "Tropical humid" },
    { key: "5", value: "Subtropical arid" },
  ];
  return (
    <View style={styles.dropdown}>
      <SelectList
        boxStyles={{
          borderRadius: 10,
          borderWidth: 0,
          marginBottom: 0,
          paddingVertical: 6,

          paddingHorizontal: 15,
        }}
        fontFamily="Raleway_400Regular"
        dropdownStyles={{
          borderRadius: 30,
          borderWidth: 0,

          marginTop: 0,
          paddingVertical: 5,
        }}
        setSelected={(val) => setSelected(val)}
        data={data}
        save="value"
        search={false}
        maxHeight={100}
        placeholder="Select Climate"
        onSelect={(val) => {
          for (let i = 0; i < data.length; i++) {
            if (data[i].key === selected.toString()) {
              return setSelectedClimate(data[i].value);
            }
          }
        }}
      />
      <View styles={{ zIndex: 50 }}></View>
      <View styles={{ zIndex: 49 }}></View>
    </View>
  );
};
const styles = StyleSheet.create({
  dropdown: {
    flex: 1,
    backgroundColor: "#f8fdfb",
    borderRadius: 20,

    justifyContent: "center",
  },
});

export default ClimateSort;
