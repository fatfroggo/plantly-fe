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
      <SelectList
        setSelected={(val) => setSelected(val)}
        data={data}
        fontFamily="Raleway_400Regular"
        maxHeight='100'
        boxStyles={{
          borderRadius: 10,
          borderWidth: 0,
          marginBottom: 0,
          paddingTop: 5,
          paddingVertical: 6,
          paddingLeft: 15,
          paddingHorizontal: 10,
          width: 250
        }}
        dropdownStyles={{
          borderRadius: 30,
          borderWidth: 0,

          marginTop: 0,
          paddingVertical: 5,
        }}
        sale="value"
        search={false}
        placeholder="Select Climate"
        onSelect={(val) => {
          for (let i = 0; i < data.length; i++) {
            if (data[i].key === selected.toString()) {
              return setSelectedClimate(data[i].value);
            }
          }
        }}
      />
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
