import {
  Text,
  View,
  StyleSheet,
  Pressable,
  Image,
  ScrollView,
  Dimensions,
} from 'react-native';

const PlantIdModal = ({
  plantSuggestions,
  plantIdModalLoading,
  handleClosePlantIdModal,
}) => {
  return plantIdModalLoading ? (
    <View style={styles.modalLoading}>
      <View
        style={{
          alignSelf: 'center',
        }}
      >
        <Image
          source={require('../../../assets/loading.gif')}
          style={{ height: 200, width: 200 }}
        />
      </View>
    </View>
  ) : (
    <View style={styles.modalView}>
      <Text style={styles.title}>Possible matches:</Text>
      <ScrollView style={styles.textContainer} persistentScrollbar={true}>
        {plantSuggestions.map(suggestion => {
          const probability = (suggestion.probability * 100).toFixed(2);
          return (
            <View style={styles.suggestion}>
              <Text style={styles.name}>{suggestion.plant_name}</Text>
              <Text style={styles.probability}>{probability}% match</Text>
            </View>
          );
        })}
      </ScrollView>
      <Pressable style={styles.pressable} onPress={handleClosePlantIdModal}>
        <Text style={styles.pressableText}>Close</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  modalView: {
    flex: 1,
    marginHorizontal: '10%',
    marginVertical: '30%',
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

  title: { fontSize: 25, fontWeight: 'bold', marginBottom: 20},

  suggestion: { marginBottom: 20 },

  name: { fontSize: 18, fontWeight: 'bold'},

  probability: { fontSize: 15},

  textContainer: {alignSelf: 'stretch' },

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

export default PlantIdModal;
