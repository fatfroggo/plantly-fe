import { useEffect, useState } from 'react';
import {
  Text,
  View,
  StyleSheet,
  Pressable,
  Image,
  ScrollView,
  TextInput,
} from 'react-native';

const AddToMyPlantsModal = ({ username, plant_id }) => {
  const [lastWatered, setLastWatered] = useState('');
  const [nickname, setNickname] = useState('');
  const reqBody = { username, plant_id };

  return (
    <View style={styles.modalView}>
      <TextInput placeholder="How many days ago was this plant last watered?" />
      <TextInput placeholder="Plant nickname" />
    </View>
  );
};

export default AddToMyPlantsModal;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#7F9B91',
  },
  safe: {
    justifyContent: 'flex-end',
    flex: 0.5,
    color: '#1E2720',
  },
  modalView: {
    flex: 1,
    margin: 30,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 30,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },

  plantImage: {
    paddingHorizontal: 20,
    borderRadius: 20,
    flex: 1,
  },
  plantInfo: {
    flex: 2,
  },
  commonName: {
    fontWeight: 'bold',
    fontSize: 30,
  },
  latinName: {
    fontSize: 20,
    fontStyle: 'italic',
  },
  infoText: {
    fontSize: 15,
    paddingVertical: 5,
  },
  buttonsContainer: {
    borderWidth: 1,
    flexDirection: 'row',
  },
  pressable: {
    backgroundColor: '#7F9B91',
    marginHorizontal: 10,
    padding: 10,
    borderRadius: 5,
  },
});
