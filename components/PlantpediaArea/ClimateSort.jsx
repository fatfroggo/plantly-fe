import { useEffect, useState } from "react";
import { SelectList } from "react-native-dropdown-select-list";

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

export default ClimateSort;
