import { useEffect, useState } from 'react';
import { SelectList } from 'react-native-dropdown-select-list';
import { StyleSheet, View } from 'react-native';

const ClimateSort = ({ selectedClimate, setSelectedClimate }) => {
  const [selected, setSelected] = useState([]);

  const data = [
    { key: '1', value: 'Tropical' },
    { key: '2', value: 'Subtropical' },
    { key: '3', value: 'Arid Tropical' },
    { key: '4', value: 'Tropical humid' },
    { key: '5', value: 'Subtropical arid' },
  ];
  return (
    <View style={styles.dropdown}>
      <SelectList
        setSelected={val => setSelected(val)}
        data={data}
        sale="value"
        search={false}
        placeholder="Select Climate"
        onSelect={val => {
          for (let i = 0; i < data.length; i++) {
            if (data[i].key === selected.toString()) {
              return setSelectedClimate(data[i].value);
            }
          }
        }}
      />
    </View>
  );
};
const styles = StyleSheet.create({ dropdown: { flex: 1 } });

export default ClimateSort;
