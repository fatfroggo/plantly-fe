import { useEffect, useState } from 'react';
import {
  Text,
  View,
  StyleSheet,
  StatusBar,
  Modal,
  Pressable,
  Image,
} from 'react-native';
import Nav from '../Nav';
import PlantPediaPlants from './PlantpediaPlants';

const Plantpedia = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [pressed, setPressed] = useState(false);

  const togglePressed = () => {
    setPressed(currValue => {
      return !currValue;
    });
  };

  useEffect(() => {
    pressed ? setModalVisible(true) : setModalVisible(false);
  }, [pressed]);
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Plantpedia</Text>
        <Text style={styles.subHeadingText}>The encyclopedia of plants</Text>
      </View>
      <Nav />
      <PlantPediaPlants setModalVisible={setModalVisible} />
      <Modal visible={modalVisible} animationType="slide" transparent={true}>
        <View style={styles.modalView}>
          <View style={styles.plantImage}>
            <Image
              style={{ height: 100, width: 100, borderRadius: 20 }}
              source={require('../../assets/test.png')}
            />
          </View>

          <View style={styles.plantInfo}>
            <Text style={styles.commonName}>Common name</Text>
            <Text style={styles.latinName}>Scientific name</Text>
            <Text>Plant info here</Text>

            <View style={styles.buttonsContainer}>
              <Pressable style={styles.pressable}>
                <Text>Add to my plants</Text>
              </Pressable>
              <Pressable style={styles.pressable} onPress={togglePressed}>
                <Text>Cancel</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#7F9B91',
    alignItems: 'center',
  },
  header: {
    flex: 1.5,
    color: '#F1F1F2',
    paddingTop: StatusBar.currentHeight,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  headerText: { color: '#F1F1F2', fontSize: 40 },
  subHeadingText: { color: '#F1F1F2', marginBottom: 20 },
  plantsList: { flex: 8 },
  modalView: {
    flex: 1,
    margin: 30,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 10,
    alignItems: 'center',
    shadowColor: '#000',
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
    padding: 20,
    borderRadius: 20,
  },
  plantInfo: {
    flex: 1,
    alignItems: 'center',
  },
  commonName: {
    fontWeight: 'bold',
    fontSize: 20,
  },
  latinName: {
    fontSize: 15,
    fontStyle: 'italic',
  },
  buttonsContainer: {
    flexDirection: 'row',
  },
  pressable: {
    backgroundColor: '#7F9B91',
    marginHorizontal: 10,
    padding: 10,
    borderRadius: 5,
  },
});

export default Plantpedia;
