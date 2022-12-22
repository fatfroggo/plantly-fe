import { useEffect, useState, useContext } from 'react';
import {
  Text,
  View,
  StyleSheet,
  Pressable,
  Image,
  ScrollView,
  TextInput,
  Dimensions,
  Keyboard,
} from 'react-native';
import UserContext from '../../context/userContext';
import { postUserPlant } from '../../../api/api';

const AddToMyPlantsModal = ({ singlePlantData, cancelButton }) => {
  const { user, setUser } = useContext(UserContext);

  const reqBody = { plant_id: singlePlantData.plant_id, username: user };

  const [keyboardShowing, setKeyboardShowing] = useState('');
  const [modalStyle, setModalStyle] = useState('');

  const postPlant = () => {
    postUserPlant(reqBody);
  };

  Keyboard.addListener('keyboardDidShow', () => {
    setKeyboardShowing('true');
  });

  Keyboard.addListener('keyboardDidHide', () => {
    setKeyboardShowing('false');
  });

  useEffect(() => {
    {
      keyboardShowing
        ? setModalStyle({
            flex: 1,
            marginHorizontal: Dimensions.get('window').width / 10,
            marginVertical: Dimensions.get('window').height / 13.5,
            backgroundColor: 'red',
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
          })
        : setModalStyle({
            flex: 1,
            marginHorizontal: Dimensions.get('window').width / 10,
            marginVertical: Dimensions.get('window').height / 4,
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
          });
    }
  }, [keyboardShowing]);

  return (
    <View style={modalStyle}>
      <View style={styles.plantImage}>
        <Image
          style={{ width: 100, height: 100, borderRadius: 20 }}
          source={{ uri: singlePlantData?.picture_url }}
        />
      </View>

      <View style={styles.plantInfo}>
        <Text style={styles.commonName}>{singlePlantData?.common_name}</Text>
        <Text style={styles.latinName}>{singlePlantData?.latin_name}</Text>
      </View>
      <View style={styles.textInputContainer}>
        <TextInput
          style={styles.textInput}
          placeholder="Plant nickname"
          onChangeText={text => {
            reqBody.nickname = text;
          }}
        />
        <TextInput
          style={styles.textInput}
          placeholder="Days ago last watered"
          onChangeText={text => {
            reqBody.last_watered = text;
          }}
        />
      </View>
      <View style={styles.buttonsContainer}>
        <Pressable style={styles.pressable} onPress={cancelButton}>
          <Text>Cancel</Text>
        </Pressable>
        <Pressable style={styles.pressable} onPress={postPlant}>
          <Text>Submit</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default AddToMyPlantsModal;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#7F9B91',
  },

  plantImage: {
    paddingHorizontal: 20,
    borderRadius: 20,
    marginBottom: 15,
  },
  plantInfo: {},
  commonName: {
    fontWeight: 'bold',
    fontSize: 20,
    textAlign: 'center',
  },
  latinName: {
    fontSize: 15,
    fontStyle: 'italic',
    textAlign: 'center',
    marginBottom: 15,
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
  textInputContainer: { marginBottom: 20, alignSelf: 'stretch' },
  textInput: {
    backgroundColor: '#84A293',
    padding: 5,
    borderRadius: 10,
    marginBottom: 5,
    alignItems: 'stretch',
  },
});
