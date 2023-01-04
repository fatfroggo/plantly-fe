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
            <View style={styles.suggestion} key={suggestion.plant_name}>
              <View style={styles.descriptionTextContainer}>
                <Text style={styles.commonName}>
                  {suggestion.plant_details.common_names[0]}
                </Text>
                <Text style={styles.latinName}>{suggestion.plant_name}</Text>
                <Text style={styles.probability}>{probability}% match</Text>
              </View>
              <Image
                source={{ uri: suggestion.plant_details.wiki_image.value }}
                style={{ height: 100, width: 100, flex: 1 }}
              />
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

  textContainer: { alignSelf: 'stretch', marginVertical:10 },

  title: { fontSize: 25, fontWeight: 'bold', marginBottom: 20 },

  suggestion: { flexDirection: 'row', marginBottom: 20 },

  descriptionTextContainer: { flex: 1, paddingRight:5 },

  commonName: { fontSize: 18, fontWeight: 'bold' },

  latinName: { fontSize: 15, fontStyle: 'italic' },

  probability: { fontSize: 15 },

  pressable: {
    backgroundColor: '#7F9B91',
    width: '40%',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 8,
    padding: 10,
    borderRadius: 20,
    marginTop:10
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
