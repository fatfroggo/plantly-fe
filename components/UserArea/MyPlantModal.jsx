import {
  Text,
  View,
  StyleSheet,
  Pressable,
  Image,
  ScrollView,
  Dimensions,
} from 'react-native';

const MyPlantModal = ({ singlePlantData, handleClose, modalLoading }) => {
  return modalLoading ? (
    <View style={styles.modalLoading}>
      <View
        style={{
          alignSelf: 'center',
        }}
      >
        <Image
          source={require('../../assets/loading.gif')}
          style={{ height: 200, width: 200 }}
        />
      </View>
    </View>
  ) : (
    <View style={styles.modalView}>
      <View style={styles.plantImage}>
        <Image
          style={{ height: 200, width: 200, borderRadius: 20 }}
          source={{ uri: singlePlantData?.picture_url }}
        />
      </View>
      <Text style={styles.commonName}>{singlePlantData?.common_name}</Text>
      <Text style={styles.latinName}>{singlePlantData?.latin_name}</Text>
      <ScrollView
        persistentScrollbar={true}
        contentContainerStyle={styles.plantInfo}
      >
        <Text style={styles.subHeading}>Climate</Text>
        <Text style={styles.infoText}>{singlePlantData?.climate}</Text>

        <Text style={styles.subHeading}>Origin</Text>
        <Text style={styles.infoText}>{singlePlantData?.origin}</Text>

        <Text style={styles.subHeading}>Pruning</Text>
        <Text style={styles.infoText}>{singlePlantData?.pruning}</Text>

        <Text style={styles.subHeading}>Watering</Text>
        <Text style={styles.infoText}>{singlePlantData?.watering_advice}</Text>

        <Text style={styles.subHeading}>Light</Text>
        <Text style={styles.infoText}>{singlePlantData?.light_preference}</Text>

        <Text style={styles.subHeading}>Max temperature</Text>
        <Text style={styles.infoText}>{singlePlantData?.temp_max}</Text>

        <Text style={styles.subHeading}>Min temperature</Text>
        <Text style={styles.infoText}>{singlePlantData?.temp_min}</Text>
      </ScrollView>
      <View style={styles.buttonsContainer}>
        <Pressable style={styles.pressable}>
          <Text style={styles.pressableText} onPress={handleClose}>
            Close
          </Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#7F9B91',
  },
  safe: {
    justifyContent: 'center',
    flex: 0.5,
    color: '#1E2720',
  },
  modalView: {
    flex: 1,
    marginHorizontal: Dimensions.get('window').width / 10,
    marginVertical: Dimensions.get('window').height / 15,
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
  },
  plantInfo: { paddingRight: 10 },
  commonName: {
    fontWeight: 'bold',
    fontSize: 30,
    textAlign: 'center',
    marginTop: 10,
  },
  latinName: {
    fontSize: 18,
    fontStyle: 'italic',
    textAlign: 'center',
    marginBottom: 10,
  },
  subHeading: {
    fontSize: 17,
    fontWeight: 'bold',
  },
  infoText: {
    fontSize: 17,
    marginBottom: 15,
  },
  buttonsContainer: {
    flexDirection: 'row',
    marginTop: 20,
  },
  pressable: {
    backgroundColor: '#7F9B91',
    width: '40%',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 8,
    padding: 10,
    borderRadius: 20,
  },
  pressableText: { textAlign: 'center' },

  modalLoading: {
    flex: 1,
    justifyContent: 'center',
    marginHorizontal: Dimensions.get('window').width / 10,
    marginVertical: Dimensions.get('window').height / 15,
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
});

export default MyPlantModal;
