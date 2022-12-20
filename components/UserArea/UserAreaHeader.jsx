import { Text, View, StyleSheet, StatusBar } from 'react-native';

const UserAreaHeader = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>User area</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#2B8B30',
    alignSelf: 'stretch',
    justifyContent: 'flex-end',
    flex: 1,
    paddingLeft: 20,
    paddingVertical: 20,
  },
  headerText: {
    color: '#ECEBE7',
    fontSize: 40,
  },
});

export default UserAreaHeader;
